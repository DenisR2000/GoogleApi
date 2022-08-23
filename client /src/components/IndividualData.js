import React from 'react'

export const IndividualData = ({ item }) => {
    return (
        <>
            <th>{item.title}</th>
            <th>{item.longitude}</th>
            <th>{item.latitude}</th>
            <th>{item.instalation_date}</th>
        </>
    )
}