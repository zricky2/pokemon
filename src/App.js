import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPage, { cancelToken: new axios.CancelToken(c => cancel = c) })
      .then(res => {
        setLoading(false)
        setNextPage(res.data.next)
        setPrevPage(res.data.previous)
        setPokemon(res.data.results.map(poke => poke.name))
      })
    return () => cancel()//cancel is a function itself
  }, [currentPage]) //only re-run the effect if currentPage changes

  function goToNextPage() {
    setCurrentPage(nextPage)
  }

  function goToPrevPage() {
    setCurrentPage(prevPage)
  }

  if (loading) return "Loading..."

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPage ? goToNextPage : null}
        goToPrevPage={prevPage ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
