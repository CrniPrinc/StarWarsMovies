import { useDispatch, useSelector } from "react-redux";
import DataTable from "../table/DataTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { moviesAction } from "../../store/slices/moviesSlice";

// eslint-disable-next-line react/prop-types
const MoviesList = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, error } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await axios.get("https://swapi.dev/api/films");
      const data = await response.data.results;
      const moviesWithId = data.map((movie) => ({
        ...movie,
        id: crypto.randomUUID(),
      }));
      dispatch(moviesAction.setMovies(moviesWithId));
      return moviesWithId;
    },
  });

  const movies = useSelector((state) => state.movies.movies);

  const moviesRows = movies
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      director: movie.director,
      producer: movie.producer,
      description: movie.opening_crawl ?? movie.description,
    }))
    .sort((a, b) => a.id - b.id);

  const moviesColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "director", headerName: "Director", width: 200 },
    { field: "producer", headerName: "Producer", width: 250 },
    { field: "description", headerName: "Description", width: 880 },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isError) {
    return <p>{error.message || "Failed to fetch movies"}</p>;
  }

  return <DataTable rows={moviesRows} columns={moviesColumns} slug="movie" />;
};

export default MoviesList;
