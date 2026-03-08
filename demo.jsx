import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Activity, X } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Demo.css';

const getDemoAIResponse = async (targetEntity, financialValue) => {
    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) return null;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are an AI sales analyzer. A user is targeting the customer segment "${targetEntity}" with a target revenue of "${financialValue}". Provide a 2-sentence highly professional, data-driven insight on how to convert these leads, and an estimated number of leads they might find (just give a number between 10 and 500). Format your response EXACTLY like this:
Insight: [Your 2 sentence insight]
Leads: [Number]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse response
        const insightMatch = text.match(/Insight:\s*(.*)/i);
        const leadsMatch = text.match(/Leads:\s*(\d+)/i);

        return {
            details: insightMatch ? insightMatch[1] : "Predictive alignment strong with historical closed-won profiles. Engaging decision-makers now with ROI case studies is recommended.",
            leadsIdentified: leadsMatch ? parseInt(leadsMatch[1], 10) : Math.floor(Math.random() * 50) + 10
        };
    } catch (error) {
        console.error("AI Generation Error:", error);
        return null;
    }
};

const Demo = () => {
    const [file, setFile] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [targetRevenue, setTargetRevenue] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    // Modal states
    const [showCampaign, setShowCampaign] = useState(false);
    const [showRawData, setShowRawData] = useState(false);

    const [generatingCampaign, setGeneratingCampaign] = useState(false);
    const [campaignData, setCampaignData] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0].name);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0].name);
        }
    };

    const handleAnalyze = async () => {
        if (!file && (!customerName || !targetRevenue)) return;
        setAnalyzing(true);
        setResult(null);

        const targetEntity = customerName.trim() || "Your Leads";
        const financialValue = targetRevenue ? `$${Number(targetRevenue).toLocaleString()}` : "$45,000+";

        // Call actual Gemini API
        const aiData = await getDemoAIResponse(targetEntity, financialValue);

        setAnalyzing(false);

        if (aiData) {
            setResult({
                insight: `High Conversion Probability: ${targetEntity}`,
                confidence: Math.floor(Math.random() * 15) + 85, // 85-99%
                details: aiData.details,
                leadsIdentified: aiData.leadsIdentified,
                revenuePotential: financialValue
            });
        } else {
            // Fallback if API key is missing or errored
            setResult({
                insight: `Analysis Complete: ${targetEntity}`,
                confidence: 94,
                details: `(API key missing/offline: Mock Data) Based on the provided parameters for ${targetEntity}, predictive models indicate a strong alignment. Engaging decision-makers now is highly recommended.`,
                leadsIdentified: Math.floor(Math.random() * 50) + 10,
                revenuePotential: financialValue
            });
        }
    };

    const handleGenerateCampaign = () => {
        setShowCampaign(true);
        setGeneratingCampaign(true);

        // Simulate campaign generation delay
        setTimeout(() => {
            setGeneratingCampaign(false);
            setCampaignData({
                subject: `Unlock ${targetRevenue ? `$${Number(targetRevenue).toLocaleString()}` : "Significant ROI"} with ${customerName || "Our Platform"}`,
                body: `Hi {{FirstName}},\n\nI noticed that companies in your sector are struggling with predicting revenue accurately. Based on our analysis, we can help you capture ${targetRevenue ? `$${Number(targetRevenue).toLocaleString()}` : "significant ROI"} over the next quarter.\n\nWould you be open to a 10-minute chat this week to see how?`,
                channels: ['Email Sequences', 'LinkedIn Direct Messages', 'Targeted Ads']
            });
        }, 2000);
    };

    return (
        <section id="demo" className="demo-section">
            <div className="container demo-container">

                <div className="demo-header">
                    <h2 className="section-title animate-slide-up">See MarketMind in Action</h2>
                    <p className="section-subtitle animate-slide-up animate-delay-1">
                        Upload a sample of your sales data (CSV/Excel) and watch our AI instantly generate predictive insights and strategic recommendations.
                    </p>
                </div>

                <div className="demo-workspace animate-slide-up animate-delay-2">
                    {/* Upload Area */}
                    <div className="demo-panel upload-panel">
                        <h3>1. Enter Target Criteria</h3>

                        <div className="demo-input-group">
                            <div className="input-field">
                                <label>Target Customer / Segment</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Acme Corp, Enterprise Tech"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <label>Expected Target Revenue ($)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 50000"
                                    value={targetRevenue}
                                    onChange={(e) => setTargetRevenue(e.target.value)}
                                />
                            </div>
                        </div>

                        <h3 className="upload-title">Or Upload Data File</h3>

                        <div
                            className={`upload-dropzone ${file ? 'has-file' : ''}`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                id="file-upload"
                                className="file-input"
                                onChange={handleFileChange}
                                accept=".csv, .xlsx, .json"
                            />
                            <label htmlFor="file-upload" className="upload-label">
                                {!file ? (
                                    <>
                                        <UploadCloud size={48} className="upload-icon" />
                                        <strong>Drag & Drop your sales data here</strong>
                                        <span>or click to browse files (CSV, XLSX)</span>
                                    </>
                                ) : (
                                    <>
                                        <FileText size={48} className="file-icon" />
                                        <strong>{file}</strong>
                                        <span className="file-success">Ready for analysis</span>
                                    </>
                                )}
                            </label>
                        </div>

                        <button
                            className={`btn-analyze ${(!file && (!customerName || !targetRevenue)) || analyzing ? 'disabled' : ''}`}
                            onClick={handleAnalyze}
                            disabled={(!file && (!customerName || !targetRevenue)) || analyzing}
                        >
                            {analyzing ? (
                                <>Analyzing with Gemini AI... <Activity className="spin" size={20} /></>
                            ) : (
                                'Generate AI Prediction'
                            )}
                        </button>
                    </div>

                    {/* Results Area */}
                    <div className="demo-panel results-panel">
                        <h3>2. AI Generated Insights</h3>

                        {!analyzing && !result && (
                            <div className="empty-state">
                                <div className="empty-icon-wrap">✨</div>
                                <p>Upload data and click analyze to generate insights.</p>
                            </div>
                        )}

                        {analyzing && (
                            <div className="analyzing-state">
                                <div className="scanning-line"></div>
                                <div className="mock-data-lines">
                                    <div className="line l1"></div>
                                    <div className="line l2"></div>
                                    <div className="line l3"></div>
                                </div>
                                <p>Processing millions of data points...</p>
                            </div>
                        )}

                        {result && (
                            <div className="result-card animate-fade-in">
                                <div className="result-header">
                                    <span className="result-badge success">
                                        <CheckCircle size={16} /> Analysis Complete
                                    </span>
                                    <span className="confidence">Confidence: <strong className="text-green">{result.confidence}%</strong></span>
                                </div>

                                <h4 className="insight-title">{result.insight}</h4>
                                <p className="insight-details">{result.details}</p>

                                <div className="result-stats">
                                    <div className="r-stat">
                                        <span className="r-value">{result.leadsIdentified}</span>
                                        <span className="r-label">High-Value Leads</span>
                                    </div>
                                    <div className="r-stat highlight-stat">
                                        <span className="r-value text-green">{result.revenuePotential}</span>
                                        <span className="r-label">Est. Target Revenue</span>
                                    </div>
                                </div>

                                <div className="result-actions">
                                    <button className="btn-action primary" onClick={handleGenerateCampaign}>Generate Campaign</button>
                                    <button className="btn-action secondary" onClick={() => setShowRawData(true)}>View Raw Data</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Campaign Modal */}
            {showCampaign && (
                <div className="demo-modal-overlay">
                    <div className="demo-modal">
                        <div className="modal-header">
                            <h3>AI Campaign Generator</h3>
                            <button className="btn-close" onClick={() => setShowCampaign(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {generatingCampaign ? (
                                <div className="loading-state">
                                    <Activity className="spin" size={32} />
                                    <p>Drafting personalized sequence...</p>
                                </div>
                            ) : campaignData ? (
                                <div className="campaign-results animate-fade-in">
                                    <div className="campaign-block">
                                        <h4>Recommended Channels</h4>
                                        <div className="channel-tags">
                                            {campaignData.channels.map(c => <span key={c} className="tag">{c}</span>)}
                                        </div>
                                    </div>
                                    <div className="campaign-block">
                                        <h4>Email Draft 1: Subject</h4>
                                        <div className="draft-box subject">{campaignData.subject}</div>
                                    </div>
                                    <div className="campaign-block">
                                        <h4>Email Draft 1: Body</h4>
                                        <div className="draft-box body">{campaignData.body}</div>
                                    </div>
                                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { alert('Campaign exported to CRM safely!'); setShowCampaign(false); }}>Export to CRM</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}

            {/* Raw Data Modal */}
            {showRawData && (
                <div className="demo-modal-overlay">
                    <div className="demo-modal data-modal">
                        <div className="modal-header">
                            <h3>Raw Data Analysis</h3>
                            <button className="btn-close" onClick={() => setShowRawData(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <pre className="code-block">
                                {JSON.stringify({
                                    target: customerName || "General",
                                    expectedRevenue: targetRevenue || "Unknown",
                                    confidenceScore: result?.confidence || 0,
                                    leadsProcessed: result?.leadsIdentified || 0,
                                    modelUsed: "gemini-pro",
                                    timestamp: new Date().toISOString(),
                                    signals: [
                                        { type: "intent", score: 0.89 },
                                        { type: "budget_fit", score: 0.94 }
                                    ]
                                }, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default Demo;
