import Carousel from 'react-bootstrap/Carousel';
import './Casel.css'
import React from 'react';
// import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import HomeHotrate from './Hotrate';





function Slideimg(props) {

    const styles = {
        left: '15rem',
        hight: '100%',
        width: '100%',

    };
    return (
        <body>

            <section class="product">
                <h2 class="product-category">best selling</h2>
                <button class="pre-btn">5</button>
                <button class="nxt-btn">5</button>
                <div class="product-container">
                    
                 {HomeHotrate()}
                </div>
                
            </section>

            <script src="script.js"></script>

        </body>
    );
}

export default Slideimg;