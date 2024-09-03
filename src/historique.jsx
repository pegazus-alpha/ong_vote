import "./bootstrap-5.0.2-dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { ethers } from "ethers";

const History = ({ vote }) => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState('');

    // Fonction pour mettre à jour l'état de la session
    const updateState = async () => {
        try {
            await vote.updateSessionState(); // Appelle la fonction updateSessionState sur le contrat
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'état de la session :", error);
        }
    };

    // Fonction pour convertir l'état numérique en texte
    const getSessionStateText = (state) => {
        switch (state) {
            case 0:
                return "pending";
            case 1:
                return "running"; 
            default:
                return "finished";
        }
    };

    // Charger l'historique des sessions
    const loadHistory = async () => {
        try {
            const totalSessions = await vote.getTotalSessions();
            let sessionList = [];

            for (let i = 0; i < totalSessions; i++) {
                const session = await vote.sessions(i);
                let projects = await vote.getProjects(i);

                // Trier les projets par ordre décroissant de nombre de votes
                projects = [...projects].sort((a, b) =>
                    parseInt(b.voteCounter) - parseInt(a.voteCounter)
                );

                const formattedProjects = projects.map(project => ({
                    nom: project.nom,
                    description: project.description,
                    voteCounter: ethers.BigNumber.from(project.voteCounter).toString(),
                }));

                sessionList.push({
                    debut: new Date(session.debut * 1000).toLocaleDateString(),
                    fin: new Date(session.fin * 1000).toLocaleDateString(),
                    finTimestamp: session.fin, // Ajout du timestamp pour le tri
                    state: getSessionStateText(session.state), // Conversion de l'état
                    projects: formattedProjects,
                });
            }

            // Trier les sessions par ordre décroissant des dates de fin
            sessionList = sessionList.sort((a, b) => b.finTimestamp - a.finTimestamp);

            setSessions(sessionList);
        } catch (error) {
            setError('Erreur lors de la récupération de l\'historique des sessions.');
            console.error(error);
        }
    };

    // Utiliser un intervalle pour mettre à jour l'état des sessions
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateState(); // Mise à jour de l'état de la session
            loadHistory(); // Recharger l'historique après la mise à jour
        }, 2000); // Appeler toutes les 2 secondes

        return () => clearInterval(intervalId); // Nettoyage à la fin
    }, []);

    return (
        <div className="container mt-5">
            {error && <p>{error}</p>}
            <h1>Historique de votes</h1>
            {sessions.map((session, index) => (
                <div className="card mb-4" key={index}>
                    <div className="card-header">
                        <h3 className="card-title">Session {index + 1}</h3>
                        <p className="card-text">
                            <strong>Date de début :</strong> {session.debut}<br />
                            <strong>Date de fin :</strong> {session.fin}<br />
                            <strong>État de la session :</strong> {session.state}
                        </p>
                    </div>
                    <div className="card-body">
                        <h4 className="mb-3">Projets :</h4>
                        <ul className="list-group">
                            {session.projects.map((project, projIndex) => (
                                <li className="list-group-item" key={projIndex}>
                                    <h5 className="mb-1">{project.nom}</h5>
                                    <p className="mb-1">{project.description}</p>
                                    <span className="badge bg-primary">
                                        Nombre de votes : {project.voteCounter}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default History;
