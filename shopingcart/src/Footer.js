import { useContext } from "react";
import { ContextApi } from "./ContextApi";

function Footer() {

    const { loginName } = useContext(ContextApi)

    return (<>
        {loginName ?
            <section id="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center">Footer</h2>
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

export default Footer;