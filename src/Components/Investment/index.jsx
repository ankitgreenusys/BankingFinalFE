import React from "react";
import "./Styles.css";
import { Link, useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();
  const [investment, setInvestment] = React.useState([]);
  const [withdrawReq, setWithdrawReq] = React.useState([]);

  const [currenttab, setCurrenttab] = React.useState(1);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(BaseURL + "admin/withdrawlInvestmentsRequests", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) setWithdrawReq(res.withdrawlRequests);
        // else alert(res.error);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (currenttab === 1) {
      fetch(BaseURL + "admin/withdrawlInvestmentsRequests", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (!res.error) setWithdrawReq(res.withdrawlRequests);
          // else alert(res.error);
        })
        .catch((err) => console.log(err));
    } else if (currenttab === 2) {
      fetch(BaseURL + "admin/allinvestment", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (!res.error) setInvestment(res.investments);
          // else alert(res.error);
        })
        .catch((err) => console.log(err));
    }
  }, [currenttab]);

  const handletabs = (id) => {
    setCurrenttab(id);
  };

  const approvewithdraw = (id) => {
    fetch(BaseURL + "admin/approveWithdraw/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          alert("Withdrawl Approved");
          // setCurrenttab(0);
          // setCurrenttab(1);
          window.location.reload();
        }
        // else alert(res.error);
      })
      .catch((err) => console.log(err));
  };

  const denywithdraw = (id) => {
    fetch(BaseURL + "admin/deleteWithdraw/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          alert("Withdrawl Denied");
          // setCurrenttab(0);
          // setCurrenttab(1);
          window.location.reload();
        }
        // else alert(res.error);
      })
      .catch((err) => console.log(err));
  };

  const renderwithdrawreq = () =>
    withdrawReq.map((dta, idx) => (
      <tr>
        <td>{idx + 1}.</td>
        <td>{dta?.user.name}</td>
        <td colSpan={2}>{dta._id}</td>
        <td>{dta?.createdAt.split("T")[0].split("-").reverse().join("-")}</td>
        <td>{dta.amount}</td>
        <td className="d-flex justify-content-between">
          <div
            onClick={() => approvewithdraw(dta._id)}
            className="btn btn-sm btn-green"
          >
            Approve
          </div>
          <div
            onClick={() => denywithdraw(dta._id)}
            className="btn btn-sm btn-red"
          >
            Deny
          </div>
        </td>
      </tr>
    ));

  const rendercommntable = () =>
    investment.map((dta, idx) => (
      <tr>
        <td>{idx + 1}.</td>
        <td>{dta?.name}</td>
        <td colSpan={2}>{dta._id}</td>
        <td>
          {dta.investment.length === 0
            ? "No Payment"
            : dta?.investment[dta?.investment.length - 1].date
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
        </td>
        <td>{dta.balance}</td>
        <td>
          <div className="btn btn-sm btn-blue">
            <Link className="nav-link" to={"history/" + dta._id}>
              View Details
            </Link>
          </div>
        </td>
      </tr>
    ));

  const releasefixed = () => {
    fetch(BaseURL + "admin/releaseFixedInterest", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert("Interest Released");
        // window.location.reload();
        // if (!res.error) setInvestment(res.investments);
        // else
        // alert(res.error);
      })
      .catch((err) => console.log(err));
  };

  const releaseprofit = () => {
    fetch(BaseURL + "admin/releaseProfitShare", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert("Interest Released");
        // window.location.reload();
        // if (!res.error) setInvestment(res.investments);
        // else
        // alert(res.error);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="investmentpage pad90 mt-3">
      <div className="d-flex align-items-center mb-3 mb-3">
        <nav className="nav me-auto">
          <span
            onClick={() => handletabs(1)}
            className={"nav-link tablink " + (currenttab === 1 ? "active" : "")}
          >
            Withdrawal Requests
          </span>
          <span
            onClick={() => handletabs(2)}
            className={"nav-link tablink " + (currenttab === 2 ? "active" : "")}
          >
            Investments
          </span>
        </nav>
        <div className=" d-flex">
          <h5 className="m-0">Release Interest To </h5>
          <button onClick={releaseprofit} className="btn btn-sm btn-blue mx-3">
            Share Profit
          </button>
          <button onClick={releasefixed} className="btn btn-sm btn-blue">
            Fixed interest
          </button>
        </div>
      </div>
      <div className="commntable">
        <section>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>User Name</th>
                  <th>User ID</th>
                  <th></th>
                  <th>Created At</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>
                {currenttab === 1 ? renderwithdrawreq() : rendercommntable()}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
