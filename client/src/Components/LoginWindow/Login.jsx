import React, { useState, useRef, useContext } from 'react'
// import { Form, Card, Button } from 'react-bootstrap'
import { LoginContext } from './LoginContext';
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const [error, setError] = useState('');
    const [context, setContext] = useContext(LoginContext);
    const userLogin = useRef(); 
    const navigate = useNavigate()


    function handleSubmit(e){
        e.preventDefault();

        setError('') // clear error
        const login = userLogin.current.value; //getting login from input
        if(login.length < 3){
            setError('Login should be 3 letters or more')
            return
        }
        setContext(login) // setting login in context
        localStorage.setItem('login', login)
        // console.log(localStorage.getItem('login'));
        navigate('/main') // redirect to main page
    }
    console.log(context)
    return(
        <>
        <h1 className='text-center'>Olim tech</h1>
        <div className='container mt-5'>  
            <form className='login-form d-flex flex-column justify-content-center align-items-center p-3'>
            <div className="mb-3">
                <label className="form-label">Login:</label>
                {error && <p className='text-danger'>{error}</p>}
                <input type="text" className="form-control" ref={userLogin} />
            </div>
            <div className='btn btn-success rounded-pill'
                onClick={handleSubmit}> GO ! </div>
            </form>
        </div> 
        </>
    )
}