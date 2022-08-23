import React from "react"
import { useEffect, useState } from "react"
import * as XLSX from 'xlsx'
import { Data } from "./Data.js";

function Tabel({ user }) {

  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);  
  const [excelData, setExcelData] = useState(null);
  const fileType = ['application/vnd.ms-excel'];

  useEffect(() => {
    converExxcelToJSON()
  }, [])

  async function converExxcelToJSON() {
    var name = './Dubai.xls';
    // const file = XLSX.readFile('./Data.xls');
    // const sheetNames = file.SheetNames
    // const reader = new FileReader();
    // reader.onload = (evt) => { 
    //     const bstr = evt.target.result;
    //     const wb = XLSX.read(bstr, {type:'binary'});
    //     const wsname = wb.SheetNames[0];
    //     console.log("SHARE", wsname);
    //     const ws = wb.Sheets[wsname];
    //     const data = XLSX.utils.sheet_to_csv(ws, {header:1});
    // };
    // await fetch('./Dubai.xls')
    //     .then(resp => console.log(resp.arrayBuffer()))
    //     .then(buff => { 
    //       console.log(buff)
    //     })
    //     .catch(err => console.error(err))

    // const result = excelToJson({
    //   sourceFile: name
    // });
    // console.log("result: ", result);
  }

  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    console.log("sel: ",  e.target.files[0]);
    if(selectedFile) {
        if(selectedFile && fileType.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = (e) => {
            setExcelFileError(null);
            setExcelFile(e.target.result);
            handleSubmit(e, e.target.result)
          }
        }
        else {
          setExcelFileError('Please select only excel file types');
          setExcelFile(null);
        }
    }
    else{
      console.log('plz select your file');
    }
  }

  function handleSubmit(e, buffer = excelFile) {
    e.preventDefault();
    if(buffer !== null){
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
    else{
      setExcelData(null);
    }
  }
  
  return (
    <div className="table__container">
      <div className='form'>
        <form className='form-group' autoComplete="off"
            onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' 
                    className='form-control'
                    onChange={handleFile} required></input>                  
          { 
            excelFileError && 
                <div className='text-danger' style={{ marginTop: 5+'px' }}>{ excelFileError }</div>
          }
          {/* <button type='submit' 
                    className='btn btn-success' 
                    style={{ marginTop:5+'px' }}>Submit</button> */}
        </form>
      </div>
      <br></br>
      <div className='viewer'>
        {excelData === null && <>No file selected</>}
        {excelData !== null && ( 
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>title</th>
                  <th scope='col'>longitude</th>
                  <th scope='col'>latitude</th>
                  <th scope='col'>instalation date</th>
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData}/>
              </tbody>
            </table>    
          </div>
        )}       
      </div>
    </div>
  );
}

export default Tabel