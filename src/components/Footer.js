import React, { useState } from 'react'
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';


const Footer = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  props.page(page)
  props.rowsPerPage(rowsPerPage)
  return (
    <>
      <footer>
      <Paper elevation={4} >
        <TablePagination
          className="footer-body"
          sx={{ backgroundColor: '#283d4a ', color: '#fff' }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.invoiceDataLength}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
        <div className="footer-text">
          <a href="/PrivacyPolicy">Privacy Policy </a> &nbsp;| &#169; 2022 HighRadius Corporation. All rights reserved.
        </div>

      </footer>

    </>
  )
}

export default Footer