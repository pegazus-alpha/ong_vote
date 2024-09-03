import { Link } from "react-router-dom";
import Footer from './footer';
import "./bootstrap-5.0.2-dist/js/bootstrap.min.js";
import './bootstrap-5.0.2-dist/css/bootstrap.min.css';
import './bootstrap-5.0.2-dist/js/bootstrap.bundle.min'; // Assurez-vous de charger le bundle complet
import './accueil.css';

const Accueil = () => {
  return (
    <div className="Accueil">
      {/* Sticky Navbar with dynamic size */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">ONG</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-md-center" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">À propos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials">Témoignages</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main data-bs-spy="scroll" data-bs-target="#navbarCollapse" data-bs-offset="10" className="scrollspy-example" tabIndex="1">
        {/* Hero Section */}
        <section id="home" className="hero text-center text-rgb(70, 10, 10)  py-5 ">
          {/* <div className="container"> */}
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="./images/apple.jpg" className="d-block w-100" alt="Image 1" />
                  <div className="carousel-caption d-flex justify-content-center align-items-center">
                    <div className='text-center'>
                      <h1 className="display-4">Bienvenue chez Votre Entreprise</h1>
                      <p className="lead">Nous offrons des solutions innovantes pour vous aider à atteindre vos objectifs.</p>
                      <Link to={'/login'} className="btn btn-light btn-lg mt-4">Inscrivez-vous</Link>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="./images/computer-4146579.jpg" className="d-block w-100" alt="Image 2" />
                  <div className="carousel-caption d-flex justify-content-center align-items-center">
                    <div className='text-center'>
                      <h1 className="display-4">Titre pour la deuxième image</h1>
                      <p className="lead">Description pour la deuxième image.</p>
                      <Link to={'/login'} className="btn btn-light btn-lg mt-4">En savoir plus</Link>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="./images/office-2617384.jpg" className="d-block w-100" alt="Image 3" />
                  <div className="carousel-caption d-flex justify-content-center align-items-center">
                    <div className='text-center'>
                      <h1 className="display-4">Titre pour la troisième image</h1>
                      <p className="lead">Description pour la troisième image.</p>
                      <Link to={'/login'} className="btn btn-light btn-lg mt-4">En savoir plus</Link>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="./images/office-2617384.jpg" className="d-block w-100" alt="Image 4" />
                  <div className="carousel-caption d-flex justify-content-center align-items-center">
                    <div className='text-center'>
                      <h1 className="display-4">Titre pour la quatrième image</h1>
                      <p className="lead">Description pour la quatrième image.</p>
                      <Link to={'/another-link'} className="btn btn-light btn-lg mt-4">En savoir plus</Link>
                    </div>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          {/* </div> */}
        </section>

        {/* About Section */}
        <section className="about bg-light py-5" id="about">
          <div className="container">
            <h2 className="text-center mb-4">À propos de nous</h2>
            <div className="row align-items-center">
              <div className="col-md-6">
                <p>Votre Entreprise est un leader dans le domaine des solutions numériques, offrant une gamme complète de services adaptés à vos besoins.</p>
              </div>
              <div className="col-md-6">
                <img src="./images/apple.jpg" className="img-fluid" alt="À propos de nous" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services bg-white py-5" id="services">
          <div className="container">
            <h2 className="text-center mb-4">Nos Services</h2>
            <div className="row align-items-center">
              <div className="col-md-6">
                <img src="./images/computer-4146579.jpg" className="img-fluid" alt="Image des services" />
              </div>
              <div className="col-md-6">
                <p>Nous offrons une variété de services pour répondre à vos besoins, y compris le développement web, la conception graphique, le marketing digital, et plus encore.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials bg-light py-5" id="testimonials">
          <div className="container">
            <h2 className="text-center mb-4">Témoignages</h2>
            <div className="row align-items-center">
              <div className="col-md-6">
                <p>Ce que nos clients disent de nous :</p>
                <blockquote className="blockquote">
                  "Un service exceptionnel avec des résultats impressionnants. Je recommande vivement Votre Entreprise pour leurs solutions innovantes."
                  <br /><strong>- Client Satisfait</strong>
                </blockquote>
              </div>
              <div className="col-md-6">
                <img src="./images/office-2617384.jpg" className="img-fluid" alt="Image de témoignages" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact bg-white py-5" id="contact">
          <div className="container">
            <h2 className="text-center mb-4">Contactez-nous</h2>
            <form action="mailto:maximebite2@gmail.com" method="post" className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nom:</label>
                <input type="text" id="name" name="name" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Sujet:</label>
                <input type="text" id="subject" name="subject" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="5" className="form-control" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg">Envoyer</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Accueil;
