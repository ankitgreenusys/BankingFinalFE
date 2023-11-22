import React from "react";
import "./Styles.css";
import { Link, json, useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [arrLoanReq, setArrLoanReq] = React.useState([]);
  const [arrLoanApp, setArrLoanApp] = React.useState([]);
  const [arrLoanPre, setArrLoanPre] = React.useState([]);
  const [currenttab, setCurrenttab] = React.useState(0);

  // active
  // Paid / closed
  // Rejected
  // Unpaid

  React.useEffect(() => {
    let url = "";
    if (currenttab === 1) url = "admin/pendingloan";
    else if (currenttab === 2) url = "admin/approvedloan";
    else if (currenttab === 3) url = "admin/rejectedloan";
    else return;

    fetch(`${BaseURL}${url}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          if (currenttab === 1) setArrLoanReq(data.loans);
          else if (currenttab === 2) setArrLoanApp(data.loans);
          else if (currenttab === 3) setArrLoanPre(data.loans);
        } 
        // else {
        //   alert("Error");
        // }
      })
      .catch((err) => {
        console.log(err);
        // alert("Error");
      });
  }, [currenttab]);

  React.useEffect(() => {
    setCurrenttab(1);
  }, []);

  const handletabs = (id) => {
    setCurrenttab(id);
  };

  const renderloanreqtable = () => {
    console.log(arrLoanReq);
    return arrLoanReq.map(
      (dt, idx) =>
        dt._id && (
          <tr key={idx}>
            <td>{idx + 1}.</td>
            <td>{dt.user.name}</td>
            <td>{dt.interest}</td>
            <td>${dt.amount}</td>
            <td>{dt.term} Months</td>
            <td>{dt.totalAmount}</td>
            <td className="d-flex justify-content-between">
              <div
                onClick={() => approveloan(dt._id)}
                className="btn btn-sm btn-green"
              >
                Approve
              </div>
              <div
                onClick={() => denyloan(dt._id)}
                className="btn btn-sm btn-red"
              >
                Deny
              </div>
            </td>
            <td></td>
          </tr>
        )
    );
  };

  const renderloanapptable = () =>
    arrLoanApp.map((dta, idx) => (
      <tr key={idx}>
        <td>{idx + 1}.</td>
        <td>{dta.user.name}</td>
        <td>{dta.interest}</td>
        <td>${dta.amount}</td>
        <td>{dta.term} Months</td>
        <td>
          <div className="btn btn-sm btn-blue">
            <Link className="nav-link" to={`history/${dta._id}`}>
              View Details
            </Link>
          </div>
        </td>
        <td></td>
      </tr>
    ));

  const renderloanpretable = () =>
    arrLoanPre.map((dta, idx) => (
      <tr>
        <td>{idx + 1}.</td>
        <td>{dta.user.name}</td>
        <td>{dta.interest}</td>
        <td>${dta.amount}</td>
        <td>{dta.term} Months</td>
        <td>{dta.totalAmount}</td>
        <td>
          <div className="btn btn-sm btn-blue">
            <Link className="nav-link" to={`history/${dta._id}`}>
              View Loan Details
            </Link>
          </div>
        </td>
        <td></td>
      </tr>
    ));

  const approveloan = (id) => {
    let url = "";
    // console.log(JSON.parse(localStorage.getItem("user")).role);
    const role = JSON.parse(localStorage.getItem("user")).role;

    if (role === "Admin") url = "admin/creditLoan/" + id;
    else if (role === "Manager") url = "admin/approveLoan/" + id;
    console.log(url);
    fetch(`${BaseURL}` + url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          alert("Loan Approved");
          setCurrenttab(2);
          window.location.reload();
        }
        // } else alert("Error");
      })
      .catch((err) => console.log(err));
  };

  const denyloan = (id) => {
    fetch(`${BaseURL}admin/reject/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          alert("Loan Denied");
          setCurrenttab(3);}
        // } else alert("Error");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loanmanage pad90 mt-3">
      <div className="d-flex align-items-center mb-3">
        <nav className="nav me-auto">
          <span
            onClick={() => handletabs(1)}
            className={"nav-link tablink " + (currenttab === 1 ? "active" : "")}
          >
            Loan Requests
          </span>
          
          <span
            onClick={() => handletabs(3)}
            className={"nav-link tablink " + (currenttab === 3 ? "active" : "")}
          >
            Previous Loans History
          </span>
        </nav>
        {currenttab == 1 && (
          <Link to="create" className="btn btn-sm btn-blue">
            <i className="fa-solid fa-plus"></i> Create Loan
          </Link>
        )}
      </div>
      <div className="commntable">
        <section>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>User Name</th>
                  <th>Loan Product</th>
                  <th>Loan Amount</th>
                  <th>Durations</th>
                  <th>Total Amount</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead></thead>
              <tbody>
                {currenttab === 1 && renderloanreqtable()}
                {/* {currenttab === 2 && renderloanapptable()} */}
                {currenttab === 3 && renderloanpretable()}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
