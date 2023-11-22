import React from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentmethod, setPaymentmethod] = React.useState("cash");

  React.useEffect(() => {
    console.log(state);
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
  }, []);

  // const setpayment = () => {};

  const submitpayment = () => {
    const data = {
      transactionId: "1234567890",
      amount: state.remaininginvestment,
      remarks: "This is a test payment",
    };

    fetch(BaseURL + "admin/depositinvestment/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) navigate(`/investment/history/${id}`);
        // else alert(res.error);
      })
      .catch((err) => console.log(err));

    console.log(paymentmethod);
    console.log(id);
    navigate(`/investment/history/${id}`);
  };

  return (
    <div className="createloan row mt-3 pad90">
      <div className="col-lg-6">
        <h5>Payment Methods</h5>
        <div className="d-flex flex-column">
          <div className="my-3">
            <input
              type="radio"
              name="payment"
              id="cash"
              onChange={(e) => setPaymentmethod(e.target.id)}
              defaultChecked
            />
            <label className="" htmlFor="cash">
              Cash in hand
            </label>
          </div>
          <div className="my-3">
            <input
              type="radio"
              name="payment"
              onChange={(e) => setPaymentmethod(e.target.id)}
              id="banktransfer"
            />
            <label className="" htmlFor="banktransfer">
              Bank Transfer
            </label>
          </div>
          <div className="my-3">
            <input
              type="radio"
              name="payment"
              id="other"
              onChange={(e) => setPaymentmethod(e.target.id)}
            />
            <label className="" htmlFor="other">
              Any other option
            </label>
          </div>
        </div>
        <div className="d-flex my-4">
          <button
            onClick={submitpayment}
            className="ms-auto btn btn-sm btn-dark"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
