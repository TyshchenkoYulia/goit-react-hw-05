import { useEffect, useState } from "react";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import css from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { getSearchMovies } from "../../api";

export default function MoviesPage({ onSubmit }) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [notFoundError, setNotFoundError] = useState(false);

  const onSubmitForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = form.elements.topic.value;
    if (data.trim() === "") {
      toast.error("Please, enter your request!");
      return;
    }
    onSubmit(data.trim());
    form.reset();
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const getMovies = async () => {
      try {
        setError(false);
        setLoader(true);
        setNotFoundError(false);

        const newMovies = await getSearchMovies(query, page);

        if (newMovies.length === 0) {
          setNotFoundError(true);
        }

        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getMovies();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <form className={css.container} onSubmit={onSubmitForm}>
        <input
          className={css.input}
          name="movies"
          type="text"
          autoComplete="off"
          autoFocus
        />
        <button className={css.btn} type="submit">
          Search
        </button>
        <Toaster />
      </form>
      {loader && <Loader />}
      {error && <Error />}
      {notFoundError && <p>Not found! Please, try to make another request!</p>}
      {movies.length > 0 && !loader && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
}
