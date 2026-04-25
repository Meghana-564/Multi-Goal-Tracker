import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const CreateRoadmap = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleAIGenerate = async () => {
    if (!aiPrompt) return alert("Please enter a prompt first!");
    setIsGenerating(true);
    try {
      const res = await api.post('/ai/generate-roadmap', { prompt: aiPrompt });
      const generated = res.data;
      setTitle(generated.title);
      setDescription(generated.description);
      setCategory(generated.category);
      // Note: Full AI generation would also pre-fill steps in state and send them to the backend on submit.
    } catch (err) {
      console.error(err);
      alert('Failed to generate. Try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/roadmaps', { title, description, category });
      navigate(`/roadmaps/${res.data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>Create New Roadmap</h2>

      <div className="card" style={{ marginBottom: '2rem', border: '1px solid rgba(236, 72, 153, 0.4)' }}>
        <h3 style={{ color: '#ec4899', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0' }}>
          <Bot size={24} /> Auto-Generate with AI
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Describe your learning goal, and our AI will instantly structure a roadmap for you!
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="e.g., Become a Blockchain Developer in 3 months" 
            value={aiPrompt} 
            onChange={e => setAiPrompt(e.target.value)} 
          />
          <button type="button" className="ai-btn" onClick={handleAIGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="4" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <input type="text" className="form-control" placeholder="e.g. Web Development" value={category} onChange={e => setCategory(e.target.value)} required />
          </div>
          <button type="submit" className="btn" style={{ marginTop: '1rem', width: '100%' }}>Create Roadmap</button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateRoadmap;
