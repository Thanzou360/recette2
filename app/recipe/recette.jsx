import React, { useState } from 'react';

function CreateRecipePopup({ isOpen, onClose, userId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('https://reccette-de-cuisine.onrender.com/api/recettes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Inclure le jeton d'authentification
        },
        body: JSON.stringify({ title, description, image, userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création de la recette');
      }

      // Optionnel : Récupérer la recette créée si besoin
      const createdRecipe = await response.json();
      console.log('Recette créée:', createdRecipe); // Afficher la recette créée dans la console

      onClose(); // Fermer la popup après la création
      // Réinitialiser les champs
      setTitle('');
      setDescription('');
      setImage('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6">Créer une Recette</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Entrez le titre de la recette"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Entrez la description de la recette"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="image">URL de l'image</label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Entrez l'URL de l'image"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-400 transition duration-300"
            >
              Créer la Recette
            </button>
          </form>
          <button onClick={onClose} className="mt-4 text-red-500 hover:underline">Fermer</button>
        </div>
      </div>
    )
  );
}

export default CreateRecipePopup;
