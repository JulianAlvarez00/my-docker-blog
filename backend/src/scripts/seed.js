const mongoose = require('mongoose');
const Post = require('../models/Post');

const samplePosts = [
  {
    title: '¿Qué es DevOps?',
    content: 'DevOps es una metodología que combina desarrollo y operaciones...',
    author: 'Julian',
    category: 'Tecnología',
    tags: ['devops', 'tecnología', 'desarrollo']
  },
  // ... más posts de ejemplo
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/blog');
    await Post.deleteMany({});
    await Post.insertMany(samplePosts);
    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();