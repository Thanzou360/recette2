import React, { useState, useEffect, useRef } from 'react';

function LoginPopup({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('https://reccette-de-cuisine.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        throw new Error('Identifiants invalides');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); 
      onLogin(); 
      onClose(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Entrez votre adresse email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-400 transition duration-300"
            >
              Se connecter
            </button>
          </form>
          <button onClick={onClose} className="mt-4 text-red-500 hover:underline">Fermer</button>
        </div>
      </div>
    )
  );
}

function SignupPopup({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('https://reccette-de-cuisine.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, name, password }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Entrez votre nom"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Entrez votre adresse email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-400 transition duration-300"
            >
              S'inscrire
            </button>
          </form>
          <button onClick={onClose} className="mt-4 text-red-500 hover:underline">Fermer</button>
        </div>
      </div>
    )
  );
}

function Header() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  const toggleSignupPopup = () => {
    setShowSignupPopup(!showSignupPopup);
  };

  const handleAddRecipe = () => {
    if (!isLoggedIn) {
      toggleLoginPopup();
    } else {
      window.location.href = '/ajouter-recette';
    }
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div>
      <div className='flex justify-between w-full items-center bg-black p-5'>
        <h1 className='text-3xl font-semibold text-white'>Recipes</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='text-white md:hidden focus:outline-none'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <nav className='hidden md:flex flex-grow justify-center items-center space-x-4'>
          <a href="#" className='text-white hover:text-yellow-400 transition duration-300'>Accueil</a>
          <a href="#" className='text-white hover:text-yellow-400 transition duration-300'>Menu</a>
          <a href='../recipe/recette.jsx' onClick={handleAddRecipe} className='text-white cursor-pointer hover:text-yellow-400 transition duration-300'>Ajouter une Recette</a>
          <a href="#" className='text-white hover:text-yellow-400 transition duration-300'>Mes Recettes</a>
        </nav>
        <div className='hidden md:flex space-x-4'>
          {!isLoggedIn ? (
            <>
              <button onClick={toggleLoginPopup} className='bg-white text-black px-4 py-2 rounded hover:bg-yellow-400 transition duration-300'>Connexion</button>
              <button onClick={toggleSignupPopup} className='bg-white text-black px-4 py-2 rounded hover:bg-blue-400 transition duration-300'>Inscription</button>
            </>
          ) : (
            <button onClick={() => { setIsLoggedIn(false); localStorage.removeItem('token'); }} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition duration-300'>Déconnexion</button>
          )}
        </div>
      </div>

      
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 md:hidden">
          <div ref={sidebarRef} className="bg-white w-64 h-full p-5">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <nav className='flex flex-col space-y-2'>
              <a href="#" className='text-black hover:text-yellow-500 p-2 bg-yellow-100 rounded transition duration-300'>Accueil</a>
              <a href="#" className='text-black hover:text-yellow-500 p-2 bg-yellow-100 rounded transition duration-300'>Menu</a>
              <a onClick={handleAddRecipe} className='text-black cursor-pointer hover:text-yellow-500 p-2 bg-yellow-100 rounded transition duration-300'>Ajouter une Recette</a>
              <a href="#" className='text-black hover:text-yellow-500 p-2 bg-yellow-100 rounded transition duration-300'>Mes Recettes</a>
              <div className="mt-4 space-y-2">
                {!isLoggedIn ? (
                  <>
                    <button onClick={toggleLoginPopup} className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 transition duration-300'>Connexion</button>
                    <button onClick={toggleSignupPopup} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition duration-300'>Inscription</button>
                  </>
                ) : (
                  <button onClick={() => { setIsLoggedIn(false); localStorage.removeItem('token'); }} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition duration-300'>Déconnexion</button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

      
      <LoginPopup isOpen={showLoginPopup} onClose={toggleLoginPopup} onLogin={() => setIsLoggedIn(true)} />
      <SignupPopup isOpen={showSignupPopup} onClose={toggleSignupPopup} />
    </div>
  );
}

export default Header;
