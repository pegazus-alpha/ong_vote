// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Vote {
    using Counters for Counters.Counter;
    Counters.Counter public sessionCounter;

    struct Projet {
        string nom;
        string description;
        uint256 voteCounter;
    }

    enum Etat {
        pending,
        encours,
        past
    }

    struct Session {
        uint256 debut;
        uint256 fin;
        mapping(address => bool) voted;
        Counters.Counter projectCounter;
        mapping(uint256 => Projet) pro;
        Etat state;
    }

    mapping(uint256 => Session) public sessions;
    uint256 public totalSessions;

    modifier inProgress() {
        require(
            sessions[totalSessions - 1].debut < block.timestamp &&
            sessions[totalSessions - 1].fin > block.timestamp,
            "Ce n'est pas encore l'heure"
        );
        _;
    }

    modifier past() {
        require(
            sessions[totalSessions - 1].state == Etat.past || sessions[totalSessions - 1].fin == 0,
            "La session actuelle est encore en cours"
        );
        _;
    }

    modifier isPending() {
        require(
            sessions[totalSessions - 1].state == Etat.pending,
            "La session a deja debute"
        );
        _;
    }

    modifier isDate() {
        require(
            sessions[totalSessions - 1].debut <= sessions[totalSessions - 1].fin || sessions[totalSessions - 1].fin==0,
            "Entrez une date valide"
        );
        _;
    }

    function addSession(uint256 _debut, uint256 _fin)
    //   isDate isAdmin past 
     public {
        require(_debut < _fin, "Intervalle invalide");

        Session storage session = sessions[totalSessions];
        session.debut = _debut;
        session.fin = _fin;
        session.state = Etat.pending;
        sessionCounter.increment();
        totalSessions = sessionCounter.current();
    }

    function updateSessionState()
      isAdmin public {
        Session storage session = sessions[totalSessions - 1];
        if (session.debut <= block.timestamp && session.fin >= block.timestamp) {
            session.state = Etat.encours;
        } else if (session.fin < block.timestamp) {
            session.state = Etat.past;
        }
    }

    function addProject(string memory _nom, string memory _description)
     isAdmin isPending 
     public {
        Session storage session = sessions[totalSessions-1];
        uint256 currentProjectId = session.projectCounter.current();
        session.pro[currentProjectId] = Projet({
            nom: _nom,
            description: _description,
            voteCounter: 0
        });
        session.projectCounter.increment();
    }

    function getSessionState1() public view returns (Etat) {
        return sessions[totalSessions - 1].state;
    }
    function getSessionState(uint256 sessionId) public view returns (Etat) {
    return sessions[sessionId].state;
}

    

    function getProject(uint256 projectId, uint256 sessionId)
        public view returns (string memory nom, string memory description, uint256 voteCounter) {

        Session storage session = sessions[sessionId];
        Projet storage projet = session.pro[projectId];
        return (projet.nom, projet.description, projet.voteCounter);
    }

    function getProjects(uint256 sessionId) public view returns (Projet[] memory) {
        Session storage session = sessions[sessionId];
        uint256 projectCount = session.projectCounter.current();
        Projet[] memory projets = new Projet[](projectCount);

        for (uint256 i = 0; i < projectCount; i++) {
            projets[i] = session.pro[i];
        }

        return projets;
    }

    function updateSession(uint256 _id, uint256 _debut, uint256 _fin) isDate isPending isAdmin public {
        require(_debut < _fin, "Intervalle invalide");

        Session storage session = sessions[_id];
        session.debut = _debut;
        session.fin = _fin;
        session.state = Etat.pending;
    }

    function updateProject(uint256 _id, string memory _nom, string memory _description) isPending isAdmin public {
        Session storage session = sessions[totalSessions - 1];
        session.pro[_id].nom = _nom;
        session.pro[_id].description = _description;
    }

    // Gestion des membres
    enum Poste {
        Admin,
        Lambda
    }

    enum StatutMember {
        Actif,
        Ancien
    }

    struct Member {
        string nom;
        string prenom;
        Poste poste;
        address clef;
        bool voter;
        StatutMember statut;
    }

    Counters.Counter private memberCounter;
    uint256 totalMembers;

    mapping(address => Member) public members;
     address[] public memberAddresses; // Tableau pour stocker les adresses des membres
     mapping(address => bool) public addressExists;

    modifier isMembre() {
        require(members[msg.sender].clef != address(0), "Vous n'etes pas membre de notre ONG");
        _;
    }

    modifier isActive() {
        require(members[msg.sender].statut == StatutMember.Actif, "Vous n'avez plus le droit de voter");
        _;
    }

    modifier isNotActive() {
        require(members[msg.sender].statut == StatutMember.Ancien, "Vous n'avez plus le droit de voter");
        _;
    }

    modifier isAdmin() {
        require(members[msg.sender].poste == Poste.Admin, "Acces interdit");
        _;
    }

    modifier isVoter() {
        require(members[msg.sender].voter == true, "Vous n'etes pas un votant");
        _;
    }

    modifier haVoted() {
        require(sessions[totalSessions - 1].voted[msg.sender] == false, "Deja vote");
        _;
    }
    

    function desactive(address _member) isMembre isActive isAdmin public {
        members[_member].statut = StatutMember.Ancien;
    }

    function reactive(address _member) isMembre isNotActive isAdmin public {
        members[_member].statut = StatutMember.Actif;
    }

    function addMember(string memory _nom, string memory _prenom, Poste _poste, address _clef) isAdmin public {
        require(!addressExists[_clef], "Adresse deja utilisee par un autre membre.");
        members[_clef] = Member(_nom, _prenom, _poste, _clef, false, StatutMember.Actif);
        memberAddresses.push(_clef); // Stocke l'adresse dans le tableau
        memberCounter.increment();
        totalMembers=memberCounter.current();
        addressExists[_clef] = true;
    }
    
    function updateMember(address _addr, string memory _nom, string memory _prenom, Poste _poste) public {
    require(addressExists[_addr], "Membre non existant.");

    members[_addr].nom = _nom;
    members[_addr].prenom = _prenom;
    members[_addr].poste = _poste;
}
    function inscription() isMembre isActive isPending public {
        members[msg.sender].voter = true;
        // sessions[totalSessions - 1].voted[msg.sender] = true;
    }

    function voting(uint256 _id) isMembre isActive isVoter haVoted  public {
        Session storage session = sessions[totalSessions - 1];
        session.pro[_id].voteCounter++;
        sessions[totalSessions - 1].voted[msg.sender] = true;
        members[msg.sender].voter = false;
    }
    function getTotalSessions() external view returns(uint256 total){
        return totalSessions;
    }
    function getTotalMembers() public view returns (uint256) {
        return totalMembers;
    }

    function getMemberAddressByIndex(uint256 index) public view returns (address) {
        require(index < totalMembers, "Index hors limites");
        return memberAddresses[index]; // Retourne l'adresse à partir du tableau
    }
}
