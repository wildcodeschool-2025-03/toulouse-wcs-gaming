import { useState } from "react";
import GameCard from "../components/GameCard";
import UseFetchGames from "../services/UseFetchGames";

function GameList() {
  const games = UseFetchGames();
  const [visibleCount, setVisibleCount] = useState(50);

  const handleVoirPlus = () => {
    setVisibleCount((prev) => prev + 50);
  };

  if (!games || games.length === 0) {
    return <p>Aucun jeu trouvé.</p>;
  }

  return (
    <div>
      <div className="games-container">
        {games.slice(0, visibleCount).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {visibleCount < games.length && (
        <button
          type="button"
          onClick={handleVoirPlus}
          className="voir-plus-btn"
          aria-label="Voir plus de jeux"
        >
          Voir plus
        </button>
      )}
    </div>
  );
}

export default GameList;
