import { Link, useNavigate } from "react-router-dom";
import Left from "./Left";
import { useContext, useEffect, useState } from "react";
import { ContextApi } from "./ContextApi";

function AdminProduct() {
    const navigate = useNavigate()
    const {loginName } = useContext(ContextApi)

    if(!loginName){
        navigate('/')
    }
    const [productData, setProductData] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('/api/allData').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setProductData(data.apidata)
            } else {
                setMessage(data.message)
            }
        })
    }, [])
    return (
        <>
            <section id="mid">
                <div className="container">
                    <div className="row">
                        <Left />
                        <div className="col-md-10">
                            <h3 className="text-center">Product Managemants</h3>
                            <h5 className="text-center">{message}</h5>
                            <Link to='/addproduct'><button className="btn btn-info my-3 form-control"><h6>Add More Product</h6></button></Link>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th>More Details</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData.map((result, num) => (
                                        <tr key={result._id}>
                                            <td>{num + 1}</td>
                                            <td>{result.name}</td>
                                            <td>{result.desc}</td>
                                            <td>{result.mdesc}</td>
                                            <td>{result.price}</td>
                                            <td>{result.img}</td>
                                            <td>{result.qty}</td>
                                            <td>{result.status}</td>
                                            <td>{result.postedDate}</td>
                                            <td><Link to={`/addproduct/${result._id}`}><button className="btn btn-warning">Update</button></Link></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdminProduct;