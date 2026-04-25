import { useState } from 'react';
import { Bot } from 'lucide-react';
import api from '../utils/api';

const StepItem = ({ step, isCompleted, onToggle, isOwner }) => {
  const [enhancedStep, setEnhancedStep] = useState(step);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleImprove = async () => {
    setIsEnhancing(true);
    try {
      const res = await api.post('/ai/enhance-step', { stepContent: enhancedStep });
      // In a real app we'd save this to DB immediately, here we just show the preview
      setEnhancedStep(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="step-item">
      <input 
        type="checkbox" 
        className="step-checkbox"
        checked={isCompleted}
        onChange={() => onToggle(enhancedStep._id || step._id)}
      />
      <div className="step-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h4 className="step-title">{enhancedStep.title || step.title}</h4>
          {isOwner && (
             <button onClick={handleImprove} className="ai-btn" disabled={isEnhancing}>
               <Bot size={14} /> {isEnhancing ? 'Improving...' : 'Improve AI'}
             </button>
          )}
        </div>
        {enhancedStep.description && <p className="step-desc">{enhancedStep.description}</p>}
        {enhancedStep.resourceLinks && enhancedStep.resourceLinks.length > 0 && (
          <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {enhancedStep.resourceLinks.map((link, idx) => (
              <a key={idx} href={link} target="_blank" rel="noreferrer" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#c4b5fd', padding: '0.2rem 0.5rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.8rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                Resource {idx + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepItem;
