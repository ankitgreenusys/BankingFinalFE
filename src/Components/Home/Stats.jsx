import React from "react";

import BaseURL from "../../Api/BaseURL";

const Stats = () => {
  const [alltime, setAlltime] = React.useState({
    totalOutstandingInv: 0,
    totalinterest: 0,
    totalinvested: 0,
    totalloan: 0,
    totalmember: 0,
    totalpaid: 0,
    totalpending: 0,
    totalwithdrawn: 0,
  });
  const [loansdet, setLoansdet] = React.useState({
    todayloan: 0,
    todayloanrepayment: 0,
    outStandingLoan: 0,
  });

  React.useEffect(() => {
    if (localStorage.getItem("token"))
      fetch(BaseURL + "admin/statsdashboard", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (!res.error) {
            setAlltime({
              totalOutstandingInv: res.totalOutstandingInv,
              totalinterest: res.totalinterest,
              totalinvested: res.totalinvested,
              totalloan: res.totalloan,
              totalmember: res.totalmember,
              totalpaid: res.totalpaid,
              totalpending: res.totalpending,
              totalwithdrawn: res.totalwithdrawn,
            });
          }
          // else alert(res.resposneMessage);
        })
        .catch((err) => console.log(err));

    fetch(BaseURL + "admin/todayLoans", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setLoansdet((prev) => {
            return {
              ...prev,
              todayloan: res.totalActiveLoan,
            };
          });
        }
        // else alert(res.resposneMessage);
      })
      .catch((err) => console.log(err));

    fetch(BaseURL + "admin/todayLoanRepayment", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setLoansdet((prev) => {
            return {
              ...prev,
              todayloanrepayment: res.totalLoanRepayment,
            };
          });
        }
        // else alert(res.resposneMessage);
      })
      .catch((err) => console.log(err));

    fetch(BaseURL + "admin/outStandingLoan", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setLoansdet((prev) => {
            return {
              ...prev,
              outStandingLoan: res.totalOutstandingLoan,
            };
          });
        }
        // else alert(res.resposneMessage);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="">
        <h3 className="">All Time </h3>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="statscard statscardcolor1">
            <div className="statscardbody">
              <p className="statstitle">Total Member</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {alltime.totalmember?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="statscard statscardcolor2">
            <div className="statscardbody">
              <p className="statstitle">Total Loan</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {alltime.totalloan?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="statscard statscardcolor1">
            <div className="statscardbody">
              <p className="statstitle">Total Interest</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {alltime.totalinterest?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="statscard statscardcolor2">
            <div className="statscardbody">
              <p className="statstitle">Yield of the investment</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {alltime.totalinvested.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="">Loans </h3>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="statscard statscardcolor1">
            <div className="statscardbody">
              <p className="statstitle">Today</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {loansdet.todayloan?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="statscard statscardcolor2">
            <div className="statscardbody">
              <p className="statstitle">Today Repayment Loan</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {loansdet.todayloanrepayment?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="statscard statscardcolor1">
            <div className="statscardbody">
              <p className="statstitle">Total Outstanding Loan</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {loansdet.outStandingLoan?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="">Investment</h3>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="statscard statscardcolor1">
            <div className="statscardbody">
              <p className="statstitle">Total</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {alltime.totalinvested.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="statscard statscardcolor2">
            <div className="statscardbody">
              <p className="statstitle">Total Interest</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {alltime.totalinterest?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="statscard statscardcolor1">
            <div className="statscardbody">
              <p className="statstitle">Total Outstanding Loan</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {alltime.totalOutstandingInv?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="statscard statscardcolor2">
            <div className="statscardbody">
              <p className="statstitle">Total Withdraw</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="statsval m-0 p-0">
                  {alltime.totalwithdrawn?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
