import { useState, useEffect } from 'react';
import api from '../utils/api';
import RoadmapCard from '../components/RoadmapCard';

const Home = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await api.get('/roadmaps');
        setRoadmaps(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmaps();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>Discover Your Path</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Explore structured learning roadmaps created by the community.</p>
      </div>

      <div className="grid">
        {roadmaps.map(rm => (
          <RoadmapCard key={rm._id} roadmap={rm} />
        ))}
      </div>
    </div>
  );
};

export default Home;
