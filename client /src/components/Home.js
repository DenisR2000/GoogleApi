import React, { useState } from "react"
import Map from "./Map/Map";
import '../styles/Home.css'
import { useJsApiLoader } from '@react-google-maps/api';
import * as XLSX from 'xlsx'



const libraried = ['places']

const Home = ({ user }) => {

    const API_KEY = process.env.REACT_APP_KEY
    const [marks, setMarks] = useState(null)
    const fileType = ['application/vnd.ms-excel'];

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAbiPpKBUY-bu6Z7m8kCoMVPjW5CE2-g6g",
        libraried
    })

    const handleFile = (e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile) {
            if(selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile)
                reader.onload = (e) => {
                getDataToJson(e.target.result)
                }
            }
        }
        else{
            console.log('plz select your file');
        }
      }
    
      function getDataToJson(buffer) {
        if(buffer !== null) {
          const workbook = XLSX.read(buffer, { type: 'buffer' });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName]
          const data = XLSX.utils.sheet_to_json(worksheet)
          var marks = []
          data.forEach(element => {
            var lat = Number(element.latitude)
            var lng = Number(element.longitude )
            marks.push({ 
                item: {
                    lat: lat, 
                    lng: lng
                },
                info: element
            })
          });
          setMarks(marks)
        }
        else{
            setMarks(null)
        }
      }
    
    return (
        <>
            <div className="component__container">
                { isLoaded ? 
                <>
                    <form className='form-group'>
                    <div className="m-3 d-flex flex-column">
                    </div>
                    <label><h5>Upload Excel file</h5></label>
                    <input type='file' 
                            className='form-control'
                            onChange={handleFile} required></input>                  
                    </form> {
                        marks != null ? 
                        <>                         
                            <Map marks={marks}/> 
                        </> :
                         <>
                            <div>
                            </div>
                         </>
                    }
                </>
                : 
                <>
                    <div className="loader__container">
                        <div className="lds-dual-ring"></div>
                    </div>
                </> }
            </div>
        </>
    )
}

export default Home