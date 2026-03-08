import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            <div className="hero-content">
                <div className="hero-badge animate-slide-up">
                    <Sparkles className="badge-icon" size={16} />
                    <span>Next-Generation AI Platform</span>
                </div>
                <h1 className="hero-title animate-slide-up animate-delay-1">
                    MarketMind
                </h1>
                <p className="hero-subtitle animate-slide-up animate-delay-2">
                    Generative AI-Powered Sales & Marketing Intelligence Platform
                </p>
                <p className="hero-description animate-slide-up animate-delay-2">
                    Empower your sales and marketing teams with data-driven decision making.
                    Generate campaigns, craft perfect sales pitches, and unlock hidden lead insights
                    using advanced predictive analysis and generative AI technologies.
                </p>
                <div className="hero-cta animate-slide-up animate-delay-3">
                    <a href="#demo" className="btn-primary">
                        Get Started <ArrowRight size={20} />
                    </a>
                    <a href="#about" className="btn-secondary">
                        Learn More
                    </a>
                </div>
            </div>
            <div className="hero-visual animate-fade-in animate-delay-2">
                <div className="abstract-shape shape-1"></div>
                <div className="abstract-shape shape-2"></div>
                <div className="hero-glass-card">
                    <div className="mockup-header">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                    </div>
                    <div className="mockup-body">
                        <div className="mockup-line w-75"></div>
                        <div className="mockup-line w-50"></div>
                        <div className="mockup-chart">
                            <div className="bar h-40"></div>
                            <div className="bar h-60"></div>
                            <div className="bar h-80"></div>
                            <div className="bar h-100 accent"></div>
                        </div>
                        <div className="mockup-text highlight">AI Insights Generated</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
