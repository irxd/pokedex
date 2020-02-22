import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from "lodash.debounce";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Filter from './components/Filter';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  inputGrid: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(10),
    minWidth: 200,
  },
  media: {
    height: 140,
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function App() {
  const classes = useStyles();
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Filter
          handleSubmit={handleSubmit}
          handleFilter={handleFilter}
          types={types}
        />
        <Grid container justify="center" spacing={2}>
          <Grid container xs={8} spacing={2}>
            {
              list.map(pokemon => (
                <Grid item xs={3}>
                  <Card className={classes.root} onClick={() => {handleDetail(pokemon.name)}}>
                    <CardActionArea>
                      <CardContent>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id || getPokemonId(pokemon.url)}.png`} alt={pokemon.name} height="128" width="128" />
                        <Typography gutterBottom variant="h5" component="h2">
                          {pokemon.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          #{pokemon.id || getPokemonId(pokemon.url)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={modal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><Chip label={`#${detail.id}`} /> {detail.name}</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={4}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detail.id}.png`} alt={detail} height="196" width="196" />
            </Grid>
            <Grid item xs={8}>
               <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="full width tabs example"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Info" />
                <Tab label="Stats" />
                <Tab label="Abilities" />
              </Tabs>
              <TabPanel value={value} index={0}>
              <TableContainer component={Paper} style={{maxHeight: 160}}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow key='height'>
                      <TableCell component="th" scope="row">
                        Height
                      </TableCell>
                      <TableCell align="right">{detail.height}</TableCell>
                    </TableRow>
                    <TableRow key='weight'>
                      <TableCell component="th" scope="row">
                        Weight
                      </TableCell>
                      <TableCell align="right">{detail.weight}</TableCell>
                    </TableRow>
                    <TableRow key='base_exp'>
                      <TableCell component="th" scope="row">
                        Base Experience
                      </TableCell>
                      <TableCell align="right">{detail.base_experience}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TableContainer component={Paper} style={{maxHeight: 160, overflow: 'auto'}}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      {
                        detail.stats && detail.stats.map(item => (
                          <TableRow key={item.stat.name}>
                            <TableCell component="th" scope="row">
                              {item.stat.name}
                            </TableCell>
                            <TableCell align="right">{item.base_stat}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <TableContainer component={Paper} style={{maxHeight: 160, overflow: 'auto'}}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      {
                        detail.abilities && detail.abilities.map(item => (
                          <TableRow key={item.ability.name}>
                            <TableCell component="th" scope="row">
                              {item.ability.name}
                            </TableCell>
                            <TableCell align="right">{item.slot}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </Grid>
            <Grid item xs={4} spacing={2}>
              {
                detail.types && detail.types.map(type => (
                  <Chip className={classes.chip} size="small" label={type.type.name} />
                ))
              }
            </Grid>
          </Grid>
          
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
