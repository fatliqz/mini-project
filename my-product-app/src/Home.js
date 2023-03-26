import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_GET, API_POST } from "./api";
import ProductItem from "./ProductItem";
import './Home.css'
import './style.css';
import { Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';

import logoimg from './Logomotorcycle04.svg'
import word from './Logomotorcycle06.svg'
import HomeHotrate from "./HomeHotrate";
import Slideimg from "./Carouselslide";


export default function Home() {

    const [productTypes, setProductTypes] = useState([]);
    const [productTypeId, setProductTypeId] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "http://localhost:8080/api/product_types",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        'content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("access_token")
                    }
                }
            );

            let json = await response.json();
            setProductTypes(json.data);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "http://localhost:8080/api/products/types/" + productTypeId,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        'content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("access_token")
                    }
                }
            );

            const json = await response.json();
            setProducts(json.data);
        }

        fetchData();
    }, [productTypeId]);

    const fetchProduct = async () => {
        let json = await API_GET("products/type/" + productTypeId);
        setProducts(json.data);
    }

    const onDelete = async (data) => {
        let json = await API_POST("product/delete", {
            product_id: data.product_id
        });

        if (json.result) {
            fetchProduct();
        }
    }


    if (localStorage.getItem("access_token")) {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img src={logoimg} width={50} />
                            <img src={word} width={100} />

                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <body id="home">
                    <div> 
                        {Slideimg()}

                    </div>

                    <div className="container-home">
                        <div className="sidebar">
                            {/* <div className="sidebar-items" value={productTypeId} onClick={(e) => setProductTypeId(e.target.value)}>
                                <option value={0}>ALL Product</option>
                                {
                                    productTypes.map(item => (
                                        <option key={item.product_type_id} value={item.product_type_id}>
                                            {item.product_type_name}
                                        </option>
                                    ))
                                }
                            </div>
                            <br></br> */}
                            <select value={productTypeId} onChange={(e) => setProductTypeId(e.target.value)}>
                                <option value={0}>ทุกประเภทสินค้า</option>
                                {
                                    productTypes.map(item => (
                                        <option key={item.product_type_id} value={item.product_type_id}>
                                            {item.product_type_name}
                                        </option>
                                    ))
                                }
                            </select>
                            <Link to={"/product/add"} className="btn btn-primary me-3">เพิ่ม</Link>
                            <Link to={"/homehot"} className="btn btn-primary me-3">hot</Link>
                            <Link to={"/report"} className="btn btn-danger me-3">รายงาน</Link>
                            <Link to={"/reportbrand"} className="btn btn-danger me-3">brandReport</Link>

                        </div>
                        
                        {/* {HomeHotrate()} */}
                        <div className="product">
                            {
                                products.map(item => (
                                    <ProductItem
                                        key={item.product_id}
                                        data={item}
                                        onDelete={onDelete} />
                                ))
                            }
                        </div>
                    </div>
                </body>
            </>
        );

    }

    return (
        <Navigate to="/" replace />
    );
}