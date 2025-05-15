import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UseFetchGames from "../services/UseFetchGames";

import { Link } from "react-router";
import NintendoIcon from "../assets/images/platforms/NintendoIcon.svg";
import PcIcon from "../assets/images/platforms/PcIcon.svg";
import PsIcon from "../assets/images/platforms/PsIcon.svg";
import XboxIcon from "../assets/images/platforms/XboxIcon.svg";
import Footer from "./Footer";
import NavBar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import Suggestion from "./Suggestion";

function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const games = UseFetchGames();

  const platformIcons = {
    PC: PcIcon,
    Xbox: XboxIcon,
    PlayStation: PsIcon,
    Nintendo: NintendoIcon,
  };

  interface PlatformIdsType {
    pc: number[];
    xbox: number[];
    playstation: number[];
    nintendo: number[];
  }

  const platformIds: PlatformIdsType = {
    pc: [1, 4, 6, 40849, 5, 31, 40847, 21, 8],
    xbox: [14],
    playstation: [3],
    nintendo: [7],
  };

  function isPlatformKey(key: string): key is keyof typeof platformIcons {
    return key in platformIcons;
  }

  const [description, setDescription] = useState<string | undefined>();

  useEffect(() => {
    const fetchGameDescription = async () => {
      const cacheKey = `game-${id}`;
      const cached = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(`${cacheKey}-timestamp`);

      const sixHours = 6 * 60 * 60 * 1000;

      if (
        cached &&
        cacheTime &&
        Date.now() - Number.parseInt(cacheTime) < sixHours
      ) {
        const parsed = JSON.parse(cached);
        setDescription(parsed.description);
        return;
      }

      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=95d7295d2a97423891de9826bea252cd`,
        );
        const data = await response.json();

        setDescription(data.description);
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      }
    };

    if (id) {
      fetchGameDescription();
    }
  }, [id]);

  const game = games.find((g) => g.id === Number(id));

  const [mainImage, setMainImage] = useState<string | undefined>();

  useEffect(() => {
    if (game?.short_screenshots && game.short_screenshots.length > 0) {
      setMainImage(game.short_screenshots[0].image);
    }
  }, [game]);

  return (
    <>
      <NavBar />
      <div className="detail-page">
        <section className="game-detail">
          <div className="detail-header">
            <img src={game?.background_image} alt={game?.name} />
          </div>
          <div className="gallery">
            <div className="detail-page-main-image">
              <img src={mainImage} alt={game?.name} />
            </div>
            <div className="detail-page-scroll-gallery">
              {game?.short_screenshots.map((element) => (
                <img
                  key={element.id}
                  src={element.image}
                  alt={game?.name}
                  onClick={() => {
                    setMainImage(element.image);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setMainImage(element.image);
                    }
                  }}
                  aria-label={`View screenshot ${element.id}`}
                  className={
                    mainImage === element.image ? "active-thumbnail" : ""
                  }
                />
              ))}
            </div>
          </div>
          <div className="detail-game-info">
            <h3>{game?.name}</h3>
            <h4>{game?.genres[0].name}</h4>
            <p>{description}</p>
            <div className="detail-platform">
              <Link to={`/categories/${platformIds.playstation.join(",")}`}>
                {game?.parent_platforms
                  .filter((elem) => isPlatformKey(elem.platform.name))
                  .map((elem) => (
                    <img
                      key={elem.platform.id}
                      src={
                        platformIcons[
                          elem.platform.name as keyof PlatformIconsType
                        ]
                      }
                      alt=""
                    />
                  ))}
              </Link>
            </div>
            <p>Date de sortie : {game?.released}</p>
            <div className="detail-esrb-rate">
              <p>
                <span className="esrb-orange">ESRB rating :</span>{" "}
                {game?.esrb_rating.name}
              </p>
              <div className="detail-rate">
                <p>{game?.rating}/5</p>
              </div>
            </div>
          </div>
        </section>
        <section className="detail-suggestion">
          <Suggestion />
        </section>
      </div>
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default GameDetail;
