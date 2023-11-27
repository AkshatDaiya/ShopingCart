import { useContext } from "react";
import Left from "./Left";
import { ContextApi } from "./ContextApi";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate()
    const { loginName } = useContext(ContextApi)

    if (!loginName) {
        navigate('/')
    }  
    return (
        <>
            <section id="mid">
                <div className="container">
                    <div className="row">
                        <Left />
                        <div className="col-md-9">
                            <h3 className="text-center">Managemants Pages</h3>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Dashboard;