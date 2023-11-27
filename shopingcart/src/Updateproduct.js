import { useParams } from "react-router-dom";
import Left from "./Left";
import { useEffect, useState } from "react";

function Updateproduct() {
    const { id } = useParams()

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [mdesc, setMdesc] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState('')
    const [status, setStatus] = useState('')
    const [img, setImg] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch(`/api/singleData/${id}`).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setName(data.apiData.name)
                setDesc(data.apiData.desc)
                setMdesc(data.apiData.mdesc)
                setPrice(data.apiData.price)
                setQty(data.apiData.qty)
                setStatus(data.apiData.status)
                setImg(data.apiData.img)
            } else {
                setMessage(data.message)
            }
        })
    }, [id])

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(name,desc,mdesc,price,qty,status,img);
        let formValue = new FormData()
        formValue.append('name', name)
        formValue.append('desc', desc)
        formValue.append('mdesc', mdesc)
        formValue.append('price', price)
        formValue.append('qty', qty)
        formValue.append('status', status)
        formValue.append('img', img)

        fetch(`/api/updateProducts/${id}`, {
            method: "PUT",
            body: formValue
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setMessage(data.message)
            } else {
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
                        <div className="col-md-10">
                            <h3 className="text-center">Update form</h3>
                            <h5 className="text-center">{message}</h5>
                            <form onSubmit={(e) => { handleSubmit(e) }}>

                                <label htmlFor="">Product Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} />

                                <label htmlFor="">Description</label>
                                <input type="text" className="form-control" value={desc} onChange={(e) => { setDesc(e.target.value) }} />

                                <label htmlFor="">More Details</label>
                                <textarea rows='6' className="form-control" value={mdesc} onChange={(e) => { setMdesc(e.target.value) }}></textarea>

                                <label htmlFor="">Price</label>
                                <input type="number" className="form-control" value={price} onChange={(e) => { setPrice(e.target.value) }} />

                                <label htmlFor="">Quantity</label>
                                <input type="number" className="form-control" value={qty} onChange={(e) => { setQty(e.target.value) }} />

                                <label htmlFor="">Status</label>
                                <select value={status} onChange={(e) => { setStatus(e.target.value) }} className="form-select">
                                    <option value="OUT-OF-STOCK">OUT-OF-STOCK</option>
                                    <option value="IN-STOCK">IN-STOCK</option>
                                </select>

                                <label htmlFor="">Image</label>
                                <input type="file" className="form-control" onChange={(e) => { setImg(e.target.files[0]) }} />

                                <button className="btn btn-warning form-control my-2">Update Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Updateproduct;