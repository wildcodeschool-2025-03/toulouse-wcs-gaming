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
      const storedGames = localStorage.getItem("games");

      if (storedGames) {
        setGames(JSON.parse(storedGames));
      } else {
        let allGames: Game[] = [];
        for (let page = 1; page <= 20; page++) {
          const response = await fetch(
            `https://api.rawg.io/api/games?key=4bc0720168eb4f3a87dbdfbb61bc3461&page=${page}&page_size=20`,
          );
          const data = await response.json();
          allGames = [allGames, data.results];
        }
        setGames(allGames);
        localStorage.setItem("games", JSON.stringify(allGames));
      }
    };

    fetchGames();
  }, []);

  return games;
}

export default UseFetchGames;
