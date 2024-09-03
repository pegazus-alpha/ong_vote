import {useState,useEffect} from 'react'
import {ethers} from 'ethers'
import { Link } from 'react-router-dom';

const Footer = ({})=>{
    return(
        <div className="Footer">
            <footer>

<p>Pour toute question ou demande de service, n'hésitez pas à nous contacter.</p>
            <p>Email: contact@votreentreprise.com</p>
            <p>Téléphone: 01 23 45 67 89</p>
        <p>© 2024 Votre Entreprise. Tous droits réservés.</p>
        <p><a><Link to={'/'}> Accueil</Link></a> | <a><Link to={'/vote'}>Votes</Link></a>| <a><Link to={'/admin'}>Admin</Link></a></p>
    </footer>
        </div>
    );
}
export default Footer;