import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import StepItem from '../components/StepItem';
import ProgressBar from '../components/ProgressBar';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, LayoutList, Share2 } from 'lucide-react';
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const RoadmapDetail = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const exportRef = useRef(null);

  const [viewMode, setViewMode] = useState('list'); // 'list' or 'flow'
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // For adding new steps
  const [showStepForm, setShowStepForm] = useState(false);
  const [newStep, setNewStep] = useState({ title: '', description: '', link: '', order: 1 });

  const fetchData = async () => {
    try {
      const rmRes = await api.get(`/roadmaps/${id}`);
      setRoadmap(rmRes.data);
      
      if (user) {
        const progRes = await api.get(`/progress/${id}`);
        setProgress(progRes.data.completedSteps || []);
      }

      // Prepare React Flow nodes
      const generatedNodes = rmRes.data.steps.map((step, idx) => ({
        id: step._id,
        position: { x: 250, y: idx * 150 },
        data: { label: step.title },
        style: { background: 'rgba(30, 41, 59, 0.9)', color: 'white', border: '1px solid #8b5cf6', borderRadius: '8px', padding: '10px' }
      }));
      const generatedEdges = rmRes.data.steps.slice(0, -1).map((step, idx) => ({
        id: `e${step._id}-${rmRes.data.steps[idx+1]._id}`,
        source: step._id,
        target: rmRes.data.steps[idx+1]._id,
        animated: true,
        style: { stroke: '#ec4899' }
      }));
      setNodes(generatedNodes);
      setEdges(generatedEdges);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, user]);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  const handleToggleStep = async (stepId) => {
    if (!user) return navigate('/login');
    let updatedProgress;
    if (progress.includes(stepId)) {
      updatedProgress = progress.filter(id => id !== stepId);
    } else {
      updatedProgress = [...progress, stepId];
    }
    setProgress(updatedProgress);
    await api.post('/progress/update', { roadmapId: id, completedSteps: updatedProgress });
  };

  const handleAddStep = async (e) => {
    e.preventDefault();
    try {
      await api.post('/steps', { 
        roadmapId: id, 
        title: newStep.title, 
        description: newStep.description, 
        resourceLinks: newStep.link ? [newStep.link] : [],
        order: newStep.order 
      });
      setShowStepForm(false);
      setNewStep({ title: '', description: '', link: '', order: newStep.order + 1 });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportPDF = async () => {
    const input = exportRef.current;
    if (!input) return;
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${roadmap.title.replace(/\s+/g, '_')}_Roadmap.pdf`);
  };

  if (loading) return <div>Loading...</div>;
  if (!roadmap) return <div>Roadmap not found.</div>;

  const isOwner = user && roadmap.createdBy && roadmap.createdBy._id === user.id;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="card" style={{ marginBottom: '2rem' }} ref={exportRef}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="tag">{roadmap.category}</span>
            <h1 style={{ margin: '0.5rem 0', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {roadmap.title}
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>{roadmap.description}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleExportPDF} className="btn btn-secondary" title="Export PDF">
              <Download size={18} />
            </button>
            <button className="btn btn-secondary" title="Share">
              <Share2 size={18} />
            </button>
            <button onClick={() => setViewMode(viewMode === 'list' ? 'flow' : 'list')} className="btn btn-secondary" title="Toggle View">
              <LayoutList size={18} />
            </button>
          </div>
        </div>
        
        {user && (
          <div style={{ marginTop: '1.5rem' }}>
            <ProgressBar total={roadmap.steps.length} completed={progress.length} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Steps {viewMode === 'flow' && '(Flow View)'}</h2>
        {isOwner && viewMode === 'list' && (
          <button onClick={() => setShowStepForm(!showStepForm)} className="btn btn-secondary">
            {showStepForm ? 'Cancel' : '+ Add Step'}
          </button>
        )}
      </div>

      {showStepForm && viewMode === 'list' && (
        <form onSubmit={handleAddStep} className="card" style={{ marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.8)' }}>
           <div className="form-group">
            <label className="form-label">Step Title</label>
            <input type="text" className="form-control" value={newStep.title} onChange={e => setNewStep({...newStep, title: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control" value={newStep.description} onChange={e => setNewStep({...newStep, description: e.target.value})}></textarea>
          </div>
          <button type="submit" className="btn">Save Step</button>
        </form>
      )}

      {viewMode === 'list' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {roadmap.steps.length === 0 ? (
            <p>No steps added yet.</p>
          ) : (
            roadmap.steps.map(step => (
              <StepItem 
                key={step._id} 
                step={step} 
                isCompleted={progress.includes(step._id)}
                onToggle={handleToggleStep}
                isOwner={isOwner}
              />
            ))
          )}
        </div>
      ) : (
        <div style={{ width: '100%', height: '500px', border: '1px solid var(--glass-border)', borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-gradient)' }}>
          <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
          >
            <Background color="#ec4899" gap={16} />
            <Controls />
          </ReactFlow>
        </div>
      )}
    </motion.div>
  );
};

export default RoadmapDetail;
