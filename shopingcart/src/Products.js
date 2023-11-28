import { useContext, useEffect, useState } from "react";
import ProductStrc from "./ProductStrc";
import { ContextApi } from "./ContextApi";
import { useNavigate } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([])
    const{loginName}=useContext(ContextApi)
    const navigate = useNavigate();

    if(!loginName){
        navigate('/');
    }

    useEffect(() => {
        fetch('/api/produstInStock').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setProducts(data.apiData)
            } else {
                console.log(data.message);
            }
        })
    }, [])

    return (
        <section id="mid">
            <div className="container">
                <div className="row">
                    <h2 className="text-center my-4">Buy new and Cheap Consoles</h2>
                    {products.map((result) => (
                        <ProductStrc key={result._id} pdata={result} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Products;