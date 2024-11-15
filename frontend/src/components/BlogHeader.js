import React from 'react';
import { ChartBarIcon, DocumentTextIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

function BlogHeader({ stats }) {
  return (
    <div className="bg-white shadow-lg rounded-lg mb-8">
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mi Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Posts</p>
              <p className="text-xl font-semibold">{stats.totalPosts}</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <ChatBubbleLeftIcon className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Comentarios</p>
              <p className="text-xl font-semibold">{stats.totalComments}</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-purple-50 rounded-lg">
            <ChartBarIcon className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Categorías</p>
              <p className="text-xl font-semibold">{stats.totalCategories}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogHeader;