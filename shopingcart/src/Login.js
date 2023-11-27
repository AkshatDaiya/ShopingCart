import { useContext, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextApi } from "./ContextApi";

function Login() {
    let navigate = useNavigate()

    useLayoutEffect(() => {
        if (localStorage.getItem('loginName')) {
            navigate('/products')
        }
    }, [navigate])
    const { setLoginName } = useContext(ContextApi)
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        const record = { username, password }
        fetch('/api/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                if (data.apiData === 'Admin') {
                    localStorage.setItem('loginName', data.apiData)
                    setLoginName(localStorage.getItem('loginName'))

                    navigate('/dashboard')
                } else {
                    localStorage.setItem('loginName', data.apiData)
                    setLoginName(localStorage.getItem('loginName'))

                    navigate('/products')
                }
            } else {
                setMessage(data.message)
            }
        })
    }

    return (
        <section id="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2>Login Now</h2>
                        <h4>{message}</h4>
                        <form onSubmit={(e) => { handleSubmit(e) }}>
                            <label htmlFor="">User Name</label>
                            <input type="text" name="Uname" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} />
                            <label htmlFor="">Password</label>
                            <input type="text" name="pass" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit" className="btn btn-success form-control mt-2">LogIn</button>
                            <span className="Loginlink">Don't have account yet! <Link className="flex-end" to={'/reg'}>Register Now</Link></span>
                        </form>
                    </div>

                    <div className="col-md-4"></div>
                </div>
            </div>

        </section>
    );
}

export default Login;