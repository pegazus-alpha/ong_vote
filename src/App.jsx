import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Admin from './adminPage';
import MemberList from './memberList';
import History from './historique';
import EditMember from './editMember';
import EditProject from './editProject';
import EditSession from './editSession';
import Footer from './footer';
import ListResult from './listResults';
import LoginPage from './loginPage';
import Navbar from "./navBar";
import Voting from './voting';
import Vote from './vote';
import Accueil from "./accueil"; // Assuming you have this component
import VOTE from './artifacts/contracts/Vote.sol/Vote.json';
import "./App.css";
import { ethers } from 'ethers';
// import {dotenv} from 'dotenv';
// import './App.css';
import AdSession from './addSession';
// dotenv.config();


const VOTEaddress ="0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [account, setAccount] = useState(null);
  const [vote, setVote] = useState({});
  const [loading, setLoading] = useState(true);

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const voteContract = new ethers.Contract(VOTEaddress, VOTE.abi, provider);
      setVote(voteContract);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des données de la blockchain : ", error);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);
  

  return (
    
    <Router>
      <div className='App'>
        <Navbar account={account} setVote={setVote} setAccount={setAccount} VOTEaddress={VOTEaddress} VOTE={VOTE} />
        <div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Routes>
              <Route path="/" element={<Accueil/>}/>
              <Route path="/vote" element={<Voting vote={vote} setVote={setVote}/>} />
              <Route path="/vote/:id" element={<Vote vote={vote}/>} />
              <Route path="/admin" element={<Admin vote={vote}/>}/>
              <Route path="/history" element={<History vote={vote}/>}/>
              <Route path="/admin/updateSession" element={<EditSession/>}/>
              <Route path="/admin/updateProject" element={<EditProject/>}/>
              <Route path="/members" element={<MemberList vote={vote}/>}/>
              <Route path="/members/panel/:memberAddress" element={<EditMember/>}/>
              <Route path="/login" element={<LoginPage account={account} setAccount={setAccount} VOTEaddress={VOTEaddress} VOTE={VOTE} />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
    
  );
};

export default App;
