

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom";
import Navbar from './navBar';
import Footer from './footer';
import VOTE from './artifacts/contracts/Vote.sol/Vote.json';
import "./bootstrap-5.0.2-dist/js/bootstrap.min.js";
import "./bootstrap-5.0.2-dist/css/bootstrap.min.css";

const Voting = ({ vote, setVote }) => {
    const [projects, setProjects] = useState([]);
    // const [total,setTotal]=useState(0);
    const navigate = useNavigate();
    const VOTEaddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Assurez-vous que cette adresse est correcte
    // "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const getSession = async () => {
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            // const voteContractWithSigner = new ethers.Contract(VOTEaddress, VOTE.abi, signer);
            // setVote(voteContractWithSigner);

            // Vérifiez l'adresse du contrat et l'ABI
            // console.log("Contract Address:", VOTEaddress);
            // console.log("Contract ABI:", VOTE.abi);

            // Essayez d'obtenir la variable publique
            const total = await vote.totalSessions();
            // setTotal(totalSessions);
            // console.log("Total Sessions:", total);

            // if (total > 0) {
                 const sessionId = total -1;
                const data = await vote.getProjects(sessionId);
                const projets = [];

                for (let i = 0; i < data.length; i++) {
                    const { nom, description, voteCounter } = data[i];
                    
                    projets.push({
                        nom: nom.toString(),
                        description: description.toString(),
                        voteCounter: ethers.BigNumber.from(voteCounter).toString(),
                    });
                }

                setProjects(projets);
            // // } else {
                
            //     console.error("No sessions available.", total);
            // }
        } catch (error) {
            console.error("Error fetching session data:", error);
        }
    };

    useEffect(() => {
        getSession();
    }, []);

    const goTo = (id) => {
        navigate(`/vote/${id}`);
    };

    return (
        <div className="Voting">
                <div className="container my-4">
    <h1 className="mb-4 text-center">Listes des projets pour la session actuelle</h1>
    <div className="list-group">
        {projects.map((projet, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-start mb-3 shadow-sm p-3 rounded">
                {/* <div className="d-flex flex-column"> */}
                    <h5 className="mb-2">{projet.nom}</h5>
                    {/* <p className="mb-2">{projet.description}</p> */}
                    <small className="text-muted">Votes: {projet.voteCounter}</small>
                {/* </div> */}
                <button 
                    className="btn btn-primary"
                    onClick={() => goTo(index)}
                >
                    plus...
                </button>
            </div>
        ))}
    </div>
</div>

            <Footer />
        </div>
    );
};

export default Voting;
