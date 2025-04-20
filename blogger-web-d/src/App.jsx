
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AddPostPage from './components/AddPostPage';
import EditPostPage from './components/EditPostPage';
import './App.css';

function App() {

  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    return savedPosts ? JSON.parse(savedPosts) : [
      { 
        id: 1, 
        title: 'Welcome to ERROR Blogs', 
        content: 'ERROR Blogs is a space created for exploring ideas, sharing knowledge, and diving into the ever-evolving world of tech, creativity, and modern life. Whether you are into programming, design, digital trends, or just like reading something fresh and interesting, this blog is here for you.'
      },
      { 
        id: 2, 
        title: 'Why This Blog Exists', 
        content: 'The internet is full of noise—but ERROR Blogs aims to bring clarity. Here, we share posts that are simple, valuable, and straight to the point. No clickbait, no fluff—just useful content with a touch of style.' 
      },
      { 
        id: 3, 
        title: 'Stay Tuned', 
        content: 'New content will be posted regularly, so feel free to explore, learn, and be part of this growing digital space. Thanks for stopping by—this is just the beginning.' 
      }
    ];
  });


  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);


  const addPost = (post) => {
    const newPost = { ...post, id: Date.now() };
    setPosts([newPost, ...posts]);
  };


  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };


  const editPost = (updatedPost) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage posts={posts} deletePost={deletePost} />} />
            <Route path="/add" element={<AddPostPage addPost={addPost} />} />
            <Route path="/edit/:id" element={<EditPostPage posts={posts} editPost={editPost} />} />
          </Routes>
        </main>
        <footer className="footer">
          <p className="footer-credit">
            Crafted by <strong>Shashank</strong> aka <strong>ERROR</strong> 💻✨
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;