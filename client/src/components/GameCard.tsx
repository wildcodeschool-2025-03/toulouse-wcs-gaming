import { Link } from "react-router";
import type { Game } from "../services/UseFetchGames";

import NintendoIcon from "../assets/images/platforms/NintendoIcon.svg";
import PcIcon from "../assets/images/platforms/PcIcon.svg";
import PsIcon from "../assets/images/platforms/PsIcon.svg";
import XboxIcon from "../assets/images/platforms/XboxIcon.svg";

interface gameProps {
  game: Game;
}

interface PlatformIconsType {
  PC: string;
  Xbox: string;
  PlayStation: string;
  Nintendo: string;
}

function GameCard({ game }: gameProps) {
  const platformIcons: PlatformIconsType = {
    PC: PcIcon,
    Xbox: XboxIcon,
    PlayStation: PsIcon,
    Nintendo: NintendoIcon,
  };

  function isPlatformKey(key: string): key is keyof PlatformIconsType {
    return key in platformIcons;
  }

  console.log(game);

  return (
    <Link to={`/jeu/${game.id}`} className="card-link">
      <div key={game.id} className="card-body">
        <div className="card-img">
          <img src={game.background_image} alt={game.name} />
        </div>
        <div className="card-info">
          <h3>{game.name}</h3>
          <h4>{game.genres?.[0]?.name || "Genre non disponible"}</h4>
          <div className="platforms-rate">
            <div className="platforms">
              {game.parent_platforms
                ?.filter((elem) => isPlatformKey(elem.platform.name))
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
            </div>
            <p className="rate">{game.rating}/5</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
