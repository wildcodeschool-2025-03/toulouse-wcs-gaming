import "../src/services/Reset.css";
import "./App.css";
import Categories from "./components/Category";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HorrorSection from "./components/HorrorSection";
import MostPopular from "./components/MostPopular";
import NavBar from "./components/Navbar";
import NewSection from "./components/NewSection";
import Pub from "./components/Pub";
import TopGames from "./components/TopGames";

function App() {
  return (
    <>
      <NavBar />
      <Header />
      <NewSection />
      <Categories />
      <TopGames />
      <Pub />
      <MostPopular />
      <HorrorSection />
      <Footer />
    </>
  );
}

export default App;
