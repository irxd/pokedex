import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
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

function Detail(props) {
  const classes = useStyles();
  const { detail, modal, handleCloseModal, value, setValue } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
            <Table aria-label="simple table">
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
              <Table aria-label="simple table">
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
              <Table aria-label="simple table">
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
  );
}

export default Detail;
