import "./BreakingNewsTicker.css";

const BreakingNewsTicker = () => {
  const breakingNews = [
    "Storm approaching coastal regions | Live updates",
    "Stock market drops 2% amid global tensions",
    "Temu and Shein customers in the US are reeling, but they say they have no other choice",
    //... fetched from API
  ];

  return (
    <div className="ticker-container">
      <span className="ticker-label">BREAKING:</span>
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {breakingNews.map((item, index) => (
            <span key={index} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BreakingNewsTicker;
