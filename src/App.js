import React from 'react';
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
  return (
    <div className="App">
      {/* <header className="App-header"> */}
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
                    <option value="" >Type</option>
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid container xs={8} spacing={2}>
              <Grid item xs={2}>
                {/* <Paper className={classes.paper}>card list</Paper> */}
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" height="128" width="128" />
                      <Typography gutterBottom variant="h5" component="h2">
                        Charizard
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        #1
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>card list</Paper>
              </Grid>
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
      {/* </header> */}
    </div>
  );
}

export default App;
