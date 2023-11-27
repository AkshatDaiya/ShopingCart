import { useState } from "react";
import { Link } from "react-router-dom";

function Reg() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        const record = { username, password }
        fetch('/api/reg',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(record)
        }).then((result)=>{return result.json()}).then((data)=>{
            if(data.status===201){
                setMessage(data.message)
            }else{
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
                        <h2>Sign Up</h2>
                        <h6>{message}</h6>
                        <form onSubmit={(e) => { handleSubmit(e) }}>
                            <label>User Name</label>
                            <input type="text" name="Uname" value={username} onChange={(e) => { setUserName(e.target.value) }} className="form-control" required />
                            <label>Password</label>
                            <input type="text" name="pass" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" required />
                            <button type="submit" className="btn btn-success form-control mt-2">Sign Up</button>
                            <span className="Loginlink">Already have an account! <Link to={'/'}>LogIn</Link></span>
                        </form>
                    </div>

                    <div className="col-md-4"></div>
                </div>
            </div>

        </section>
    );
}

export default Reg;