import { Link } from 'react-router-dom';

const RoadmapCard = ({ roadmap }) => {
  return (
    <div className="card">
      <div>
        <span className="tag">{roadmap.category}</span>
      </div>
      <h3 className="card-title">{roadmap.title}</h3>
      <p className="card-desc">{roadmap.description}</p>
      <Link to={`/roadmaps/${roadmap._id}`} className="btn btn-secondary" style={{ textAlign: 'center', marginTop: '1rem' }}>
        View Roadmap
      </Link>
    </div>
  );
};

export default RoadmapCard;
