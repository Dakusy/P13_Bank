import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tokenActions } from '../store/token';
import { authActions } from '../store/auth';

import logo from '../assets/argentBankLogo.png';
import circle from '../assets/circle-user-solid.svg';
import disconnect from '../assets/right-from-bracket-solid.svg';
import '../css/header.css';

function Header() {
  const navigate = useNavigate();
  // Get the state of authentication
  const isAuth = useSelector((state) => state.auth.isAuth);
  // Retrieve profile info and change
  const profile = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    // Reinitialize the token's state
    dispatch(tokenActions.dropToken());
    // Reinitialize the auth's state
    dispatch(authActions.logout());
    // Redirection to Homepage
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo">
        <Link to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
        </Link>
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div className="auth-links-container">
  {isAuth ? (
    <>
      <Link to="/profile/:id" className="main-nav-item">
        <img src={circle} alt="Icon User" /> {profile.firstName}
      </Link>
      <Link to="/" className="main-nav-item" onClick={handleLogout}>
        <img src={disconnect} alt="Icon User" /> Logout
      </Link>
    </>
  ) : (
    <Link to="/sign-in" className="main-nav-item">
      <img src={circle} alt="Icon User" /> Sign In
    </Link>
  )}
</div>
    </nav>
  );
}

export default Header;