import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { getCast } from "../../api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

export default function MovieCast() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const getFilms = async () => {
      try {
        setLoader(true);
        const newCast = await getCast(movieId);

        setCast(newCast.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getFilms();
  }, [movieId]);

  return (
    <div>
      {loader && <Loader />}
      {error && <Error />}
      {cast && (
        <ul className={css.container}>
          {cast.map((item) => (
            <li key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                alt={item.name}
                width="300"
              />
              <p>{item.name}</p>
              <p>Character: {item.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
