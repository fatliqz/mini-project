import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_GET, API_POST } from "./api";
import ProductItem from "./ProductItem";
import './Home.css';
import './style.css';
import './Casel.css';
import { Nav } from "react-bootstrap";
import Slideimg from "./Carouselslide";
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
                "http://localhost:8080/api/products/type/" + productTypeId,
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
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
                            
                        {/* </Navbar.Collapse> */}
                    </Container>
                </Navbar>


                <div id="home">
                    {/* <Nav className="navbar">
                        <div className="navbar-nav">
                            <h1>moto hand too</h1>
                        </div>
                    </Nav> */}

                    <div>
                        <div>
                            <select className="sidebar-items" value={productTypeId} onClick={(e) => setProductTypeId(e.target.value)}>
                                <option value={0}>ALL Product</option>
                                {
                                    productTypes.map(item => (
                                        <option key={item.product_type_id} value={item.product_type_id}>
                                            {item.product_type_name}
                                        </option>
                                    ))
                                }
                            </select>
                            <br></br>

                        </div>
                         < Slideimg />
                        <div className="container" id="product">

                           
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
                </div>
{/* 
                <footer>
                    <Link to={"/product/add"} className="btn btn-primary me-3">เพิ่ม</Link>
                    <Link to={"/report"} className="btn btn-danger me-3">รายงาน</Link>
                </footer> */}
            </>
        );

    }

    return (
        <Navigate to="/" replace />
    );
}