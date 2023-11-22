import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

import Header from "../Header";

const Index = () => {
  const navigate = useNavigate();

  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (e) => {
    if (password !== confirmpassword) {
      alert("Password and Confirm Password are not same");
      return;
    }

    const senddata = {
      password,
    };

    // console.log(senddata);
    e.preventDefault();
    fetch(BaseURL + "admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(senddata),
    })
      .then((res) => res.json())
      .then((dta) => {
        console.log(dta);
        if (!dta.error) {
          localStorage.setItem("token", dta.token);
          localStorage.setItem("user", JSON.stringify(dta.result));
          navigate("/");
        } else alert(dta.error);
      })
      .catch((err) => console.log(err));
  };

  const handlepas = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handlecpas = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <Header login={false} />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Reset Password
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={handlepas}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      required
                      value={confirmpassword}
                      onChange={handlecpas}
                    />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                  </div>

                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
