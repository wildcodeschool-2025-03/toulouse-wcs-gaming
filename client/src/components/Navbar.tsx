import { useState } from "react";
import { useNavigate } from "react-router";
import favicon from "../assets/images/favicon.svg";
import UseFetchGames from "../services/UseFetchGames";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

function NavBar() {
  const games = UseFetchGames();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

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
