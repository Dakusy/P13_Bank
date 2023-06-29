import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../store/token";
import { authActions } from "../store/auth";

import logo from '../assets/argentBankLogo.png'

function Header() {
  const navigate = useNavigate();
// Get the state of the authentification
const isAuth = useSelector((state) => state.auth.isAuth)
//Retrieve profil infos and change 
const profile = useSelector((state) => state.profile)

const dispatch = useDispatch();

const handleLogout = (e) => {
  e.preventDefault()
  //Reinitialize the token's state
  dispatch(tokenActions.dropToken())
  //Reinitialize the auth's state
  dispatch(authActions.logout())
  //Redirection to Homepage
  navigate("/")
  
}

  return (
    <nav className="main-nav">
      <a className="main-nav-logo"> <Link to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </Link>
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      {isAuth ? (
        <div>
          <div className="btn"> {profile.firstName}</div>
          <Link to={"/"} className="btn" onClick={handleLogout}> Logout</Link>
        </div>
      ):
      <div>
        <a className="main-nav-item" > <Link to="/sign-in">
          <i className="fa fa-user-circle"></i>
          Sign In</Link>
        </a>
      </div>
}
    </nav>
  );
}

export default Header;