import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from "lodash.debounce";
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';

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
}));

function App() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [next, setNext] = useState({});
  const [types, setTypes] = useState([]);

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

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid container justify="center" className={classes.inputGrid} spacing={2}>
          <Grid item xs={6}>
            <Paper component="form" className={classes.root}>
              <InputBase
                placeholder="Search Pokemon"
                inputProps={{ 'aria-label': 'search pokemon' }}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              
              <FormControl className={classes.formControl}>
                <Select
                  native
                  inputProps={{
                    name: 'type',
                    id: 'type',
                  }}
                >
                  <option value="" >All Type</option>
                  {
                    types.map((item, index) => (
                      <option value={index+1} key={index}>{item.name}</option>
                    ))
                  }
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2}>
          <Grid container xs={8} spacing={2}>
            {
              list.map((item, index) => (
                <Grid item xs={3}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardContent>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`} alt={item.name} height="128" width="128" />
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          #{index+1}
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
        open={false}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Charizard"}</DialogTitle>
        <DialogContent>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" height="128" width="128" />
          <Chip size="small" label="flying" />
          <Chip size="small" label="fire" />
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
