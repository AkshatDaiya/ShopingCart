import { useContext, useEffect, useState } from "react";
import { ContextApi } from "./ContextApi";
import { useNavigate } from "react-router-dom";

function MyOrders() {
    let navigate=useNavigate()

    const { loginName } = useContext(ContextApi)
    const [myOrders, setMyOrders] = useState([])
    if(!loginName){
        navigate('/')
    }

    useEffect(() => {
        fetch(`/api/myOrders/${loginName}`).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setMyOrders(data.apiData)
            } else {
                console.log(data.message);
            }
        })
    }, [loginName])

    return (
        <>
            <section id="mid">
                <div className="container">
                    <div className="row justify-content-center">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Product Name</th>
                                    <th>Product Image</th>
                                    <th>Product Quatity</th>
                                    <th>Purchased Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myOrders.map((result, num) => (
                                    <tr key={result._id}>
                                        <td>{num + 1}</td>
                                        <td>{result.name}</td>
                                        <td><img style={{height:'100px'}} src={result.img} alt="" /></td>
                                        <td>{result.qty}</td>
                                        <td>{result.pDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyOrders;