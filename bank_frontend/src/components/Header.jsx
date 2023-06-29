import { Link } from "react-router-dom";
import logo from '../assets/argentBankLogo.png'

function Header() {
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
        <div>
          <a className="main-nav-item" > <Link to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In</Link>
          </a>
        </div>
      </nav>
    );
}

export default Header;