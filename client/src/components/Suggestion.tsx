import { useParams } from "react-router";
import UseFetchGames from "../services/UseFetchGames";
import GameCard from "./GameCard";

function Suggestion() {
  const games = UseFetchGames();
  const { id } = useParams();
  const currentGame = games.find((g) => g.id === Number(id));

  const suggestedGame = games.filter(
    (g) =>
      g.id !== currentGame?.id &&
      g.genres.some((genre) =>
        currentGame?.genres.some(
          (currentGenre) => currentGenre.name === genre.name,
        ),
      ),
  );

  return (
    <div className="suggestion-container">
      <h2>Découvrez des titres similaires :</h2>
      <div className="suggested-cards">
        {suggestedGame.slice(0, 50).map((game) => (
          <button
            key={game.id}
            type="button"
            className="suggested-cards-scrollToTop"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <GameCard key={game.id} game={game} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Suggestion;
