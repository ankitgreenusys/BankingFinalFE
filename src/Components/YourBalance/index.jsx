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

  const [transdta, setTransdta] = React.useState({});

  React.useEffect(() => {
    fetch(BaseURL + "admin/mydetails", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) setTransdta(res);
        // else alert(res.error);
      })
      .catch((err) => console.log(err));
  }, []);

  const rendercommntable = () =>
    transdta?.transactions.map((dta, idx) => (
      <tr key={dta._id}>
        <td>{idx + 1}.</td>
        <td>{dta?.userId?.name}</td>
        <td colSpan={2}>
          22 Jan 23, 21:24
          {/* {new Date(dta?.date).toLocaleString()} */}
        </td>
        <td colSpan={2}>{dta?.transactionId}</td>
        <td>{dta?.transactionType}</td>
        <td className="">${dta?.amount}</td>
      </tr>
    ));

  return (
    <div className="ybalpage pad90 mt-5">
      <div className="ybalhead">
        <h6 className="text-red">Your Balance</h6>
        <div className="d-flex align-items-center mt-1">
          <h4>${transdta?.balance}</h4>
          <div className="btn btn-sm btn-red ms-4">Withdrawal</div>
        </div>
      </div>
      <div className="recenttrans mt-5">
        <div className="d-flex justify-content-between">
          <h6>Recent Transactions</h6>
          <button className="btn btn-dark btn-sm">Export</button>
        </div>
        <div className="commntable mt-3">
          <section>
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Name</th>
                    <th>Date & Time</th>
                    <th> </th>
                    <th>Transaction ID</th>
                    <th> </th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                  {transdta?.transactions?.length > 0 ? (
                    rendercommntable()
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Data Found
                      </td>
                    </tr>
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
