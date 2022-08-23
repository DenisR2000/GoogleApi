import React, { useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api';
import { defaultTheeme } from './Theeme';
import './Map.module.css'

const containerStyle = {
    width: '600px',
    height: '500px'
};

const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    scrollControl: false,
    clickableIcons: false,
    keyboardShortcuts: false,
    disableDoubleClickZoom: false, 
    fullscreenControl: false,
    styles: defaultTheeme
} 

const Map = ({ center, marks  }) => {

    const centerMark = {
        lat: 25.3121523,
        lng: 55.724284
    };    
    
    const [zoom, setZoom] = useState(10)
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(centerMark);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    async function onClickMarcer(e, info) {
        console.log("info: ", info)
        let popup = document.getElementById('popup')
        let popup_content = document.getElementById('popup__content')
        popup.style.visibility = 'visible'
        popup.style.opacity = 1
        popup_content.classList.add('animate')
        popup.style.transition = "all 0.5s";
        document.getElementById('mainInfo').innerText = info.latitude
        document.getElementById('title').innerText = info.title
        document.getElementById('img-news').src = info.image
    }

    function popupLoginCliseClick() {
        let popup = document.getElementById('popup')
        let popup_content = document.getElementById('popup__content')
        popup_content.classList.remove('animate')        
        popup.style.visibility = 'hidden'
        popup.style.opacity = 0
        popup.style.transition = "all 0.5s";
        document.querySelector('b').innerText = ''
        document.getElementById('img-news').src = ''
    }

    return  (
        <>
            <div className='map__container'>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={defaultOptions}
                    >
                <></>

                {marks.map((element, i) => {
                    return(
                        <>
                            <Marker key={i} onClick={e => onClickMarcer(e, element.info)} position={element.item} />
                        </>
                    )
                })}
                </GoogleMap>
            </div>
            <div className='wraper'>
                <div className="popup" id="popup">
                    <div className="popup__body">
                        <div style={{position: 'relative'}} id="popup__content" class="popup__content">
                            <a className="popup__close" onClick={popupLoginCliseClick} >X</a>
                            <div id="modal-content" className="modal-content">
                                <div className="big-news-container">
                                    <p>
                                        <br />
                                    </p>
                                    <p>
                                        <span>
                                            <b id='title' className="title">
                                                
                                            </b>
                                        </span>
                                    </p>
                                    <p>
                                        <br />
                                        <span>
                                            <b id='mainInfo' className='mainInfo'></b>
                                        </span>
                                    </p>
                                </div>
                                    <p>
                                        <br />
                                        <span>
                                            <img id="img-news" className="img-news" />       
                                        </span>
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Map