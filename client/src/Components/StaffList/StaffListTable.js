import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';

import './StaffList.css';
import greenPlus from "../../Images/green_plus.png"


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    height: '500px',
    width: '1200px',
    marginTop: '55px'
  },
});

const row = (x, i, header) => (
  <StyledTableRow key={`tr-${i}`}>
    {
      header.map((y, k) => (
        <StyledTableCell key={`trc-${k}`}>
          {x[y.prop]}
        </StyledTableCell>
      ))
    }
  </StyledTableRow>
);

export default function StaffListTable({ data, header }) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Grid container
      direction="column"
      justify="center"
      alignItems="center"
    >
      {/* <TableContainer component={Paper}> */}
      <Grid item xs={9}>
        <Table className={classes.table} aria-label="staffListTable">
          <TableHead>
            <TableRow>
              {
                header.map((x, i, header) =>
                  <StyledTableCell key={`thc-${i}`}>
                    {x.name}
                  </StyledTableCell>)
              }
              {/* <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Role</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((x, i) => (row(x, i, header)))}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </Grid>
      <button className="button"> <img src={greenPlus} className="greenPlus" alt="plus" />
      <Link to="registerStaff">Add New</Link>
      </button>
    </Grid>
  );
}