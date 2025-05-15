import { useEffect, useState } from "react";
import { Link } from "react-router";
import NintendoIcon from "../assets/images/platforms/NintendoIcon.svg";
import PcIcon from "../assets/images/platforms/PcIcon.svg";
import PsIcon from "../assets/images/platforms/PsIcon.svg";
import XboxIcon from "../assets/images/platforms/XboxIcon.svg";
import type { Game } from "../services/UseFetchGames";

function HorrorSection() {
  const [game, setGame] = useState<Game>();
  const gameId = 480;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      className="horror-section"
      style={{
        backgroundImage: `url(${game?.background_image})`,
        backgroundPosition: "center",
      }}
      onMouseMove={handleMouseMove} // AJOUT : Gestion du mouvement de la souris
      onMouseEnter={() => setIsHovering(true)} // AJOUT : Activation du survol
      onMouseLeave={() => setIsHovering(false)} // AJOUT : Désactivation du survol
    >
      <div
        className="torch-overlay"
        style={
          isHovering
            ? {
                WebkitMaskImage: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 80%)`, // Modification dynamique de l'effet
                maskImage: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 80%)`, // Modification dynamique de l'effet
              }
            : {}
        }
      />
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

export default HorrorSection;
