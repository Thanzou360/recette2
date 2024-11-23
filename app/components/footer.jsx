function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Recettes Gourmandes</h2>
              <p className="mt-2 text-sm">Votre destination pour des recettes délicieuses et faciles à préparer.</p>
              <p className="mt-2 text-sm">© {new Date().getFullYear()} Recettes Gourmandes. Tous droits réservés.</p>
            </div>
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold">Catégories de Recettes</h3>
              <ul className="mt-2 space-y-1">
                <li><a href="#" className="hover:text-yellow-400 transition duration-300">Entrées</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition duration-300">Plats Principaux</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition duration-300">Desserts</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition duration-300">Végétarien</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition duration-300">Sans Gluten</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contactez-nous</h3>
              <p className="mt-2 text-sm">Email : contact@recettesgourmandes.com</p>
              <p className="mt-1 text-sm">Téléphone : +33 1 23 45 67 89</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-yellow-400 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8a5 5 0 0110 0v1a5 5 0 01-10 0V8zm0 4a5 5 0 0110 0v1a5 5 0 01-10 0v-1zm0 4a5 5 0 0110 0v1a5 5 0 01-10 0v-1z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-yellow-400 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 2a2 2 0 00-2 2v1a2 2 0 01-2 2H8a2 2 0 00-2 2v1a2 2 0 002 2h1a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1a2 2 0 002-2v-1a2 2 0 00-2-2h-1a2 2 0 01-2-2V4a2 2 0 00-2-2h-1z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-yellow-400 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  