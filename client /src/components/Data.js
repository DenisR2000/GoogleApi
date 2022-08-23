import React from 'react'
import { IndividualData } from './IndividualData'

export const Data = ({ excelData }) => {
    return excelData.map((item, i)=>(
        <tr key={i}>
            <IndividualData item={item}/>
        </tr>        
    ))
}