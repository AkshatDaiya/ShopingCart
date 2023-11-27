import { useContext } from "react";
import { ContextApi } from "./ContextApi";

function ProductStrc(props) {
    const { pdata } = props
    const { cart,setCart } = useContext(ContextApi)

    function handlecart(e, id) {
        let _cart = { ...cart }
        if (!_cart.items) {
            _cart.items = {}
        }
        if (!_cart.items[id]) {
            _cart.items[id] = 1
        } else {
            _cart.items[id] += 1
        }
        if (!_cart.totalItems) {
            _cart.totalItems = 1
        } else {
            _cart.totalItems += 1
        }
        setCart(_cart)
        console.log(_cart);
    }

    return (
        <>
            <div className="col-md-4">
                <div className="card my-3" style={{ width: '18rem', height: '35rem' }}>
                    <img src={pdata.img} className="card-img-top imgSize" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{pdata.name}</h5>
                        <p className="card-text">{pdata.desc}</p>
                        <p className="card-text">Price: {pdata.price} rs</p>
                        <button className="btn btn-success mx-2" onClick={(e) => { handlecart(e, pdata._id) }}>Add to Cart</button>
                        <button className="btn btn-info">More Details</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductStrc;