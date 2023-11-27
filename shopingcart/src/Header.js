import { useContext } from "react";
import { ContextApi } from "./ContextApi";
import { useNavigate, Link } from "react-router-dom";

function Header() {
    let navigate = useNavigate()

    const { loginName, setLoginName, cart } = useContext(ContextApi)

    function handleLogOut(e) {
        localStorage.removeItem('loginName')
        setLoginName(localStorage.getItem('loginName'))
        navigate('/')
    }

    function handlecartForm(e) {

    }

    return (<>
        {loginName ?
            <section id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"><h4>Welcome {loginName}</h4></div>
                        <div className="col-md-8">
                            <button className="logOutBtn btn btn-danger" onClick={(e) => { handleLogOut(e) }}>LogOut</button>

                            <Link to="/cart"><button className="logOutBtn btn btn-success mx-2" onClick={(e) => { handlecartForm(e) }}>Cart {!cart.totalItems ? 0 : cart.totalItems}</button></Link>

                            <Link to="/products"><button className="logOutBtn btn btn-success">Products</button></Link>

                            <Link to="/myorders"><button className="logOutBtn btn btn-success mx-2">MyOrders</button></Link>

                        </div>
                    </div>
                </div>
            </section>
            :
            <></>
        }
    </>
    );
}

export default Header;