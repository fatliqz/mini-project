import { Link } from "react-router-dom";
import './style.css'
import './Modal.css'
import './Casel.css'
import Buy from "./Buyproduct";



export default function HotrateItem(props) {


    const onDelete = async () => {
        props.onDelete(props.data);
    }


    return (

        <>

                <div>
                    <div class="card float-start" id="prod" >
                        <div class="img">
                            <img src={`http://localhost:8080/images/${props.data.image_url}`} width={150} />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{props.data.product_name}</h5>
                            <div class="card-body text-danger ">
                                <div className="text text-danger fs-4 me-4">{props.data.price}</div>
                                <row className="bottn">
                                    <Link to={`/product/${props.data.product_id}`} className="btn btn-primary">แก้ไข</Link>
                                    <button type="button" className="btn btn-danger" onClick={onDelete}>ลบ</button>
                                </row>
                                <Buy />
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}

