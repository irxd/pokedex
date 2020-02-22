import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from "lodash.debounce";
import Grid from '@material-ui/core/Grid';
import Filter from './components/Filter';
import List from './components/List';
import Detail from './components/Detail';
import './App.css';
import { POKEMON_URL } from './utils/constant';

function App() {
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState({});
  const [next, setNext] = useState({});
  const [types, setTypes] = useState([]);
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState(0);

  const fetchPokemon = async param => {
    const result = await axios(
      `${POKEMON_URL}/pokemon${param ? '/'+param : ''}`,
    );
    if (!param) {
      setList(result.data.results);
      setNext(result.data.next);
    } else {
      setList([result.data]);
    }
  };

  const fetchType = async () => {
    const result = await axios(
      `${POKEMON_URL}/type`,
    );
    setTypes(result.data.results);
  };

  const fetchNextPokemon = async param => {
    const result = await axios(param);
    setList([...list, ...result.data.results]);
    setNext(result.data.next);
  };

  const fetchPokemonByType = async param => {
    const result = await axios(
      `${POKEMON_URL}/type/${param}`,
    );
    setList(result.data.pokemon.map(item => item.pokemon));
  };

  const fetchPokemonDetail = async param => {
    const result = await axios(
      `${POKEMON_URL}/pokemon/${param}`,
    );
    setDetail(result.data);
  };

  useEffect(() => {
    fetchPokemon();
    fetchType();
  }, []);

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight
    ) {
      fetchNextPokemon(next);
    }
  }, 100);

  const getPokemonId = url => {
    return url.split("/")[6];
  };

  const handleSubmit = event => {
    event.preventDefault();
    const param = event.target.search.value;
    fetchPokemon(param);
  };

  const handleFilter = event => {
    event.preventDefault();
    const param = event.target.value;

    if (!param) {
      fetchPokemon();
    } else {
      fetchPokemonByType(param);
    }
  };

  const handleDetail = name => {
    setModal(true);
    setValue(0);
    fetchPokemonDetail(name);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

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
