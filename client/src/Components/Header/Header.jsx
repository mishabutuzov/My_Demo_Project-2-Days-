import React from "react";
import { useNavigate } from 'react-router-dom';
// import { LoginContext } from './../LoginWindow/LoginContext';

function Header() {
    const navigate = useNavigate()
    // const [context, setContext] = useContext(LoginContext)
    const user = localStorage.getItem('login')
    function handleLogout() {
    //   setContext("");
      localStorage.removeItem('login')
      navigate("/");
    }
    return (
        <nav className="navbar navbar-dark bg-dark container ">
        <div className="container-fluid">
          <span className="navbar-brand">Olim Tech</span>
          <form className="d-flex  justify-content-center align-items-center">
            <div className={user && "user-name-top"}>{user}</div>
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
    );
}

export default Header;