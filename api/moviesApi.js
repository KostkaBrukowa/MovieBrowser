import React from "react";

export const fetchMoviesSearchAsync = async (search, page) => {
  const response = await fetch(
    `http://www.omdbapi.com/?s=${search}&page=${page}&type=movie&apikey=eebb2e6f`
  );
  const { Search: movies } = await response.json();
  return movies.map((movie, key) => ({ key:String(key+page*10), ...movie }));
};
