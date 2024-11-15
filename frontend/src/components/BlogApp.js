import React, { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function BlogApp() {
  const [posts, setPosts] = useState([]);
  // Eliminamos setCategories ya que no lo estamos usando
  const categories = ['Tecnología', 'Viajes', 'Comida', 'Estilo de vida', 'Otros'];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: '',
    category: 'Tecnología'
  });

  // Usar useCallback para memoizar fetchPosts
  const fetchPosts = useCallback(async () => {
    try {
      let url = `${API_URL}/api/posts?`;
      if (selectedCategory) url += `category=${selectedCategory}&`;
      if (searchTerm) url += `search=${searchTerm}&`;
      
      const response = await axios.get(url);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/posts`, newPost);
      setNewPost({ title: '', content: '', author: '', category: 'Tecnología' });
      setShowCreateForm(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Mi Blog</h1>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {showCreateForm ? 'Cerrar' : 'Nuevo Post'}
            </button>
          </div>

          {showCreateForm && (
            <form onSubmit={handleCreatePost} className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Título"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full border rounded p-2"
                required
              />
              <textarea
                placeholder="Contenido"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="w-full border rounded p-2 h-32"
                required
              />
              <input
                type="text"
                placeholder="Autor"
                value={newPost.author}
                onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                className="w-full border rounded p-2"
                required
              />
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                className="w-full border rounded p-2"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button 
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Crear Post
              </button>
            </form>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="Buscar posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
            
            <div className="sm:w-48">
              <select
                className="w-full border rounded-lg py-2 pl-3 pr-10"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Por {post.author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.comments?.length || 0} comentarios
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogApp;