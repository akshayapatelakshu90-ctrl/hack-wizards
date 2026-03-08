import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.css';

const getAIResponse = async (prompt) => {
    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            return "I'm sorry, my AI processing is currently offline. Please configure your VITE_GEMINI_API_KEY in the .env file to enable live predictions.";
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(
            `You are MarketMind AI, a specialized sales and marketing intelligence assistant. Provide a concise, professional, data-driven response to this query: ${prompt}`
        );
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Generation Error:", error);
        return "I encountered an error analyzing that data. Please try again later or verify your API key.";
    }
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: "welcome",
            text: "Hi there! I'm MarketMind AI. I can analyze your sales data, predict trends, or answer questions about your metrics. How can I help today?",
            sender: "bot"
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const newUserMsg = { id: Date.now().toString(), text: inputValue, sender: "user" };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        // Call actual Gemini API
        const responseText = await getAIResponse(newUserMsg.text);
        setMessages(prev => [...prev, { id: Date.now().toString() + "_bot", text: responseText, sender: "bot" }]);
        setIsTyping(false);
    };

    return (
        <div className="chatbot-widget">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-avatar">
                            <Bot size={20} />
                        </div>
                        <div className="chatbot-title">
                            <h3>MarketMind AI</h3>
                            <span>Online</span>
                        </div>
                        <button className="theme-toggle" onClick={toggleChat} aria-label="Close Chat">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input-area" onSubmit={handleSend}>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Ask about your sales data..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="btn-send"
                                disabled={!inputValue.trim() || isTyping}
                                aria-label="Send message"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <button
                className={`chatbot-toggle-btn ${isOpen ? 'active' : ''}`}
                onClick={toggleChat}
                aria-label="Toggle AI Chat"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    );
};

export default Chatbot;
