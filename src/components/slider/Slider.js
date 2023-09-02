import React from 'react';
import SliderCard from './SliderCard';
import './slider.css';
const Slider = () => {
    
    const btnpressprev = () => {
        const box = document.querySelector('.product-container');
        const width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
    }
    
    const btnpressnext = () => {
        const box = document.querySelector('.product-container');
        const width = box.clientWidth;
        box.scrollLeft = box.scrollLeft + width;
    }
    return (
        <div className="product-carousel">
            <button className="pre-btn" onClick={btnpressprev}><p>&lt;</p></button>
            <button className="next-btn" onClick={btnpressnext}><p>&gt;</p></button>


            <div className="product-container">
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/1294.jpg' />
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/133.jpg' />
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/667.jpg' />
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/85.jpg' />
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/274.jpg' />
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/400.jpg' />
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/1177.jpg' /> 
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/70.jpg' /> 
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/10590.jpg' /> 
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/1005.jpg' /> 
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/731.jpg' /> 
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/1180.jpg' /> 
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/10234.jpg' /> 
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/10395.jpg' /> 
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/88.jpg' /> 
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/835.jpg' /> 
                <SliderCard imgUrl='https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg' /> 
            </div>
        </div>
    )
}

export default Slider;