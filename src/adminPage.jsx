
import {useState,useEffect} from 'react'
import {ethers} from 'ethers'
import "./admin.css"
import VOTE from './artifacts/contracts/Vote.sol/Vote.json';
import Footer from './footer';

const Admin = ({vote})=>{
    const[error,setError]=useState('');
    const[succ,setSucc]=useState('');
    async function init() {
        // Vérifier si MetaMask est installé
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask est installé !');
            await ethereum.request({ method: 'eth_requestAccounts' }); // Demander la permission à l'utilisateur

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Adresse du contrat et ABI
            const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
            
            
            // Créer une instance du contrat
            const contract = new ethers.Contract(contractAddress, VOTE.abi, signer);

            // Exemples de fonctions pour interagir avec le contrat
            async function updateState(){
                try{
                    await contract.updateSessionState();
                }
                catch(e){
                    console.log(e.message);
                }
            }
            
            async function addSession(start, end){
                try{
                const tx = await contract.addSession(start, end);
                await tx.wait(); // Attendre la confirmation de la transaction
                console.log('Session ajoutée avec succès');
                setSucc('Session ajoutée avec succès');
                setError('');
                }catch(e){
                    console.error(VOTE.abi,e)
                    if(e && e.message && e.message.includes("Acces interdit")){
                        setError('Accès interdit');
                        setSucc('');
                    }
                    else if(e && e.message && e.message.includes("la session a deja debute")){
                        setError('Attendre la fin de la session en cours');
                        setSucc('');
                    }
                    else if(e && e.message && e.message.includes("la session a deja la session est actuellement en cours")){
                        setError('la session n\'est pas encore terminée');
                        setSucc('');
                    }
                    else{
                        setError("erreur inconnue veuillez réessayer");
                        setSucc('');
                    }
                }
            }

            async function addProject(name, description) {
                try{
                const tx = await contract.addProject(name, description);
                await tx.wait();
                console.log('Projet ajouté avec succès');
                setSucc("projet ajouté avec succès");
                setError('');
                }catch(error){
                    console.error(error.message);
                    if(e && e.message && e.message.includes("Acces interdit")){
                        setError('Accès interdit');
                        setSucc('');
                    }
                    else if(e && e.message && e.message.includes("la session a deja debute")){
                        setError('Attendre la fin de la session en cours');
                        setSucc('');
                    }else{
                        setError("erreur inconnue veuillez réessayer");
                        setSucc('');
                    }
                }
            }

            async function addMember(nom, prenom, poste, address) {
                try{
                const tx = await contract.addMember(nom, prenom, poste, address);
                await tx.wait();
                console.log('Membre ajouté avec succès');
                setSucc("Membre ajouté avec succès");
                setError('');
            }catch(e){
                console.error(error);
                if(e && e.message && e.message.includes("Acces interdit")){
                    setError('Accès interdit');
                    setSucc('');
                }else{
                    setError("erreur inconnue veuillez réessayer");
                    setSucc('');
                }
            }
            }

            // Liaison des fonctions avec les formulaires
            document.getElementById('session').onsubmit = async function (e) {
                
                e.preventDefault();
                const start = Math.floor((new Date(document.getElementById('start').value)).getTime() / 1000);
                console.log(start);
                const end = Math.floor((new Date(document.getElementById('end').value)).getTime() / 1000);
                console.log(end);
                try{
                await addSession(start, end);
                
                }catch(e){
                    console.error(VOTE.abi,e)
                }
            };

            document.getElementById('project').onsubmit = async function (e) {
                e.preventDefault();
                const name = document.getElementById('project-name').value;
                const description = document.getElementById('project-desc').value;
                try{
                await addProject(name, description);
                
                }catch(e){
                    console.error(VOTE.abi,e)
                    
                }
            };

            document.getElementById('member').onsubmit = async function (e) {
                e.preventDefault();
                const nom = document.getElementById('member-name').value;
                const prenom = document.getElementById('member-prenom').value;
                const poste = document.getElementById('member-role').value;
                const address = document.getElementById('member-address').value;
                try{
                await addMember(nom, prenom, poste, address);
                
                }catch(e){
                    console.error(VOTE.abi,e)
                    
                }
            };

        } else {
            alert('Veuillez installer MetaMask pour interagir avec cette application.');
        }
    }

    window.onload = init;


    return(

        <div className="Admin">

            <header>
            <h1>Admin Dashboard - Gestion des Votes</h1>
        

        <nav>
            <ul>
                <li><a href="#session">Sessions</a></li>
                <li><a href="#project">Projets</a></li>
                <li><a href="#member">Membres</a></li>
            </ul>
        </nav>
        </header>
        {succ!=''&& <div className="alert alert-success mb-4" role="alert">{succ}</div>}
        {error !='' &&<div className="alert alert-danger mb-4" role="alert">{error}</div>}
        <main>
            <section id="session">
                <h2>Gestion des Sessions</h2>
                <form className='fo'>
                    <label htmlFor="start">Date de début:</label>
                    <input type="datetime-local" id="start" name="start"/>
                    
                    <label htmlFor="end">Date de fin:</label>
                    <input type="datetime-local" id="end" name="end"/>

                    <button type="submit">Ajouter Session</button>
                </form>
            </section>

            <section id="project">
                <h2>Gestion des Projets</h2>
                <form className='fo'>
                    <label htmlFor="project-name">Nom du Projet:</label>
                    <input type="text" id="project-name" name="project-name"/>
                    
                    <label htmlFor="project-desc">Description:</label>
                    <textarea id="project-desc" name="project-desc"></textarea>

                    <button type="submit">Ajouter Projet</button>
                </form>
            </section>

            <section id="member">
                <h2>Gestion des Membres</h2>
                <form className='fo'>
                    <label htmlFor="member-name">Nom:</label>
                    <input type="text" id="member-name" name="member-name"/>
                    
                    <label htmlFor="member-prenom">Prénom:</label>
                    <input type="text" id="member-prenom" name="member-prenom"/>
                    
                    <label htmlFor="member-role">Poste:</label>
                    <select id="member-role" name="member-role">
                        <option value="0">Admin</option>
                        <option value="1">Lambda</option>
                    </select>

                    <label htmlFor="member-address">Adresse (clef):</label>
                    <input type="text" id="member-address" name="member-address"/>

                    <button type="submit">Ajouter Membre</button>
                </form>
            </section>
            <Footer/>
        </main>
        </div>
    );
}
export default Admin;