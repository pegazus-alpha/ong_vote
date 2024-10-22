


 
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

import "./bootstrap-5.0.2-dist/js/bootstrap.min.js";
import "./bootstrap-5.0.2-dist/css/bootstrap.min.css";

const Navbar = ({ account, setAccount, setVote, VOTEaddress, VOTE }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accountAddress = ethers.utils.getAddress(accounts[0]);
        setAccount(accountAddress);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const voteContractWithSigner = new ethers.Contract(VOTEaddress, VOTE.abi, signer);
        setVote(voteContractWithSigner);
    };

    return (
         
            <div className="Navbar">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
      <img src="./images/development-icon-3335977.jpg" alt="Logo" width="30" height="30" className="d-inline-block align-top" />
      Votre Entreprise
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-md-center" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/">Accueil</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/vote">Vote</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin">Admin</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/history">History</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/members">Members</Link>
        </li>
        {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Admin</a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/admin">Panel</Link></li>
              <li><Link className="dropdown-item" to="/history">History</Link></li>
            </ul>
          </li> */}
          
        
      </ul>
      <div className="d-flex">
        {account ? (
          <button type="button" className="btn btn-outline-light">
            {account.slice(0, 6) + '...' + account.slice(38, 42)}
          </button>
        ) : (
          <button type="button" className="btn btn-outline-light" onClick={connectHandler}>
            Connexion
          </button>
        )}
      </div>
    </div>
  </div>
</nav>

            </div>
         
    );
};

export default Navbar;
