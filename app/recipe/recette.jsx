import React, { useState } from 'react';

function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre la recette
    console.log({ title, description, image });
  };

  return (
    <div className="max-w-lg mx-auto p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Ajouter une Nouvelle Recette</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Entrez la description de la recette"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-400 transition duration-300"
        >
          Ajouter la Recette
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;
