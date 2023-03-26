import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_GET, API_POST } from "./api";
import HotrateItem from "./ProductHotrate";
import './Home.css'
import './style.css';

export default function HomeHotrate() {

    const [productTypes, setProductTypes] = useState([]);
    const [productTypeId, setProductTypeId] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "http://localhost:8080/api/product_type",
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
                {/* <Link to={"/reportbrand"} className="btn btn-danger me-3">รายงาน</Link> */}
                {/* <Link to={"/product/add"} className="btn btn-primary me-3">เพิ่ม</Link> */}

                <body id="home">



                    <div className="container-home">
                        <div className="productHT" id="HT">
                            {
                                products.map(item => (
                                    <HotrateItem
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