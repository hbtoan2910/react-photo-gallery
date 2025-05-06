import "./ArticleCard.css";
const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img src={article.imageUrl} alt={article.title} />
      <div className="article-content">
        <h3>{article.title}</h3>
        <p className="excerpt">{article.excerpt}</p>
        <span className="timestamp">{article.time}</span>
      </div>
    </div>
  );
};

export default ArticleCard;
