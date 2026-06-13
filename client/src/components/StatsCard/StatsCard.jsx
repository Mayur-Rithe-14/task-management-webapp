import "./StatsCard.css";

const StatsCard = ({title, value}) => {
  return (
    <div className="stats-card">
      <p className="stats-card-title">{title}</p>
      <p className="stats-card-value">{value}</p>
    </div>
  );
};

export default StatsCard;
