import Carousel from 'react-bootstrap/Carousel';
import './Casel.css'
import React from 'react';
// import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import HomeHotrate from './HomeHotrate';





function Slideimg(props) {

    const styles = {

        height: '430px',
        width: '93%',

    };
    return (
        <>

            <div style={styles} class="product">
        
                <h2 class="product-category">best selling</h2>
                {/* <button class="pre-btn">5</button> */}
                <button class="nxt-btn"></button>
                <div class="product-container">

                    {HomeHotrate()}
                </div>

            </div>

            <script src="script.js"></script>

        </>
    );
}

export default Slideimg;