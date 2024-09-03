import {useState,useEffect} from 'react'
import {ethers} from 'ethers'
import Navbar from './navBar';
import { Link } from 'react-router-dom';
import Footer from './footer';

import './bootstrap-5.0.2-dist/css/bootstrap.min.css';
const LoginPage = ({account, setAccount, setVote, VOTEaddress, VOTE})=>{
    const [err,setErr]=useState('');
    const styleLog={
            backgroundColor:"white",
            padding:"20px",
            borderRadius:"8px",
            boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign:"center",
        };
        const sh1= {
            marginBottom: "20px"
        };
        const sp= {
            marginBottom:"20px"
        };
        const sbutton= {
            padding:"10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        };
        // const sbutton:hover {
        //     background-color: #0056b3;
        // }
        const connectHandler = async () => {
            try{
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accountAddress = ethers.utils.getAddress(accounts[0]);
            setAccount(accountAddress);
    
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const voteContractWithSigner = new ethers.Contract(VOTEaddress, VOTE.abi, signer);
            // setVote(voteContractWithSigner);
            await voteContractWithSigner.inscription();
            }catch(e){
                if(e && e.message && e.message.includes("Vous n'etes pas membre de notre ONG")){
                    setErr("seuls les memebres peuvent prétendre à voter!!!");
                }else{
                    setErr("erreur inconnue, veuillez réessayer");
                }
            }
        };
    return(
        
        <div className="LoginPage" style={styleLog}>
        {err && <div className="alert alert-danger mb-4" role="alert">{err}</div>}
            {/* <Navbar/> */}
            
            <form className="text-center p-4">
  <h1 className="display-4">Inscrivez vous pour cette session</h1>
  <p className="lead">Veuillez cliquer sur le bouton ci-dessous pour vous inscrire sur la liste électorale</p>
  {account && !err ? (
    <a className="btn btn-primary btn-lg" href="/vote">
      Allez voter
    </a>
  ) : (
    <button type="button" className="btn btn-outline-primary btn-lg" onClick={connectHandler}>
      Connexion
    </button>
  )}
</form>


            <Footer/>
        </div>
    );
}
export default LoginPage;