import ArticleCard from "../ReplicateVnexpress/ArticleCard";
import BreakingNewsTicker from "../ReplicateVnexpress/BreakingNewsTicker";
import HeroArticle from "../ReplicateVnexpress/HeroArticle";
import "./HomePage.css";

const HomePage = () => {
  const mockArticles = [
    {
      id: 1,
      title: "Economic recovery continues despite global challenges...",
      excerpt:
        "In 2024, the global economy continued to expand at a moderate rate, slowing as the end of the year beckoned. This moderate growth is expected to continue through 2025 and over the medium term. Although inflation rates came down, the economy has not fully caught up with the pandemic-related loss of earnings, in part because of weak employment growth.",
      category: "Business",
      time: "2 hours ago",
      imageUrl:
        "https://news.dominion-cs.com/wp-content/uploads/2020/09/The-global-economic-recovery-continues-1920x1024.jpg",
    },
    {
      id: 2,
      title: "Biển người chờ xem diễu binh ở trung tâm TP HCM",
      excerpt:
        "Bảy tiếng trước giờ khai mạc lễ 30/4, người dân đã đổ về Bến Bạch Đằng, các tuyến Tôn Đức Thắng, Lê Lợi, phố đi bộ Nguyễn Huệ, khu vực chợ Bến Thành... nằm la liệt, chen chúc để giữ chỗ chờ xem diễu binh.",
      category: "Event",
      time: "10 hours ago",
      imageUrl:
        "https://vcdn1-vnexpress.vnecdn.net/2025/04/30/z6555313178649-f91946efa7f6e7ff266b6cf095a59c14-1745970430-1745970542.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=eec4un9iBqItR3SHUbfjWQ",
    },
    {
      id: 3,
      title:
        "Thủ tướng Canada: 'Không bao giờ được quên bài học bị Mỹ phản bội'",
      excerpt:
        "Thủ tướng Carney tuyên bố Canada sẽ không bao giờ quên bài học về sự phản bội của Mỹ, sau khi đảng của ông giành quyền kiểm soát quốc hội. Chúng ta sẽ thắng trong cuộc chiến thương mại này và xây dựng nền kinh tế mạnh nhất trong G7, Thủ tướng Canada Mark Carney phát biểu trước người ủng hộ ở Ottawa ngày 29/4, đề cập nhóm 7 nền kinh tế hàng đầu thế giới gồm Canada, Mỹ, Anh, Pháp, Đức, Italy và Nhật Bản.",
      category: "Politics",
      time: "1 hours ago",
      imageUrl:
        "https://vcdn1-vnexpress.vnecdn.net/2025/03/15/AP25073637271475-9493-1741996496.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=xRCJgKsBp7MzMt0RtSrVhA",
    },
  ];
  return (
    <>
      <div className="homepage">
        {/* 1. Breaking News Ticker */}
        <BreakingNewsTicker />

        {/* 2. Featured Hero Article */}
        <HeroArticle />

        {/* 3. Article Lists */}
        <div className="content-grid">
          {mockArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
