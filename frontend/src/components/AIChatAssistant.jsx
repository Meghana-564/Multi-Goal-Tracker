import { useState, useContext } from 'react';
import api from '../utils/api';
import { Bot, X, MessageSquare, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const AIChatAssistant = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ai', type: 'text', text: 'Hi! I am your AI learning assistant. Ask me for a roadmap (e.g. "Python roadmap") or ask any learning question!' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', { message: userMessage });
      const data = res.data;
      if (data.type === 'roadmap') {
        setMessages(prev => [...prev, { sender: 'ai', type: 'roadmap', roadmap: data.roadmap }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', type: 'text', text: data.reply }]);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Sorry, I encountered an error.';
      setMessages(prev => [...prev, { sender: 'ai', type: 'text', text: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="card"
            style={{ width: '350px', height: '450px', marginBottom: '1rem', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
          >
            <div style={{ background: 'var(--primary-color)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                <Bot size={20} /> AI Assistant
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%' }}>
                  {m.sender === 'user' || m.type === 'text' ? (
                    <div style={{ background: m.sender === 'user' ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '12px' }}>
                      {m.text}
                    </div>
                  ) : m.type === 'roadmap' ? (
                    <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '0.75rem', fontSize: '0.82rem' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#a78bfa' }}>🗺️ {m.roadmap.title}</div>
                      {m.roadmap.steps.map(s => (
                        <div key={s.step} style={{ marginBottom: '0.6rem', borderLeft: '2px solid #8b5cf6', paddingLeft: '0.6rem' }}>
                          <div style={{ fontWeight: '600' }}>Step {s.step}: {s.topic}</div>
                          <div style={{ color: 'rgba(255,255,255,0.65)', margin: '0.2rem 0' }}>{s.subtopics.join(' · ')}</div>
                          <div style={{ color: '#34d399', fontSize: '0.78rem' }}>🛠 {s.project}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              {loading && <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '12px' }}>Typing...</div>}
            </div>

            <form onSubmit={handleSend} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(15, 23, 42, 0.8)' }}>
              <input 
                type="text" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                placeholder="Ask something..." 
                className="form-control" 
                style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              />
              <button type="submit" className="btn" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, padding: '0 1rem' }}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(236, 72, 153, 0.4)' }}
        >
          <MessageSquare size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default AIChatAssistant;
