import React from 'react'
import './sliderCard.css'
const SliderCard = (props) => {
    return (
        <div className='mycard'><img src={props.imgUrl} alt="loading" height="330px" width="300px" /></div>
    )
}

export default SliderCard;