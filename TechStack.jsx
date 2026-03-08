import React from 'react';
import './TechStack.css';

const technologies = [
    { name: 'FastAPI', type: 'Backend Framework', icon: '🚀' },
    { name: 'React', type: 'Frontend Library', icon: '⚛️' },
    { name: 'JavaScript', type: 'Language', icon: '⚡' },
    { name: 'Gemini AI', type: 'LLM Engine', icon: '✨' },
    { name: 'IBM AI', type: 'Enterprise AI', icon: '🏢' },
    { name: 'Groq', type: 'Inference Engine', icon: '🏎️' },
    { name: 'Hugging Face', type: 'Open Source AI', icon: '🤗' }
];

const TechStack = () => {
    return (
        <section id="tech" className="tech-section">
            <div className="container">
                <h2 className="section-title animate-slide-up">Powered by Leading Technology</h2>
                <p className="section-subtitle animate-slide-up animate-delay-1">
                    Built on a robust, state-of-the-art technology stack ensuring rapid performance and deep intelligence.
                </p>

                <div className="tech-marquee-wrapper animate-slide-up animate-delay-2">
                    <div className="tech-grid">
                        {technologies.map((tech, i) => (
                            <div className="tech-card" key={i}>
                                <div className="tech-icon">{tech.icon}</div>
                                <div className="tech-info">
                                    <span className="tech-name">{tech.name}</span>
                                    <span className="tech-type">{tech.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
