import React, { useState, useEffect } from 'react';
import './index.css';

// Components we will create
import Hero from './Hero';
import About from './About';
import Features from './Features';
import TechStack from './TechStack';
import Demo from './demo.src';
import Footer from './Footer';
import Chatbot from './Chatbot';

function App() {
    const [theme, setTheme] = useState('dark'); // Default to dark theme for modern AI feel

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="app-container">
            <header className="navbar">
                <div className="logo">
                    <span className="logo-icon">🧠</span>
                    MarketMind
                </div>
                <nav className="nav-links">
                    <a href="#about">About</a>
                    <a href="#features">Features</a>
                    <a href="#tech">Tech Stack</a>
                    <a href="#demo">Demo</a>
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </nav>
            </header>

            <main>
                <Hero />
                <About />
                <Features />
                <TechStack />
                <Demo />
            </main>

            <Chatbot />
            <Footer />
        </div>
    );
}

export default App;
