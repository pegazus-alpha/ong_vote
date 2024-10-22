

import {useState,useEffect} from 'react'
import {ethers} from 'ethers'
import { useNavigate, useParams } from 'react-router-dom';
import VOTE from './artifacts/contracts/Vote.sol/Vote.json';

const Vote = ({vote})=>{
    const [project,setProject]=useState({});
    const[erro,setError]=useState('');
    const {id}=useParams();
    const navigate=useNavigate();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Adresse du contrat et ABI
            const contractAddress = '0xb2f27D934738844a5F8D6B6a251A1Edb6D8f2bF6';
            
            
            // Créer une instance du contrat
            const vot = new ethers.Contract(contractAddress, VOTE.abi, signer);
    async function getProject(){
        const tot=await vot.totalSessions();
        const data= await vot.getProject(tot.toNumber()-1,id);
        // const { nom, description, voteCounter } = data;
        
        console.log(tot.toNumber(),"bonhour");
        const projectData ={
            nom: (data[0]),
            description: (data[1]), 
            voteCount: Number(data[2])
        }
        setProject(projectData);
    }
    useEffect(() => {
        getProject();
    }, []);
    async function voting(){
        try{
            const votingTx= await vot.voting(id);
            await votingTx.wait();
            navigate('/vote');
        }catch(error){
            if(error && error.message && error.message.includes("deja vote")){
                alert("vous ne pouvez plus voter");
                setError("vous ne pouvez plus voter");
            }else if(error && error.message && error.message.includes("vous nétes pas un votant")){
                setError("vous n'etes pas inscrit sur la liste électorale");
                
            }else if(error && error.message && error.message.includes("Vous n'etes pas membre de notre ONG")){
                // alert("vous n'etes pas autorisé(e) à voter");
                setError("seuls les membres de l'ONG peuvent voter");
            }else{
                alert(error.message);
                setError(error.message);
            }
            
        }
    }
    return(
        <div className="Vote">
            {erro && <div className="alert alert-danger mb-4" role="alert">{erro}</div>}

<div className="card mb-4 shadow-sm">
    <div className="card-body">
        <h1 className="card-title">{project.nom}</h1>
        <p className="card-text">
            <strong>Description:</strong> <br />
            {project.description}
        </p>
        <small className="card-text">
            <strong>Votes:</strong> {project.voteCount}
        </small><br/>
        <button className="btn btn-primary" onClick={() => voting()}>Votez</button>
    </div>
</div>

        </div>
    );
};
export default Vote;