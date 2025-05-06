import { useEffect, useState } from "react";
import "./Navbar.css";

const Narbar = () => {
  const [currentLang, setCurrentLang] = useState<string>("English");
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openLanguageMenu, setOpenLanguageMenu] = useState<boolean>(false);

  const handleClickOutside = (event: MouseEvent) => {
    const currentLanguageEl = document.getElementsByClassName("language")[0];
    if (
      currentLanguageEl &&
      !currentLanguageEl.contains(event.target as Node)
    ) {
      setIsDisplayed(false);
    }

    const mobileMenuBtn = document.getElementsByClassName("mobile-menu-btn")[0];
    if (mobileMenuBtn && !mobileMenuBtn.contains(event.target as Node)) {
      setIsMobileMenuOpen(false);
    }

    const languageMenuBtn =
      document.getElementsByClassName("sub-menu-language")[0];
    if (languageMenuBtn && !languageMenuBtn.contains(event.target as Node)) {
      setOpenLanguageMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    //clean up
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const languages = [
    { url: "https://www.google.com", name: "English" },
    { url: "https://www.google.fr", name: "French" },
    { url: "https://www.google.co.kr", name: "Korean" },
    { url: "https://www.google.co.jp", name: "Japanese" },
    { url: "https://www.google.es", name: "Español" },
  ];
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <a href="/">
            <img src="/images/logo.png" alt="RyanHuynhLogo" />
          </a>
          <div className="country">Canada</div>
        </div>

        {/* Mobile menu button */}
        <div
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <i id="bar" className="fa fa-bars"></i>

          {/* Dropdown menu for mobile */}
          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-items">
                <a href="/video">
                  <div className="menu-mobile-item">
                    <i className="fa fa-video-camera"></i> <span>Videos</span>
                  </div>
                </a>
                <a href="/photo">
                  <div className="menu-mobile-item">
                    <i className="fa fa-picture-o"></i> <span>Photos</span>
                  </div>
                </a>
                <a href="/fiction">
                  <div className="menu-mobile-item">
                    <i className="fa fa-book"></i> <span>Books</span>
                  </div>
                </a>
                <a href="/category">
                  <div className="menu-mobile-item">
                    <i className="fa fa-sitemap"></i> <span>Site map</span>
                  </div>
                </a>
                <a href="/model">
                  <div className="menu-mobile-item">
                    <i className="fa fa-female"></i> <span>Models</span>
                  </div>
                </a>

                <a href="/search">
                  <div className="menu-mobile-item">
                    <i className="fa fa-search"></i> <span>Search</span>
                  </div>
                </a>
                <a href="/trend">
                  <div className="menu-mobile-item">
                    <i className="fa fa-line-chart"></i> <span>Trends</span>
                  </div>
                </a>
                <a href="/comment">
                  <div className="menu-mobile-item">
                    <i className="fa fa-comment"></i> <span>Comments</span>
                  </div>
                </a>
                <a href="/game">
                  <div className="menu-mobile-item">
                    <i className="fa fa-gamepad"></i> <span>Games</span>
                  </div>
                </a>

                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenLanguageMenu((prev) => !prev);
                  }}
                >
                  <div className="menu-mobile-item sub-menu-language">
                    <i className="fa fa-language"></i> <span>Languages</span>{" "}
                    <i
                      className={`fa fa-chevron-${
                        openLanguageMenu ? "up" : "down"
                      }`}
                    ></i>
                  </div>
                </a>
                {/* Show language sub menu  */}
                {openLanguageMenu && (
                  <div className="language-menu">
                    {languages.map((lang, index) => (
                      <a
                        key={index}
                        rel="nofollow"
                        target="_blank"
                        onClick={() => setCurrentLang(lang.name)}
                      >
                        <div
                          className={`language ${
                            lang.name === currentLang ? "current" : ""
                          }`}
                        >
                          {lang.name}
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                <a href="/login-register">
                  <div className="menu-mobile-item">
                    <i className="fa fa-sign-in"></i>
                    <span>Login/Register</span>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="topMenu">
          <a href="/video">
            <div className="menu">
              <div>
                <i className="fa fa-video-camera"></i>{" "}
              </div>
              <div>Videos</div>
            </div>
          </a>
          <a href="/photo">
            <div className="menu">
              <div>
                <i className="fa fa-picture-o"></i>{" "}
              </div>
              <div>Photos</div>
            </div>
          </a>
          <a href="/fictions.html">
            <div className="menu">
              <div>
                <i className="fa fa-book"></i>{" "}
              </div>
              <div>Books</div>
            </div>
          </a>
          <a href="/categories.html">
            <div className="menu">
              <div>
                <i className="fa fa-sitemap"></i>{" "}
              </div>
              <div>Site map</div>
            </div>
          </a>
          <a href="/models.html">
            <div className="menu">
              <div>
                <i className="fa fa-female"></i>{" "}
              </div>
              <div>Models</div>
            </div>
          </a>
          <a href="/search.html">
            <div className="menu">
              <div>
                <i className="fa fa-search"></i>{" "}
              </div>
              <div>Search</div>
            </div>
          </a>
          <a href="/trend.html">
            <div className="menu">
              <div>
                <i className="fa fa-line-chart"></i>{" "}
              </div>
              <div>Trends</div>
            </div>
          </a>
          <a href="/comments.html">
            <div className="menu">
              <div>
                <i className="fa fa-comment"></i>{" "}
              </div>
              <div>Comments</div>
            </div>
          </a>
          <a href="/game.html" target="_blank">
            <div className="menu">
              <div>
                <i className="fa fa-gamepad"></i>{" "}
              </div>
              <div>Games</div>
            </div>
          </a>
        </div>
        <div className="languages">
          <div
            className="language current"
            onClick={() => setIsDisplayed(!isDisplayed)}
          >
            {currentLang}
          </div>
          {isDisplayed && (
            <div className="choose">
              {languages.map((lang, index) => (
                <a
                  key={index}
                  rel="nofollow"
                  target="_blank"
                  onClick={() => setCurrentLang(lang.name)}
                >
                  <div
                    className={`language ${
                      lang.name === currentLang ? "current" : ""
                    }`}
                  >
                    {lang.name}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="login">
          <div className="notLogined">
            <a href="https://" rel="nofollow">
              Login | Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Narbar;
