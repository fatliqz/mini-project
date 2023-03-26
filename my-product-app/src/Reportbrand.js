import { useEffect, useRef, useState } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { API_GET } from "./api";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ProductItem from "./ProductItem";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'รายงานจำนวนสินค้า',
        },
    },
};



export default function Reportbrand() {
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState({});
    const [store, setStore] = useState([]);
    const [productStore, setProductStore] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        async function fetchData() {
            let json = await API_GET("reportbrand");

            setStore(json.data);

            var labels = [];
            var data = [];

            for (var i = 0; i < json.data.length; i++) {
                var item = json.data[i];
                labels.push(item.product_type_name);
                data.push(item.product_count);
            }

            var dataset = {
                labels: labels,
                datasets: [
                    {
                        label: "จำนวนสินค้าแยกตามBrandสินค้า",
                        data: data,
                        backgroundColor: "rgba(255, 99, 132, 0.5)"
                    }
                ]
            }

            setChartData(dataset);
            setIsLoading(true);
        }

        fetchData();
    }, []);

    const onClick = async (event) => {
        var element = getElementAtEvent(chartRef.current, event);
        var index = element[0].index;

        await getProducts(store[index].product_type_id);
    }

    const getProducts = async (productTypeId) => {
        let json = await API_GET("products/types/" + productTypeId);
        setProductStore(json.data);
    }

    const getChart = () => {
        if (isLoading) {
            return <Bar options={options} data={chartData}
                ref={chartRef}  onClick={onClick} />;
        }

        return
        <>
        </>;

    }
    return (
        <>
            <div className="container-fluid md-3">
                {
                    getChart()
                }
            </div>

            <div className="container-fluid md-3">
                {
                    productStore.map(item => (
                        <ProductItem
                            key={item.product_id}
                            data={item} />
                    ))
                }
            </div>
        </>
    );




}

