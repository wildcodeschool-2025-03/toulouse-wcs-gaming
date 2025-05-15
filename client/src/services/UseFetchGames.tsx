import { useEffect, useState } from "react";

export interface Game {
  id: number;
  name: string;
  description: string;
  released: string;
  background_image: string;
  rating: number;
  rating_top: number;
  suggestions_count: number;
  parent_platforms: { platform: { name: string; id: string } }[];
  genres: { name: string; image_background: string }[];
  esrb_rating: { name: string };
  short_screenshots: { image: string; id: number }[];
}

function UseFetchGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const cached = localStorage.getItem("gamesData");
        const cacheTime = localStorage.getItem("gamesDataTimestamp");

        if (
          cached &&
          cacheTime &&
          Date.now() - Number.parseInt(cacheTime) < 6 * 60 * 60 * 1000
        ) {
          const parsed = JSON.parse(cached);
          setGames(parsed);
          return;
        }

        const response = await fetch(
          "https://api.rawg.io/api/games?key=95d7295d2a97423891de9826bea252cd",
        );
        const data = await response.json();

        setGames(data.results);
        localStorage.setItem("gamesData", JSON.stringify(data.results));
        localStorage.setItem("gamesDataTimestamp", Date.now().toString());
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      }
    };

    fetchGames();
  }, []);

  return games;
}

export default UseFetchGames;
