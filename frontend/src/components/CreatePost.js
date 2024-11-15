import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ onPostCreated }) {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: 'Tecnología'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/posts`, formData);
      setFormData({ title: '', content: '', author: '', category: 'Tecnología' });
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // ... resto del código permanece igual
  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          placeholder="Contenido"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="w-full border rounded p-2 h-32"
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={formData.author}
          onChange={(e) => setFormData({...formData, author: e.target.value})}
          className="w-full border rounded p-2"
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="w-full border rounded p-2"
        >
          <option value="Tecnología">Tecnología</option>
          <option value="Viajes">Viajes</option>
          <option value="Comida">Comida</option>
          <option value="Estilo de vida">Estilo de vida</option>
          <option value="Otros">Otros</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Crear Post
        </button>
      </div>
    </form>
  );
}

export default CreatePost;