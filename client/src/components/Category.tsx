import { useEffect, useState } from "react";
import { Link } from "react-router";

type Genre = {
  id: number;
  name: string;
  image_background: string;
};

const Categories = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.rawg.io/api/genres?key=95d7295d2a97423891de9826bea252cd",
        );
        const data = await response.json();
        console.log(data.results);
        setGenres(data.results);
      } catch (err) {
        setError("Erreur lors du chargement ");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="category-section">
      <h2>Les catégories</h2>
      <div className="horizontal-scroll">
        {genres.map((genre) => (
          <div key={genre.id} className="genre-item">
            <Link to={`/genre/${genre.id}`} className="genre-link">
              <div className="genre-image-wrapper">
                <img
                  src={genre.image_background}
                  alt={genre.name}
                  className="genre-image"
                />
                <div className="genre-name">{genre.name}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
