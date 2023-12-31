import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import EditUser from "../service/editUser";
import Account from "../components/Account";

import '../css/profile.css';


const Profile = () => {

  const userData = useSelector((state) => state.profile);

  const token = useSelector((state) => state.token.token);

  const [displayForm, setDisplayForm] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();

  const handleDisplayForm = () => {
    setDisplayForm(!displayForm);
  };


  const handleForm = () => {
    if (firstName !== "" && lastName !== "") {
      EditUser(firstName, lastName, token);
      setDisplayForm(!displayForm);
    }
  };

  return (
    <div>
      <main className="container__profile">
        {displayForm && (
          <div className="container__profile-header">
            <h1>Welcome back</h1>
            <div className="container__profile-form">
              <div className="inputBox">
                <input
                  type="text"
                  placeholder={userData.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder={userData.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="buttonBox">
                <button onClick={handleForm}>Save</button>
                <button onClick={handleDisplayForm}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {!displayForm && (
          <div className="container__profile-header">
            <h1>{`Welcome back ${userData.firstName} ${userData.lastName}`}</h1>
            <button onClick={handleDisplayForm}>Edit Name</button>
          </div>
        )}

        <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
      </main>
    </div>
  );
};

export default Profile;