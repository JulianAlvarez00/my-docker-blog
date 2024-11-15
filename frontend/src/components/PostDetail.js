import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function PostDetail({ post, onClose, onPostUpdated }) {
  const [comment, setComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/posts/${post._id}/comments`, {
        content: comment,
        author: commentAuthor
      });
      setComment('');
      setCommentAuthor('');
      onPostUpdated();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start overflow-y-auto pt-10">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8">
        {/* Header */}
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">
              {moment(post.createdAt).format('LL')}
            </span>
          </div>
          
          <p className="text-gray-700 mb-6 whitespace-pre-wrap">{post.content}</p>
          
          <div className="text-sm text-gray-500 mb-8">
            Escrito por {post.author}
          </div>

          {/* Comments Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Comentarios ({post.comments?.length || 0})</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className="w-full border rounded p-2 mb-2"
                rows="3"
                required
              />
              <input
                type="text"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                placeholder="Tu nombre"
                className="w-full border rounded p-2 mb-2"
                required
              />
              <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Comentar
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {post.comments?.map((comment, index) => (
                <div key={index} className="border-b last:border-0 pb-4">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;