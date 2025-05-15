import { useEffect, useState } from "react";
import { Link } from "react-router";
import NintendoIcon from "../assets/images/platforms/NintendoIcon.svg";
import PcIcon from "../assets/images/platforms/PcIcon.svg";
import PsIcon from "../assets/images/platforms/PsIcon.svg";
import XboxIcon from "../assets/images/platforms/XboxIcon.svg";
import type { Game } from "../services/UseFetchGames";

function Pub() {
  const [game, setGame] = useState<Game>();
  const gameId = 58175;

  const platformIcons: PlatformIconsType = {
    PC: PcIcon,
    Xbox: XboxIcon,
    PlayStation: PsIcon,
    Nintendo: NintendoIcon,
  };

  function isPlatformKey(key: string): key is keyof PlatformIconsType {
    return key in platformIcons;
  }

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(
          `https:api.rawg.io/api/games/${gameId}?key=95d7295d2a97423891de9826bea252cd`,
        );
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Erreur lors du chargement du jeu");
      }
    };

    fetchGame();
  }, []);

  return (
    <section
      className="pub"
      style={{
        backgroundImage: `url(${game?.background_image})`,
        backgroundSize: "cover",
      }}
    >
      <div className="pub-text">
        <h2>{game?.name}</h2>
        <h3>{game?.genres[0].name}</h3>
        <div className="platforms">
          {game?.parent_platforms
            .filter((elem) => isPlatformKey(elem.platform.name))
            .map((elem) => (
              <img
                key={elem.platform.id}
                src={
                  platformIcons[elem.platform.name as keyof PlatformIconsType]
                }
                alt=""
              />
            ))}
        </div>
        <p>{game?.rating}/5</p>
        <Link to={`/jeu/${game?.id}`} className="pub-button">
          Découvrir
        </Link>
      </div>
    </section>
  );
}

export default Pub;
