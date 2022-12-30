import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import logo from '../img/highradius-logo.png'
import logoAbc from '../img/abc product.svg'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DeleteStyle, Addstyle, Editstyle, AdvanceStyle, AnalyticViewstyle, AnalyticBarstyle } from './ModalStyles'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function Header(props) {

    // Props Destructuring
    const { searchfields, editname, buttonOnOff, sl_no, MultiRowDelete, Predict_doc_id } = props

    // SNACKBAR 
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = useState(false);
    const [editSnackbar, seteditSnackbar] = useState(false)
    const [warnForAll, setwarnForAll] = useState(false)
    const [searchResult, setsearchResult] = useState(false)
    const [AdddataSnackBar, setAdddataSnackBar] = useState(false)
    const [AnalyticSnackbar, setAnalyticSnackbar] = useState(false)
    const [RefreshPageSnackbar, setRefreshPageSnackbar] = useState(false)
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        seteditSnackbar(false);
        setwarnForAll(false);
        setsearchResult(false);
        setAdddataSnackBar(false);
        setAnalyticSnackbar(false);
        setRefreshPageSnackbar(false)
    };

    // CURRENT DATE IN JAVASCRIPT
    const dateNow = new Date()
    const year = dateNow.getFullYear()
    const monthWithOffset = dateNow.getUTCMonth() + 1
    const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}` : monthWithOffset
    const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate()
    const materialDateInput = `${year}-${month}-${date}`

    // FOR DELETE  MODALS
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const DeleteOpen = () => setOpenDeleteModal(true);
    const DeleteClose = () => setOpenDeleteModal(false);
    //   FOR ADD MODAL
    const [openAddModal, setAddModal] = useState(false);
    const AddOpen = () => setAddModal(true);
    const Addclose = () => setAddModal(false);

    // FOR EDIT MODAL
    const [openEdit, setOpenEdit] = useState(false);
    const EditOpen = () => setOpenEdit(true);
    const EditClose = () => setOpenEdit(false);

    //FOR ANALYTICS VIEW
    const [openAnalytic, setOpenAnalytic] = useState(false);
    const AnalyticOpen = () => setOpenAnalytic(true);
    const AnalyticClose = () => setOpenAnalytic(false);

    const [AnalyticopenBar, setAnalyticopenBar] = React.useState(false);
    const OpenAnalyticBar = () => setAnalyticopenBar(true);
    const CloseAnalyticBar = () => setAnalyticopenBar(false);


    // EDIT OPERATION
    const [InvoiceCurrency, setInvoiceCurrency] = useState('')
    const [CustPayment, setCustPayment] = useState('')

    useEffect(() => {
        setInvoiceCurrency(editname.invoice_currency)
        setCustPayment(editname.cust_payment_terms)
    }, [editname])


    const HandleEditSubmit = async (InvoiceCurrency, CustPayment, sl_no) => {
        console.log(InvoiceCurrency, CustPayment, sl_no)
        await axios.put(`http://localhost:8080/Rest_API/CRUD?InvoiceCurrency=${InvoiceCurrency}&CustPayment=${CustPayment}&sl_no=${sl_no}`)
            .then(res => {
                if (res.status === 200) {
                    setTimeout(() => {
                        seteditSnackbar(true)
                    }, 2000);
                }
                if (res.status === 500) {
                    setTimeout(() => {
                        setwarnForAll(true)
                    }, 2000);
                }
            })
            .catch(err => console.warn(err))

        setInvoiceCurrency('')
        setCustPayment('')
        EditClose()

        props.reloadID(true)

    }



    // FOR ADVANCE MODAL
    const [openAdvance, setOpenAdvance] = useState(false);

    const AdvanceOpen = () => setOpenAdvance(true);
    const AdvanceClose = () => setOpenAdvance(false);

    const [AdvData, setAdvData] = useState([])

    const AdvanceSearchHandler = async (e, doc_id, cust_number, invoice_id, business_year) => {
        e.preventDefault()
        console.log(doc_id, cust_number, invoice_id, business_year)
        await axios.post(`http://localhost:8080/Rest_API/AdvanceSearch`, null, {
            params: {
                doc_id, cust_number, invoice_id, business_year
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setAdvData(res.data)
                    setsearchResult(true)
                    props.reloadID(true)


                }

            }

            ).catch(err => setwarnForAll(true))

            .catch(err => console.log(err))
        setOpenAdvance(false)
        setdoc_id('')
        setcust_number('')
        setinvoice_id('')
        setbusiness_year('')
    }

    useEffect(() => {
        AdvanceSearchHandler()
        props.AdvSearch(AdvData)
    }, [AdvData])


    //   FOR SEARCH BAR
    const [search, setSearch] = useState("")
    searchfields(search)



    // ADD OPERATION AXIOS , STATES AND FUNCTION
    const [business_code, setbusiness_code] = useState('')
    const [cust_number, setcust_number] = useState('')
    const [clear_date, setclear_date] = useState(materialDateInput)
    const [business_year, setbusiness_year] = useState('')
    const [doc_id, setdoc_id] = useState('')
    const [posting_date, setposting_date] = useState(materialDateInput)
    const [document_create_date, setdocument_create_date] = useState(materialDateInput)
    const [due_in_date, setdue_in_date] = useState(materialDateInput)
    const [invoice_currency, setinvoice_currency] = useState('')
    const [doc_type, setdoc_type] = useState('')
    const [posting_id, setposting_id] = useState(0)
    const [total_open_amount, settotal_open_amount] = useState(0)
    const [baseline_create_date, setbaseline_create_date] = useState(materialDateInput)
    const [cust_payment_terms, setcust_payment_terms] = useState('')
    const [invoice_id, setinvoice_id] = useState('')

    const AddData = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/Rest_API/CRUD`, null, {
            params: {
                business_code, cust_number, clear_date, business_year, doc_id, posting_date, document_create_date, 
                due_in_date, invoice_currency, doc_type, posting_id, 
                total_open_amount, baseline_create_date, cust_payment_terms, invoice_id
            }

        })
            .then(response => {
                if (response.status === 200) {
                    Addclose(true)
                    setAdddataSnackBar(true)
                    props.reloadID(true)
                }
            })
            .catch(err => setwarnForAll(true))


    }


    // DELETE AXIOS FUNCTION

    const DeletReq = async (e, sl_no) => {
        e.preventDefault()

        if (MultiRowDelete.length > 1) {

            await axios.delete(`http://localhost:8080/Rest_API/CRUD?sl_no=${MultiRowDelete}`).then(
                resdata => {
                    if (resdata.status === 200) {
                        DeleteClose()
                        setAdvData([])
                        setTimeout(() => {
                            setOpen(true)
                        }, 2000);
                        props.reloadID(true)

                    }
                }
            ).catch(err => setwarnForAll(true))

        }
        else {
            await axios.delete(`http://localhost:8080/Rest_API/CRUD?sl_no=${sl_no}`)
                .then(
                    resdata => {
                        if (resdata.status === 200) {
                            DeleteClose()
                            setAdvData([])

                            setTimeout(() => {
                                setOpen(true)
                            }, 2000);

                            props.reloadID(true)


                        }
                    }
                ).catch(err => setwarnForAll(true))
        }
    }


    // EDIT & DELETE TOGGLE OPERATIONS 
    const [AllcheckboxBtnON, setAllcheckboxBtnON] = useState(buttonOnOff)
    const DltSwitchOnOff = AllcheckboxBtnON === 0 ? true : false;
    const EditSwitchOnOff = AllcheckboxBtnON === 0 ? true : AllcheckboxBtnON > 1 ? true : false;
    const PredictBtnOnOff = buttonOnOff === 0 ? true : false;

    useEffect(() => {
        MultiRowDelete.length > 1 ? setAllcheckboxBtnON(2) : setAllcheckboxBtnON(0)

    }, [MultiRowDelete])
    useEffect(() => {
        setAllcheckboxBtnON(buttonOnOff)
    }, [buttonOnOff])


    // REFRESH GIRD

    const RefreshGrid = () => {
        setSearch('')
        setAdvData([])
        props.reloadID(true)
        setRefreshPageSnackbar(true)
    }




    // PREDICT FUNCTION
    const [MyID, setMyID] = useState(0)
    const [Predicted_Data, setPredicted_Data] = useState([])
    useEffect(() => {
        setMyID(parseInt(Predict_doc_id))
    }, [Predict_doc_id])

    const PredictHandler = async () => {

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/get_prediction',
            data: {
                "data": [MyID]
            }

        })
            .then(res => {
                setPredicted_Data(res.data)
                AddPredictDataToDB()
                props.reloadID(true)
                RefreshGrid()


            })
            .catch(err => console.warn(err))
    }


    const AddPredictDataToDB = () => {
        Predicted_Data.map(data => {
            const aging_bucket = data.aging_bucket
            const doc_id = data.doc_id
         return  axios.get(`http://localhost:8080/Rest_API/AnalyticView?aging_bucket=${aging_bucket}&doc_id=${doc_id}`)
                .then(res => {
                    if (res.status === 200) {

                        seteditSnackbar(true)
                    }
                })
                .catch(err => {
                    setwarnForAll(true)
                })

        
        })

    }



    // ANALYTICS VIEW STATES , AXIOS & FUNCTION

    const [clear_date_from, setclear_date_from] = useState('')
    const [clear_date_to, setclear_date_to] = useState('')

    const [due_date_from, setdue_date_from] = useState('')
    const [due_date_to, setdue_date_to] = useState('')

    const [baseline_create_date_from, setbaseline_create_date_from] = useState('')
    const [baseline_create_date_to, setbaseline_create_date_to] = useState('')

    const [invoice_currency_type, setinvoice_currency_type] = useState('')
    const [AnalyticsBarView, setAnalyticsBarView] = useState([])
    const HandleAnalyticsView = async () => {
        await axios.post('http://localhost:8080/Rest_API/AnalyticView', null, {
            params: {
                clear_date_from,
                clear_date_to,
                due_date_from,
                due_date_to,
                baseline_create_date_from,
                baseline_create_date_to,
                invoice_currency_type
            }
        })
            .then(res => {
               
                setAnalyticsBarView(res.data)
                AnalyticClose()
                OpenAnalyticBar(true)
                setAnalyticSnackbar(true)
                
            })
            .catch(err => console.log(err))
    }


    return (
        <>


            {/* DELETE MODALS */}
            <div>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openDeleteModal}
                    onClose={DeleteClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}

                >
                    <Fade in={openDeleteModal}>
                        <Box sx={DeleteStyle}>
                            <div>
                                <div className='Modal-box'>
                                    <div className='modal-body'>
                                        <form onSubmit={(e) => DeletReq(e, sl_no)}>
                                            <span className='ModalDeleteHead'>Delete Records ?</span>

                                            <span className='text-confirm'>Are You Sure you want to delete these record[s] ? </span>
                                            <div className="modal-btn-actions">
                                                <Button variant='outlined' onClick={DeleteClose}> Cancel</Button>
                                                <Button variant='outlined' type='submit' > Delete</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </Box>
                    </Fade>
                </Modal>
            </div>

            {/* DELETE MODALS END */}

            {/* ADD MODAL */}

            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openAddModal}
                    onClose={Addclose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openAddModal}>
                        <Box sx={Addstyle} className='modalbox' >
                            <span className='modalAddHead'>Add</span>
                            <form onSubmit={AddData} method="get">
                                <div className="add">
                                <div className="modal-body">
                                    <TextField id="filled-basic" size='small' label="Business code" variant="filled" onChange={e => setbusiness_code(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Customer Number" variant="filled" onChange={e => setcust_number(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Clear Date" variant="filled" type="date" defaultValue={materialDateInput} onChange={e => setclear_date(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Business Year" variant="filled" onChange={e => setbusiness_year(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Document Id" variant="filled" onChange={e => setdoc_id(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Posting Date" variant="filled" type="date" defaultValue={materialDateInput} onChange={e => setposting_date(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Document Create Date" variant="filled" type="date" defaultValue={materialDateInput} onChange={e => setdocument_create_date(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Due Date" variant="filled" type="date" defaultValue={materialDateInput} onChange={e => setdue_in_date(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Invoice Currency" variant="filled" onChange={e => setinvoice_currency(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Document Type" variant="filled" onChange={e => setdoc_type(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Posting ID" variant="filled" onChange={e => setposting_id(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Total Open Amount " variant="filled" onChange={e => settotal_open_amount(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Baseline Create Date " variant="filled" type="date" defaultValue={materialDateInput} onChange={e => setbaseline_create_date(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Customer Payment Terms " variant="filled" onChange={e => setcust_payment_terms(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="Invoice Id " variant="filled" onChange={e => setinvoice_id(e.target.value)} />
                                </div>
                                </div>

                                <div className="modal-btn-actions">
                                    <Button type="submit" variant='outlined' >ADD</Button>
                                    <Button variant='outlined' onClick={Addclose}>Cancel</Button>
                                </div>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
            </div>

            {/* ADD MODAL END */}


            {/* EDIT MODAL START */}

            <div>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openEdit}
                    onClose={EditClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openEdit}>
                        <Box sx={Editstyle} className='modalbox'>
                            <span className='modalEditHead'>Edit</span>


                            <div className="modal-body">
                                <TextField id="filled-basic" size='small' label="Invoice Currency" variant="filled" value={InvoiceCurrency} onChange={e => setInvoiceCurrency(e.target.value)} />
                                <TextField id="filled-basic" size='small' label="Customer Payment Terms" variant="filled" value={CustPayment} onChange={e => setCustPayment(e.target.value)} />
                            </div>


                            <div className="modal-btn-actions">
                                <Button onClick={() => HandleEditSubmit(InvoiceCurrency, CustPayment, sl_no)}>Edit</Button>
                                <Button onClick={EditClose}>Cancel</Button>
                            </div>

                        </Box>
                    </Fade>
                </Modal>
            </div>
            {/* EDIT MODAL END */}

            {/* ADVANCE MODAL START */}
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openAdvance}
                    onClose={AdvanceClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openAdvance}>
                        <Box sx={AdvanceStyle} className='modalbox'>
                            <span className='ModalAdvanceHead'>Advance Search</span>

                            <div className="modal-body">
                                <TextField id="filled-basic" size='small' label="Document Id" variant="filled" onChange={e => setdoc_id(e.target.value)} />
                                <TextField id="filled-basic" size='small' label="Customer Number" variant="filled" onChange={e => setcust_number(e.target.value)} />
                                <TextField id="filled-basic" size='small' label="Invoice Id " variant="filled" onChange={e => setinvoice_id(e.target.value)} />
                                <TextField id="filled-basic" size='small' label="Business Year" variant="filled" onChange={e => setbusiness_year(e.target.value)} />
                            </div>


                            <div className="modal-btn-actions">
                                <Button onClick={(e) => AdvanceSearchHandler(e, doc_id, cust_number, invoice_id, business_year)}>Search</Button>
                                <Button onClick={AdvanceClose}>Cancel</Button>
                            </div>

                        </Box>
                    </Fade>
                </Modal>
            </div>
            {/* ADVANCE MODAL END */}

            {/* ANALYTIC VIEW MODAL START */}
            <div>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openAnalytic}
                    onClose={AnalyticClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openAnalytic}>
                        <Box sx={AnalyticViewstyle} className='modalbox'>
                            <span className='modalAnalyticHead'>Analytics View</span>


                            <div className="modal-body">
                                <div className="data-field">
                                    <h4>Clear Date</h4>
                                    <TextField id="filled-basic" size='small' label="From" variant="filled" type="date" value={clear_date_from} onChange={e => setclear_date_from(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="To" variant="filled" type="date" value={clear_date_to} onChange={e => setclear_date_to(e.target.value)} />
                                </div>
                                <div className="data-field">
                                    <h4>Due Date</h4>
                                    <TextField id="filled-basic" size='small' label="From" variant="filled" type="date" value={due_date_from} onChange={e => setdue_date_from(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="To" variant="filled" type="date" value={due_date_to} onChange={e => setdue_date_to(e.target.value)} />
                                </div>
                                <div className="data-field">
                                    <h4>Baseline Create Date</h4>
                                    <TextField id="filled-basic" size='small' label="From" variant="filled" type="date" value={baseline_create_date_from} onChange={e => setbaseline_create_date_from(e.target.value)} />
                                    <TextField id="filled-basic" size='small' label="To" variant="filled" type="date" value={baseline_create_date_to} onChange={e => setbaseline_create_date_to(e.target.value)} />
                                </div>
                                <div className="data-field">
                                    <h4>Invoice Currency</h4>
                                    <TextField id="filled-basic" size='small' label="Invoice Currency" variant="filled" value={invoice_currency_type} onChange={e => setinvoice_currency_type(e.target.value)} />

                                </div>
                            </div>


                            <div className="modal-btn-actions">
                                <Button onClick={() => HandleAnalyticsView()}>Submit</Button>
                                <Button onClick={AnalyticClose}>Cancel</Button>
                            </div>

                        </Box>
                    </Fade>
                </Modal>
            </div>


            {/* BARCHAR & PIECHART MODAL */}
            <div>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={AnalyticopenBar}
                    onClose={CloseAnalyticBar}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={AnalyticopenBar}>
                        <Box sx={AnalyticBarstyle}>
                            <div>
                                <div className='Modal-box'>
                                    <div className='modal-body'>
                                        <ResponsiveContainer width="100%" height="50%" aspect={3}>
                                            <BarChart
                                                width={700}
                                                height={200}
                                                data={AnalyticsBarView}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                            >
                                                <CartesianGrid />
                                                <XAxis dataKey="All_Business_name" />
                                                <YAxis />
                                                <Tooltip/>
                                                <Legend verticalAlign='top' height={30}/>
                                                <Bar dataKey="Total_customers"  name='No of Customers' fill="#e75475" />
                                                <Bar dataKey="total_open_amount" name='Total Open Amount' fill="#1976d2" />

                                            </BarChart>

                                        </ResponsiveContainer>

                                       





                                        <Button style={{width:'100%',backgroundColor:'#1976d2',color:'#fff'}} variant="outlined" onClick={CloseAnalyticBar}>Close</Button>

                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
            {/* ANALYTIC VIEW MODAL END */}

            {/* SNACKBAR START */}
            <Stack spacing={2} sx={{ width: '20%' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Data Deleted SuccsessFully .
                    </Alert>
                </Snackbar>

                <Snackbar open={editSnackbar} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Data Updated SuccsessFully .
                    </Alert>
                </Snackbar>

                <Snackbar open={warnForAll} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Something Went Wrong  .. Error !!
                    </Alert>
                </Snackbar>

                <Snackbar open={searchResult} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Search Result Updated .
                    </Alert>
                </Snackbar>
                <Snackbar open={AdddataSnackBar} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Data Added SuccsessFully .
                    </Alert>
                </Snackbar>
                <Snackbar open={AnalyticSnackbar} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                       Showing Analytics View.
                    </Alert>
                </Snackbar>
                <Snackbar open={RefreshPageSnackbar} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                       Page Refreshed SuccsessFully .
                    </Alert>
                </Snackbar>
            </Stack>

            {/* HEADER SECTION START */}
            <header>
                <section className='logo-xl'>

                    <span className='abc-logo'><img src={logoAbc} alt="logo" /></span>
                    <span className='hrc-logo'><img src={logo} alt="logo" /></span>
                </section>
                                        <span className="invoiceList">Invoice List</span>
                <section className='btn-action-ctrl'>

                    <div className='btn-gr-1'>
                        <ButtonGroup size="small" aria-label="small button group" >
                            <Button type="submit" title='Predict' key="predict" disabled={PredictBtnOnOff} onClick={() => PredictHandler()}>Predict</Button>
                            <Button title='Analytics view' key="analytics_view" onClick={AnalyticOpen}>analytics view</Button>
                            <Button title='Advance search' key="advance_search" onClick={AdvanceOpen} >advance search</Button>
                            <Button title='Refresh Grid' key="refresh" onClick={RefreshGrid}><RefreshIcon /></Button>
                        </ButtonGroup>
                    </div>


                    <div className='search-action'>
                        <TextField id="filled-basic" size='small' value={search} onChange={e => { setSearch(e.target.value) }} label="Search Customer Id" variant="filled" />
                    </div>
                    <div className='btn-gr-2'>
                        <ButtonGroup size="small" aria-label="small button group-" >
                            <Button title='Add New Data' key="add" onClick={AddOpen}>add</Button>
                            <Button title='Edit Data' key="edit" onClick={EditOpen} disabled={EditSwitchOnOff}>edit</Button>
                            <Button title='Delete Data' key="delete" onClick={DeleteOpen} disabled={DltSwitchOnOff}>delete </Button>
                        </ButtonGroup>
                    </div>

                </section>

            </header>




        </>

    )
}

export default Header



