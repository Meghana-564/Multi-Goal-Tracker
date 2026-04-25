import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import RoadmapCard from '../components/RoadmapCard';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [myRoadmaps, setMyRoadmaps] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rmRes, userRes] = await Promise.all([
          api.get('/roadmaps/my-roadmaps'),
          api.get('/auth/me')
        ]);
        setMyRoadmaps(rmRes.data);
        setUserProfile(userRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading Dashboard...</div>;

  const xpData = [
    { name: 'XP Earned', value: userProfile?.xp || 0 },
    { name: 'Next Level', value: 1000 - ((userProfile?.xp || 0) % 1000) }
  ];
  const COLORS = ['#8b5cf6', '#334155'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem' }}>My Dashboard</h2>
        <Link to="/create" className="btn">+ Create New Roadmap</Link>
      </div>

      <div className="grid" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-muted)' }}>Experience Points</h3>
          <div style={{ width: '100%', height: 150 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={xpData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                  {xpData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="xp-indicator" style={{ fontSize: '1.5rem', marginTop: '-20px' }}>
             {userProfile?.xp || 0} XP
          </div>
        </div>

        <div className="card" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Current Streak</h3>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
            {userProfile?.currentStreak || 0} 🔥
          </div>
          <p>Days active</p>
        </div>

        <div className="card" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Badges</h3>
          {userProfile?.badges?.length > 0 ? (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {userProfile.badges.map((b, i) => <span key={i} className="badge">{b}</span>)}
            </div>
          ) : (
            <p>No badges yet. Keep learning!</p>
          )}
        </div>
      </div>

      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>My Roadmaps</h3>
      {myRoadmaps.length === 0 ? (
        <p>You haven't created any roadmaps yet.</p>
      ) : (
        <div className="grid">
          {myRoadmaps.map(rm => (
            <RoadmapCard key={rm._id} roadmap={rm} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
