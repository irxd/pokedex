import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  inputGrid: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(10),
    minWidth: 200,
  }
}));

function Filter(props) {
  const classes = useStyles();
  const { handleSubmit, handleFilter, types } = props;

  return (
    <Grid container justify="center" className={classes.inputGrid} spacing={2}>
      <Grid item xs={6}>
        <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
          <InputBase
            placeholder="Search Pokemon"
            inputProps={{ 'aria-label': 'search pokemon' }}
            name="search"
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
          <FormControl className={classes.formControl}>
            <Select
              native
              inputProps={{
                name: 'type',
                id: 'type',
              }}
              onChange={handleFilter}
            >
              <option value="" >All Type</option>
              {
                types.map((type, index) => (
                  <option value={type.name} key={index}>{type.name}</option>
                ))
              }
            </Select>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Filter;