import { useState, useEffect } from 'react';
import api from '../utils/api';
import RoadmapCard from '../components/RoadmapCard';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await api.get('/bookmarks');
        setBookmarks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>My Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid">
          {bookmarks.map(b => (
             b.roadmapId ? <RoadmapCard key={b._id} roadmap={b.roadmapId} /> : null
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
