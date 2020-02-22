import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from "lodash.debounce";
import Grid from '@material-ui/core/Grid';
import Filter from './components/Filter';
import List from './components/List';
import Detail from './components/Detail';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState({});
  const [next, setNext] = useState({});
  const [types, setTypes] = useState([]);
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    async function fetchPokemon() {
      const result = await axios(
        'https://pokeapi.co/api/v2/pokemon',
      );
      setList(result.data.results);
      setNext(result.data.next);
    }
    fetchPokemon();
  }, []);

  useEffect(() => {
    async function fetchType() {
      const result = await axios(
        'https://pokeapi.co/api/v2/type',
      );
      setTypes(result.data.results);
    }
    fetchType();
  }, []);

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight
    ) {
      async function fetchPokemon() {
        const result = await axios(next);
        setList([...list, ...result.data.results]);
        setNext(result.data.next);
      }
      fetchPokemon()
    }
  }, 100);

  function getPokemonId(url) {
    return url.split("/")[6];
  }

  function handleSubmit(event) {
    event.preventDefault();
    const param = event.target.search.value;

    async function fetchPokemon() {
      const result = await axios(
        `https://pokeapi.co/api/v2/pokemon/${param}`,
      );
      if (!param) {
        setList(result.data.results);
      } else {
        setList([result.data]);
      }
    }
    fetchPokemon();
  }

  function handleFilter(event) {
    event.preventDefault();
    const param = event.target.value;

    async function fetchPokemon() {
      const result = await axios(
        `https://pokeapi.co/api/v2/type/${param}`,
      );
      if (!param) {
        setList(result.data.results);
      } else {
        setList(result.data.pokemon.map(item => item.pokemon));
      }
    }
    fetchPokemon();
  }

  const handleDetail = name => {
    setModal(true);
    setValue(0);

    async function fetchPokemonDetail() {
      const result = await axios(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
      );
      setDetail(result.data);
    }
    fetchPokemonDetail();
  }

  const handleCloseModal = () => {
    setModal(false);
  }

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Filter
          handleSubmit={handleSubmit}
          handleFilter={handleFilter}
          types={types}
        />
        <List
          list={list}
          handleDetail={handleDetail}
          getPokemonId={getPokemonId}
        />
      </Grid>
      <Detail
        detail={detail}
        modal={modal}
        handleCloseModal={handleCloseModal}
        value={value}
        setValue={setValue}
      />
    </div>
  );
}

export default App;
