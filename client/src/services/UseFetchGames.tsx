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
  esrb_rating: { name: string; id: number };
  short_screenshots: { image: string; id: number }[];
}

function UseFetchGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const cacheKey = "games-data";
        const cacheTimeKey = "games-data-timestamp";
        const cachedGames = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(cacheTimeKey);

        const sixHours = 6 * 60 * 60 * 1000;

        if (
          cachedGames &&
          cacheTime &&
          Date.now() - Number(cacheTime) < sixHours
        ) {
          setGames(JSON.parse(cachedGames));
          console.log("Données chargées depuis le local storage");
          return;
        }

        let allGames: Game[] = [];
        for (let page = 1; page <= 30; page++) {
          const response = await fetch(
            `https://api.rawg.io/api/games?key=95d7295d2a97423891de9826bea252cd&page=${page}&page_size=20`,
          );
          const data = await response.json();

          const filteredGames = data.results.filter((game: Game) => {
            return (
              game.esrb_rating !== null &&
              game.esrb_rating?.id !== 5 &&
              game.genres &&
              game.genres.length > 0
            );
          });

          allGames = [...allGames, ...filteredGames];
        }

        localStorage.setItem(cacheKey, JSON.stringify(allGames));
        localStorage.setItem(cacheTimeKey, Date.now().toString());

        setGames(allGames);
        console.log(
          "Données chargées depuis l'API et stockées dans le local storage",
        );
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      }
    };

    fetchGames();
  }, []);

  return games;
}

export default UseFetchGames;
