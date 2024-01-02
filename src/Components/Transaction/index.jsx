import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [translist, setTranslist] = React.useState([]);
  const [option, setoption] = React.useState("overall");
  const [totalprofit, setTotalprofit] = React.useState(0);
  const [totaldeposit, setTotaldeposit] = React.useState(0);
  const [totalwithdraw, setTotalwithdraw] = React.useState(0);
  const [currenttab, setCurrenttab] = React.useState(1);
  const [loanTrans, setLoanTrans] = React.useState([]);
  const [invesTrans, setInvesTrans] = React.useState([]);

  React.useEffect(() => {
    fetch(BaseURL + "admin/gettransaction/" + option, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setTranslist(res.transactions);
          setInvesTrans(res.InvestTransaction);
          setLoanTrans(res.loanTransaction);
          setTotalprofit(res.totalprofit);
          setTotaldeposit(res.totaldeposit);
          setTotalwithdraw(res.totalwithdraw);
        }
      })
      .catch((err) => console.log(err));
  }, [option]);

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
        <td>{dt.amount.toLocaleString()}</td>
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
        <td>{dt.amount?.toLocaleString()}</td>
      </tr>
    ));

  const handleChange = (e) => {
    console.log(e.target.id);
    setoption(e.target.id);
  };

  return (
    <div className="transpage pad90 mt-4">
      <div className="w-50">
        <div className="d-flex justify-content-between">
          <div className="my-3">
            <input
              onClick={handleChange}
              type="radio"
              name="record"
              id="overall"
              checked={option === "overall"}
            />
            <label className="" htmlFor="overall">
              Overall
            </label>
          </div>
          <div className="my-3">
            <input
              onClick={handleChange}
              type="radio"
              name="record"
              id="28"
              checked={option === "28"}
            />
            <label className="" htmlFor="28">
              Last 28 days
            </label>
          </div>
          <div className="my-3">
            <input
              onClick={handleChange}
              type="radio"
              name="record"
              id="14"
              checked={option === "14"}
            />
            <label className="" htmlFor="14">
              Last 14 days
            </label>
          </div>
          <div className="my-3">
            <input
              onClick={handleChange}
              type="radio"
              name="record"
              id="7"
              checked={option === "7"}
            />
            <label className="" htmlFor="7">
              Last 7 days
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-around mt-2">
          <div className="btn btn-blue">
            Total Deposit <br /> ${totaldeposit.toLocaleString()}
          </div>
          <div className="btn btn-red">
            Total Withdraw <br /> ${totalwithdraw.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="recenttrans mt-5">
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
        </h6>
        <div className="commntable mt-3">
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
