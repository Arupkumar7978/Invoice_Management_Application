import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InvoiceTable from "./components/InvoiceTable";




function App() {
  const [AdvanceDataContainer, setAdvanceDataContainer] = useState([])
  const AdvSearch = (resData) =>{
    setAdvanceDataContainer(resData)
    reload === false ? setreload(true) : setreload(false)
  }
  const [reload, setreload] = useState(false)
  const reloadID = (resData) => {
    reload === false ? setreload(resData) : setreload(false) 
  }
  const [searchData, setsearchData] = useState("");
  const searchfields = (resData) => {
    setsearchData(resData);
  };

  const [invoiceDataLength, setInvoiceDataLength] = useState(10);
  const invoiceLength = (resData) => {
    setInvoiceDataLength(resData);
  };

  const [pagelen, setpagelen] = useState("");
  const page = (resData) => {
    setpagelen(resData);
  };

  const [rowsperpage, setrowsperpage] = useState("");
  const perpagerow = (resData) => {
    setrowsperpage(resData);
  };

  const [editname, seteditname] = useState({
    invoice_currency: "",
    cust_payment_terms: "",
  });

  const changeedit = (invoice_currency, cust_payment_terms) => {
    seteditname({

      invoice_currency: invoice_currency,
      cust_payment_terms: cust_payment_terms,

    });
  };
  const [buttonOnOff, setbuttonOnOff] = useState();
  const btnOnOff = (resData) => {
    setbuttonOnOff(resData);
  };
  
 
  const [sl_no, setsl_no] = useState(0);
  const deleteID = (sl_no) => {
    setAdvanceDataContainer(AdvanceDataContainer)
    setsl_no(sl_no);
  };

  const [MultiRowDelete, setMultiRowDelete] = useState([])
  const Func_MultiRowDelete = (resData) =>{
      setMultiRowDelete(resData)
  }
 const [Predict_doc_id, setPredict_doc_id] = useState('')
 const Func_Predict_doc_id =(resData)=>{
  
  setPredict_doc_id(resData)
 }

  return (
    <>
       <Header
        searchfields={searchfields}
        editname={editname}
        buttonOnOff={buttonOnOff}
        sl_no={sl_no}
        reloadID={reloadID}
        AdvSearch={AdvSearch}
        MultiRowDelete={MultiRowDelete}
        Predict_doc_id={Predict_doc_id}
      />

     <InvoiceTable
        searchData={searchData}
        invoiceLength={invoiceLength}
        pagelen={pagelen}
        rowsperpage={rowsperpage}
        changeedit={changeedit}
        btnOnOff={btnOnOff}
        deleteID={deleteID}
        reload={reload}
        AdvanceDataContainer={AdvanceDataContainer}
        Func_MultiRowDelete={Func_MultiRowDelete}
        Func_Predict_doc_id ={Func_Predict_doc_id}
           />

       <Footer
        invoiceDataLength={invoiceDataLength}
        page={page}
        rowsPerPage={perpagerow}
      />         

      

      
     
    </>
  );
}

export default App;
