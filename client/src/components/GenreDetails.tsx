import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UseFetchGames from "../services/UseFetchGames";
import GameCard from "./GameCard";
import NavBar from "./Navbar";

type Genre = {
  id: number;
  name: string;
  image_background: string;
  description: string;
};

const GenreDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [genre, setGenre] = useState<Genre | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const games = UseFetchGames();

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/genres/${id}?key=95d7295d2a97423891de9826bea252cd`,
        );
        if (!response.ok) throw new Error("Erreur lors du chargement");
        const data = await response.json();
        setGenre(data);
      } catch (err) {
        setError("Erreur lors de la récupération du genre.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenre();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!genre) return <p>Aucun genre trouvé.</p>;

  return (
    <>
      <div>
        <NavBar />
        <div className="gamesDetails">
          <div className="Detail-img">
            <img src={genre.image_background} alt={genre.name} />
          </div>
          <h1>{genre.name}</h1>
          <div className="games-container">
            {games?.map((game) => (
              <GameCard game={game} key={game.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GenreDetails;
