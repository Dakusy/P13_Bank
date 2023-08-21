import React from 'react';

const Account = ({ title, amount, description }) => {
  return (
    <section className="account_container">
    <div className="account_card">
      <h3 className="account_title">{title}</h3>
      <p className="account_amount">{amount}</p>
      <p className="account_description">{description}</p>
    </div>
    <div className="account_transactions">
      <button className="button_transactions">View transactions</button>
    </div>
  </section>
);
};

export default Account;