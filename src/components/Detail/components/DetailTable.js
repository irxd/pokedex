import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function DetailTable(props) {
  const { data, title, value } = props;
  return (
    <TableContainer component={Paper} style={{maxHeight: 160, overflow: 'auto'}}>
      <Table aria-label="simple table">
        <TableBody>
          {
            data && data.map(item => (
                <TableRow key={item[title].name}>
                <TableCell component="th" scope="row">
                    {item[title].name}
                </TableCell>
                <TableCell align="right">{item[value]}</TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DetailTable;
