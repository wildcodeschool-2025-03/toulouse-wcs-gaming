import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import favicon from "../assets/images/favicon.svg";
import type { Game } from "../services/UseFetchGames";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

function NavBar() {
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch(
          "https://api.rawg.io/api/games?key=95d7295d2a97423891de9826bea252cd",
        );
        const data = await res.json();
        setGames(data.results);
      } catch (error) {
        console.error("failed to fetch games");
      }
    }
    fetchGames();
  }, []);

  return (
    <>
      <div className="navbar">
        <button type="button" className="fav-nav" onClick={() => navigate("/")}>
          <img src={favicon} alt="nav-favicon" />
        </button>
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
      <SearchResults searchTerm={searchTerm} games={games} />
    </>
  );
}

export default NavBar;
