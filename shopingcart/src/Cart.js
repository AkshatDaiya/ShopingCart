import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextApi } from "./ContextApi";

function Cart() {
    const { cart, setCart, loginName } = useContext(ContextApi)
    const [cartData, setCartData] = useState([])
    const navigate = useNavigate()

    if (!loginName) {
        navigate('/')
    }

    let totalAmount = 0
    useEffect(() => {
        if (!cart.items) {
            return
        }
        fetch('/api/cart', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: Object.keys(cart.items) })
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setCartData(data.apiData)
            } else {
                console.log(data.message)
            }
        })
    }, [cart])

    function handleQty(id) {
        return cart.items[id]
    }

    function handlePrice(id, price) {
        let totalQty = handleQty(id)
        totalAmount += totalQty * price
        return totalQty * price
    }

    function handleIncr(e, id, qty) {
        let currQty = handleQty(id)
        if (currQty >= qty) {
            alert('You have reached to the max quantity')
            return
        }
        let _cart = { ...cart }
        _cart.items[id] = currQty + 1
        _cart.totalItems += 1
        setCart(_cart)
    }

    function handleDec(e, id) {
        let currQty = handleQty(id)
        if (currQty === 1) {
            return
        }
        let _cart = { ...cart }
        _cart.items[id] = currQty - 1
        _cart.totalItems -= 1
        setCart(_cart)
    }

    function handleDelete(e, id) {
        let currQty = handleQty(id)
        let _cart = { ...cart }
        delete _cart.items[id]
        _cart.totalItems -= currQty
        setCart(_cart)
    }

    function handleCheckOut(e) {
        let userName = localStorage.getItem('loginName')
        fetch(`/api/cartData/${userName}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cart)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 201) {
                alert('Your order is successfully Placed. Check status in my orders')
                setCart('')
                navigate('/products')
            } else {
                console.log(data.message);
            }
        })
    }

    return (
        <>
            {cartData.length ?
                <section id="cart">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Product Name</th>
                                            <th>Product Quantity</th>
                                            <th>Product Price</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData.map((result, num) => (
                                            <tr key={result._id}>
                                                <td>{num + 1}</td>
                                                <td>{result.name}</td>
                                                <td><button onClick={(e) => { handleDec(e, result._id) }}>-</button>  {handleQty(result._id)}  <button onClick={(e) => { handleIncr(e, result._id, result.qty) }}>+</button></td>
                                                <td>{handlePrice(result._id, result.price)}</td>
                                                <td><button onClick={(e) => { handleDelete(e, result._id) }}>Delete</button></td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={5}>
                                                <h4>Total Amount: {totalAmount} rs.</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}>
                                                <button onClick={(e) => { handleCheckOut(e) }} className="btn btn-success form-control">CheckOut</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <img className="img" src="EmptyCart.jpg" alt="" />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Cart;