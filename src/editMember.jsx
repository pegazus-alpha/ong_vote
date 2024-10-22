import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams, useNavigate } from 'react-router-dom';
import VOTE from './artifacts/contracts/Vote.sol/Vote.json';
import "./bootstrap-5.0.2-dist/css/bootstrap.min.css";

const VOTEaddress = "0xb2f27D934738844a5F8D6B6a251A1Edb6D8f2bF6";

const EditMember = () => {
    const { memberAddress } = useParams();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const voteContract = new ethers.Contract(VOTEaddress, VOTE.abi, signer);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [poste, setPoste] = useState('0');
    const [statut, setStatut] = useState('0');
    const [clef] = useState(memberAddress);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadMemberDetails = async () => {
            try {
                const memberDetails = await voteContract.members(memberAddress);
                setNom(memberDetails.nom);
                setPrenom(memberDetails.prenom);
                setPoste(memberDetails.poste);
                setStatut(memberDetails.statut);
            } catch (err) {
                setError('Erreur lors du chargement des informations du membre.');
            }
        };

        loadMemberDetails();
    }, [voteContract, memberAddress]);

    const handleUpdateMember = async () => {
        try {
            const tx = await voteContract.updateMember(
                memberAddress,
                document.getElementById("nom").value,
                document.getElementById("prenom").value,
                parseInt(document.getElementById("poste").options[document.getElementById("poste").selectedIndex].value),

            );
            await tx.wait();
            setSuccess('Informations du membre mises à jour avec succès.');
            navigate('/members');
        } catch (err) {
            setError('Erreur lors de la mise à jour des informations du membre.');
        }
    };

    const handleActivateMember = async () => {
        try {
            const tx = await voteContract.reactive(memberAddress);
            await tx.wait();
            setSuccess('Le membre a été activé avec succès.');
            setStatut('0');
        } catch (err) {
            setError('Erreur lors de l\'activation du membre.');
        }
    };

    const handleDeactivateMember = async () => {
        try {
            const tx = await voteContract.desactive(memberAddress);
            await tx.wait();
            setSuccess('Le membre a été désactivé avec succès.');
            setStatut('1');
        } catch (err) {
            setError('Erreur lors de la désactivation du membre.');
        }
    };

    return (
        <div className="container mt-5">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <h3>Modifier les informations du membre</h3>
            <div className="form-group">
                <label>Nom:</label>
                <input
                    type="text"
                    id="nom"
                    className="form-control"
                    placeholder={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Prénom:</label>
                <input
                    type="text"
                    className="form-control"
                    id="prenom"
                    placeholder={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Poste:</label>
                <select
                    className="form-control"
                    id="poste"
                    selected={poste}
                    onChange={(e) => setPoste(e.target.value)}
                >
                    <option value="0">Admin</option>
                    <option value="1">Lambda</option>
                </select>
            </div>
            <div className="form-group">
                <label>Statut:</label>
                <select
                    className="form-control"
                    id="statut"
                    value={statut}
                    onChange={(e) => setStatut(e.target.value)}
                    disabled
                >
                    <option value="0">Actif</option>
                    <option value="1">Ancien</option>
                </select>
            </div>
            <div className="form-group">
                <label>Adresse:</label>
                <input
                    type="text"
                    className="form-control"
                    value={clef}
                    readOnly
                />
            </div>
            <button className="btn btn-primary mt-3" onClick={handleUpdateMember}>
                Mettre à jour
            </button>
            <button className="btn btn-success mt-3 ms-2" onClick={handleActivateMember} disabled={statut === '0'}>
                Activer
            </button>
            <button className="btn btn-danger mt-3 ms-2" onClick={handleDeactivateMember} disabled={statut === '1'}>
                Désactiver
            </button>
        </div>
    );
};

export default EditMember;
