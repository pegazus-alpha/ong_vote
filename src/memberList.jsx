import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const MemberList = ({ vote }) => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');
    const navigate=useNavigate();

    // Fonction pour charger la liste des membres
    const loadMembers = async () => {
        try {
            // Obtenez la liste des adresses des membres
            const totalMembers = await vote.getTotalMembers(); // Ajoutez cette fonction au contrat pour obtenir le nombre total de membres
            let memberList = [];

            for (let i = 0; i < totalMembers; i++) {
                // Remplacez `getMemberByIndex` par la méthode de votre contrat pour obtenir les membres
                const memberAddress = await vote.getMemberAddressByIndex(i); 
                const member = await vote.members(memberAddress);

                memberList.push({
                    nom: member.nom,
                    prenom: member.prenom,
                    poste: member.poste === 0 ? 'Admin' : 'Lambda',
                    adresse: member.clef,
                    statut: member.statut === 0 ? 'Actif' : 'Ancien'
                });
            }

            setMembers(memberList);
        } catch (error) {
            setError('Erreur lors de la récupération des membres.');
            console.error(error);
        }
    };
    const goTo = (memberAddress) => {
        navigate(`/members/panel/${memberAddress}`);
    };

    useEffect(() => {
        loadMembers(); // Charger les membres lors du montage du composant
    }, []);

    return (
        <div className="container mt-5">
            {error && <p className="text-danger">{error}</p>}
<h2 className="my-4">Liste des Membres</h2>
<div className="table-responsive">
    <table className="table table-striped table-hover">
        <thead className="thead-dark">
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Poste</th>
                <th>Adresse</th>
                <th>Statut</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {members.map((member, index) => (
                <tr key={index}>
                    <td>{member.nom}</td>
                    <td>{member.prenom}</td>
                    <td>{member.poste}</td>
                    <td>{member.adresse}</td>
                    <td>{member.statut}</td>
                    <td>
                        <button className="btn btn-primary btn-sm" onClick={() => goTo(member.adresse)}>
                            Éditer
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

        </div>
    );
};

export default MemberList;
