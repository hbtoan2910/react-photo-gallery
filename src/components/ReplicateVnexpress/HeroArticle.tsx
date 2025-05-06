import "./HeroArticle.css";

const HeroArticle = () => {
  const heroArticle = {
    title: "Global Summit Addresses Climate Change",
    excerpt:
      "A Global Summit on Climate Change and Human Rights is planned for June 2025, co-hosted by the UN Human Rights Office and various universities. The summit aims to advance human rights-based solutions to the climate crisis, amplify the voices of environmental human rights defenders, and inspire action, particularly among students. Additionally, a virtual summit in April 2025, convened by UN Secretary-General António Guterres and Brazilian President Luiz Inácio Lula da Silva, focused on accelerating global climate ambition ahead of COP30. COP30 is scheduled to take place in Belém, Brazil, from November 10 to 21, 2025. ",
    imageUrl: "https://cdn.mos.cms.futurecdn.net/TY6SwtikwK9QzrrmuZcfoj.jpg",
    category: "World situation",
  };

  return (
    <div className="hero-article">
      <img src={heroArticle.imageUrl} alt={heroArticle.title} />
      <div className="hero-text">
        <span className="category-badge">{heroArticle.category}</span>
        <h1>{heroArticle.title}</h1>
        <p>{heroArticle.excerpt}</p>
      </div>
    </div>
  );
};

export default HeroArticle;
