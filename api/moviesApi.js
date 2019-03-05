import React from "react";

export const fetchMoviesSearchAsync = async (search, page) => {
  const response = await fetch(
    `http://www.omdbapi.com/?s=${search}&page=${page}&type=movie&apikey=eebb2e6f`
  );
  if (!response.ok) {
    const text = await response.text();
    console.log(text);
    return;
  }

  const { Search: movies } = await response.json();
  if (!movies) return [];

  return movies.map((movie, key) => ({
    key: String(key + page * 10),
    ...movie,
  }));
};

export const fetchMovieDetailsAsync = async imdbID => {
  const response = await fetch(
    `http://www.omdbapi.com/?i=${imdbID}&type=movie&apikey=eebb2e6f`
  );
  const details = await response.json();
  console.log(details);
  return details;
};
