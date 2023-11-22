import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Users from "./Components/Users";
import UserDetails from "./Components/UserDetails";
import CreateUser from "./Components/CreateUser";
import LoanManagement from "./Components/LoanManagement";
import LoanHistory from "./Components/LoanHistory";
import CreateLoan from "./Components/CreateLoan";
import Investment from "./Components/Investment";
import InvestmentHistory from "./Components/InvestmentHistory";
import Payment from "./Components/InvestmentHistory/Payment";
import Transaction from "./Components/Transaction";
import Reports from "./Components/Reports";
import CustomerSupport from "./Components/CustomerSupport";
import YourBalance from "./Components/YourBalance";
import ResetPassword from "./Components/ResetPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<Header login={true} />}>
          <Route path="" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/loanmanagement" element={<LoanManagement />} />
          <Route path="/loanmanagement/create" element={<CreateLoan />} />
          <Route path="/loanmanagement/history/:id" element={<LoanHistory />} />
          <Route path="/investment" element={<Investment />} />
          <Route
            path="/investment/history/:id"
            element={<InvestmentHistory />}
          />
          <Route path="/investment/:id/payment" element={<Payment />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/customersupport" element={<CustomerSupport />} />
          <Route path="/yourbalance" element={<YourBalance />} />
        </Route>
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
