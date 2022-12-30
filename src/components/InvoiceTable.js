import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { visuallyHidden } from '@mui/utils';



// Column Sorting 

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }


  const headCells = [
      
    {id:'sl_no', name:'Sl No'},
    {id:'business_code',name:'Business Code'},
    {id:'cust_number',name:'Cust Number'},
    {id:'clear_date',name:'Clear Date'},
    {id:'buisness_year',name:'Buisness Year'},
    {id:'doc_id',name:'Doc Id'},
    {id:'posting_date',name:'Posting Date'},
    {id:'document_create_date',name:'Document Create Date'},
    {id:'due_in_date',name:'Due Date'},
    {id:'invoice_currency',name:'Invoice Currency'},
    {id:'document_type',name:'Document Type'},
    {id:'posting_id',name:'Posting Id'},
    {id:'total_open_amount',name:'Total Open Amount'},
    {id:'baseline_create_date',name:'Baseline Create Date'},
    {id:'cust_payment_terms',name:'Cust Payment Terms'},
    {id:'invoice_id',name:'Invoice Id'},
    {id:'aging_bucket',name:'Aging bucket'},

]


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
   
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

    return (

        <TableHead >
        <TableRow >
          <TableCell padding="checkbox">
            <Checkbox
            sx={{ color: '#fff' }}
              color="default"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
            sx={{ color: '#fff' }}
              key={headCell.id}
              align="left"
              padding="normal"
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.name}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


export default function EnhancedTable(props) {

  const { searchData, pagelen, rowsperpage ,reload , AdvanceDataContainer} = props

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('sl_no');
    const [selected, setSelected] = useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = product.map((n) => n.sl_no);
            setSelected(newSelecteds);
            props.Func_MultiRowDelete(newSelecteds)

            return;
        }
        setSelected([]);
        props.Func_MultiRowDelete(35)

    };

    const handleClick = (event, sl_no, invoice_currency, cust_payment_terms ,doc_id) => {
        const selectedIndex = selected.indexOf(sl_no);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, sl_no);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
        props.changeedit(invoice_currency, cust_payment_terms)
        props.deleteID(sl_no)
        props.btnOnOff(newSelected.length)
         props.Func_Predict_doc_id(doc_id)
        props.Func_MultiRowDelete(newSelected)

    };



    
  // Avoid a layout jump when reaching the last page with empty rows.
  const isSelected = (name) => selected.indexOf(name) !== -1;

  

    // DATA FETCH USING AXIOS 
    const [product, setProduct] = useState([])
   

    const FetchData = async () => {
        await axios.get('http://localhost:8080/Rest_API/CRUD')
        
            .then(res => {
              setProduct(res.data) 
            
            })
            .catch(err => console.log(err))

    }
    useEffect(() => {
      if(AdvanceDataContainer.length === 0 ){
        FetchData()
        setSelected([])
        props.btnOnOff(0)

      }
      else{
        setProduct(AdvanceDataContainer)
        setSelected([])
        props.btnOnOff(0)
      }
     
    }, [reload])

   
  
   

    
   


    const emptyRows =
    pagelen > 0 ? Math.max(0, (1 + pagelen) * rowsperpage - product.length) : 0;
    
    // Passing DataLength through Props
    props.invoiceLength(product.length)


    // PREDECTION 

    

    return (

    <>
 <Box sx={{ width: '100%'}} >
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750, backgroundColor:'#283d4a'}}
                        aria-labelledby="tableTitle"
                        size='small'
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={product.length}
                        />
                        <TableBody>
              
              {stableSort(product, getComparator(order, orderBy))
                .filter(row =>{
                  if (searchData === "") {
                                        return row;
                                    }
                                    else if (row.cust_number.toString().includes(searchData.toString())) {
                                        return row
                                    }
                                    else{ return null ;}
                }).slice(pagelen * rowsperpage, pagelen * rowsperpage + rowsperpage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;


                  return (                    
                    <TableRow
                      
                      hover
                      onClick={(event) => handleClick(event, row.sl_no, row.invoice_currency, row.cust_payment_terms , row.doc_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      
                    >
                      <TableCell padding="checkbox" >
                        <Checkbox
                         sx={{ color: '#fff' }}
                          color="default"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#fff' }}  component="th" id={labelId}  scope="row" padding="none"   >{row.sl_no}</TableCell>
                      <TableCell padding='none' scope="row" component="th" sx={{ color: '#fff' }} id={labelId} >{row.business_code}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.cust_number}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.clear_date}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.buisness_year}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.doc_id}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.posting_date}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.document_create_date}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.due_in_date}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.invoice_currency}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.document_type}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.posting_id}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.total_open_amount}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.baseline_create_date}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.cust_payment_terms}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }}>{row.invoice_id}</TableCell>
                        <TableCell component="th" scope="row" padding="none" id={labelId} sx={{ color: '#fff' }} >{row.aging_bucket===null?'N/A' : row.aging_bucket }</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
                    </Table>
                </TableContainer>

            </Paper>

        </Box>
    </>
    );
}