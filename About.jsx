import React from 'react';
import { Target, TrendingUp, Zap } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <h2 className="section-title">Why MarketMind?</h2>
                <p className="section-subtitle">
                    Transforming standard operations into highly efficient, insight-driven processes utilizing
                    state-of-the-art Generative AI models.
                </p>

                <div className="about-grid">
                    <div className="about-text-content animate-slide-up">
                        <h3>Elevate Your Strategy with Generative AI</h3>
                        <p>
                            MarketMind bridges the gap between raw data and actionable strategy. By leveraging highly trained
                            AI models, the platform acts as an intelligent co-pilot for your sales and marketing teams.
                        </p>
                        <p>
                            We automate the generation of highly targeted ad campaigns, craft personalized sales pitches
                            based on prospect behavior, and provide deep lead insights that prioritize your team's efforts
                            on the most promising opportunities.
                        </p>

                        <ul className="about-list animate-slide-up animate-delay-1">
                            <li>
                                <div className="icon-wrap"><Target size={20} /></div>
                                <span><strong>Data-Driven Decision Making:</strong> Rely on predictive analytics rather than guesswork.</span>
                            </li>
                            <li>
                                <div className="icon-wrap"><TrendingUp size={20} /></div>
                                <span><strong>Predictive Analysis:</strong> Forecast market trends and customer behavior accurately.</span>
                            </li>
                            <li>
                                <div className="icon-wrap"><Zap size={20} /></div>
                                <span><strong>Automated Content:</strong> Instantly generate robust campaigns and pitches.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="about-image-wrapper animate-slide-up animate-delay-2">
                        <div className="stats-card">
                            <div className="stat-item">
                                <span className="stat-value">3x</span>
                                <span className="stat-label">Faster Campaign Generation</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">+45%</span>
                                <span className="stat-label">Lead Conversion Rate</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">24/7</span>
                                <span className="stat-label">Real-time Insights</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
