import React from 'react';
import { MailOpen, Mic, BarChart3, LineChart, Lightbulb } from 'lucide-react';
import './Features.css';

const features = [
    {
        icon: <MailOpen size={32} />,
        title: 'Campaign Generation',
        description: 'Instantly generate multi-channel marketing campaigns. Our AI analyzes your target audience and outputs cohesive copy, taglines, and ad structures.',
        color: 'blue'
    },
    {
        icon: <Mic size={32} />,
        title: 'Sales Pitch Creation',
        description: 'Dynamic pitch generation tailored to specific companies or individuals. Perfect your outreach with highly personalized messaging.',
        color: 'purple'
    },
    {
        icon: <BarChart3 size={32} />,
        title: 'Lead Scoring',
        description: 'Intelligent lead prioritization. Let AI predict conversion likelihood by analyzing historical data, behavior, and engagement metrics.',
        color: 'green'
    },
    {
        icon: <LineChart size={32} />,
        title: 'Market Analysis',
        description: 'Real-time competitive landscape and market trend decoding. Stay ahead of shifts with continuous automated analysis.',
        color: 'orange'
    },
    {
        icon: <Lightbulb size={32} />,
        title: 'Business Insights',
        description: 'Unlock hidden patterns in your sales data. Transform complex datasets into actionable strategic recommendations immediately.',
        color: 'yellow'
    }
];

const Features = () => {
    return (
        <section id="features" className="features-section">
            <div className="container">
                <h2 className="section-title animate-slide-up">Powerful AI Features</h2>
                <p className="section-subtitle animate-slide-up animate-delay-1">
                    A comprehensive suite of intelligence tools designed to accelerate your growth.
                </p>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className={`feature-card ${feature.color}-theme animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }} key={index}>
                            <div className="feature-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
