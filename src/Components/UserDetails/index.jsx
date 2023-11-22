import React from "react";
import "./Styles.css";

import { useParams, Link, useNavigate } from "react-router-dom";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import "jspdf-autotable";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = React.useState({});
  const [loanTrans, setLoanTrans] = React.useState([]);
  const [invesTrans, setInvesTrans] = React.useState([]);
  const [stats, setStats] = React.useState({});
  const [currenttab, setCurrenttab] = React.useState(1);

  React.useEffect(() => {
    if (id) {
      fetch(`${BaseURL}admin/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.error) {
            setUser(data.myuser);
            setInvesTrans(data.myuser.investment);
            setLoanTrans(data.myuser.loan);
          } else {
            // alert("Error");
            navigate("/users");
          }
        })
        .catch((err) => {
          console.log(err);
          // alert("Error");
          navigate("/users");
        });

      fetch(`${BaseURL}admin/userTranstion/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setInvesTrans(data.InvestTransaction);
          setLoanTrans(data.loanTransaction);
          setStats({
            totaldeposit: data.totaldeposit,
            balance: data.balance,
            totalwithdraw: data.totalwithdraw,
          });
        })
        .catch((err) => {
          console.log(err);
          // alert("Error");
          // navigate("/users");
        });
    }
  }, [id]);

  const exportTransaction = () => {
    // legder
    let header = [];
    let data1 = [];
    if (currenttab == 1) {
      header = [
        "Date",
        "Time",
        "Transaction ID",
        "Type",
        "Deposit",
        "Withdraw",
        "balance",
      ];

      data1 = [];

      loanTrans.map((ele, index) => {
        data1.push([
          ele.date.split("T")[0].split("-").reverse().join("-"),
          ele.date.split("T")[1].split(".")[0],
          ele.transactionId,
          ele.transactionType,
          ele.transactionType !== "LoanRepayment" ? ele.amount : "",
          ele.transactionType === "LoanRepayment" ? ele.amount : "",
          ele.balance,
        ]);
      });
    } else if (currenttab == 2) {
      header = [
        "Date",
        "Time",
        "Transaction ID",
        "Type",
        "Deposit",
        "Withdraw",
        "balance",
      ];

      data1 = [];

      invesTrans.map((ele, index) => {
        data1.push([
          ele.date.split("T")[0].split("-").reverse().join("-"),
          ele.date.split("T")[1].split(".")[0],
          ele.transactionId,
          ele.transactionType,
          ele.transactionType !== "LoanRepayment" ? ele.amount : "",
          ele.transactionType === "LoanRepayment" ? ele.amount : "",
          ele.balance,
        ]);
      });
    } else {
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Transaction Report Of " + user.name, 14, 10);
    doc.autoTable({
      head: [header],
      body: data1,
      startY: 20,
      //center
      styles: { fontSize: 10, valign: "middle", halign: "center" },
    });

    doc.save("TransactionReport.pdf");
  };

  const renderinvestable = () =>
    invesTrans.map((dt, idx) => (
      <tr key={idx}>
        <td>{idx + 1}.</td>
        <td>
          {dt.date?.split("T")[0].split("-").reverse().join("-") +
            ", " +
            dt.date?.split("T")[1].split(".")[0]}
        </td>
        <td>{dt.transactionId}</td>
        <td>{dt.transactionType}</td>
        <td>{dt.amount}</td>
      </tr>
    ));

  const renderloantable = () =>
    loanTrans.map((dt, idx) => (
      <tr key={idx}>
        <td>{idx + 1}.</td>
        <td>
          {dt.date?.split("T")[0].split("-").reverse().join("-") +
            ", " +
            dt.date?.split("T")[1].split(".")[0]}
        </td>
        <td>{dt.transactionId}</td>
        <td>{dt.transactionType}</td>
        <td>{dt.amount}</td>
      </tr>
    ));

  return (
    <div className="createuserform pad90 mt-5">
      <div className="page2">
        <div className="mb-3">
          <Link to="/users">
            <i className="fa-solid fa-arrow-left"></i> Back
          </Link>
        </div>
        <div className="d-flex w-75  justify-content-between">
          <div className="">
            <p>Full Name</p>
            <h6>
              {user?.name} <br />{" "}
              {user?.isVerified ? (
                <span className="text-green">Verified</span>
              ) : (
                <span className="text-red">Unverified</span>
              )}
            </h6>
          </div>
          <div className="divder"></div>
          <div className="">
            <p>Date of Birth</p>
            <h6>{user.dob?.split("T")[0].split("-").reverse().join("-")}</h6>
          </div>
          <div className="divder"></div>
          <div className="">
            <p>Email Address</p>
            <h6>{user?.email}</h6>
          </div>
          <div className="divder"></div>
          <div className="">
            <p>Phone Number</p>
            <h6>{user?.mobile}</h6>
          </div>
          <div className="divder"></div>
          <div className="">
            <p>Submitted Documents</p>
            <h6>
              <i className="fa-solid fa-file-invoice"></i> Profile ID Card <br />
              <a target="_blank" rel="noreferrer" href={user?.image}>
                View
              </a>
            </h6>
          </div>
        </div>
        <h6 className="text-red mt-5">Investment Portfolio</h6>
        <div className="d-flex mt-4">
          <div className="btn btn-blue me-5">
            Total Deposit <br /> $ {stats.totaldeposit}
          </div>
          <div className="btn btn-red me-5">
            Total Withdraw <br /> $ {stats.totalwithdraw}
          </div>
          <div className="btn btn-green">
            User Balance <br /> $ {stats.balance}
          </div>
        </div>
        <h6 className="mt-5 d-flex justify-content-between align-items-center">
          <nav className="nav me-auto">
            <span
              onClick={() => setCurrenttab(1)}
              className={
                "nav-link tablink " + (currenttab === 1 ? "active" : "")
              }
            >
              Loan History
            </span>
            <span
              onClick={() => setCurrenttab(2)}
              className={
                "nav-link tablink " + (currenttab === 2 ? "active" : "")
              }
            >
              Investment History
            </span>
          </nav>
          <button onClick={exportTransaction} className="btn btn-dark btn-sm">
            Export
          </button>
        </h6>
        <div className="commntable">
          <section>
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Date & Time</th>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                  {currenttab == 1 ? (
                    loanTrans.length === 0 ? (
                      <tr>
                        <td colSpan="5">No Transactions</td>
                      </tr>
                    ) : (
                      renderloantable()
                    )
                  ) : invesTrans.length === 0 ? (
                    <tr>
                      <td colSpan="5">No Transactions</td>
                    </tr>
                  ) : (
                    renderinvestable()
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
