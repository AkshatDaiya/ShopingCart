import { Link } from "react-router-dom";

function Left() {
    return (
        <div className="col-md-2">
            <Link to='/adminproduct'><button className="btn btn-success my-2 form-control"><h6>Product Managemants</h6></button></Link>
        </div>
    );
}

export default Left;