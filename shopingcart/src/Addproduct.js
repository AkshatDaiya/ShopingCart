import { useContext, useState } from "react";
import Left from "./Left";
import { ContextApi } from "./ContextApi";
import { useNavigate } from "react-router-dom";

function Addproduct() {
    const navigate = useNavigate()
    const {loginName } = useContext(ContextApi)

    if(!loginName){
        navigate('/')
    }

    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [moreDetails, setMoreDetails] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        const formValues = new FormData()
        formValues.append('productName', productName)
        formValues.append('description', description)
        formValues.append('moreDetails', moreDetails)
        formValues.append('price', price)
        formValues.append('quantity', quantity)
        formValues.append('image', image)

        fetch('/api/addData', {
            method: 'POST',
            body: formValues
        }).then((result) => { return result.json() }).then((data) => {
            if(data.status===201){
                setMessage(data.message)
            }else{
                setMessage(data.message)
            }
        })
    }

    return (
        <>
            <section id="mid">
                <div className="container">
                    <div className="row">
                        <Left />
                        <div className="col-md-9">
                            <h3 className="text-center">Add New Product Here</h3>
                            <h5 className="text-center">{message}</h5>
                            <form onSubmit={(e) => handleSubmit(e)}>

                                <label htmlFor="">Product Name</label>
                                <input type="text" className="form-control" value={productName} onChange={(e) => { setProductName(e.target.value) }} required />

                                <label htmlFor="">Description</label>
                                <input type="text" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} required />

                                <label htmlFor="">More Details</label>
                                <textarea rows='6' className="form-control" value={moreDetails} onChange={(e) => { setMoreDetails(e.target.value) }} required></textarea>

                                <label htmlFor="">Price</label>
                                <input type="number" className="form-control" value={price} onChange={(e) => { setPrice(e.target.value) }} required />

                                <label htmlFor="">Quantity</label>
                                <input type="number" className="form-control" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} required />

                                <label htmlFor="">Image</label>
                                <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} className="form-control" />

                                <button className="btn btn-success form-control my-2">Add Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Addproduct;