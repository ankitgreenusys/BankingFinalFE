import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();

  const frmdta = new FormData();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);
  const [page1fil, setPagefil] = React.useState(false);

  const [isverify, setVerify] = React.useState(false);
  const [sendotp, setSendotp] = React.useState(false);
  const [otp, setOtp] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [formdta, setFormdata] = React.useState({
    name: "",
    phonenumber: "",
    dob: new Date().toISOString().split("T")[0],
    gender: "",
    documentImage: "",
  });
  const [resuser, setResuser] = React.useState({});

  const [saving, setSaving] = React.useState("share");

  React.useEffect(() => {
    setSendotp(false);
  }, [email]);

  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  // const imageupload = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertToBase64(file);
  //   setFormdata({ ...formdta, documentImage: base64 });
  // };

  const imageupload = (e) => {
    frmdta.append("document", e.target.files[0]);
  };

  const handlechange = (e) => {
    setFormdata({ ...formdta, [e.target.name]: e.target.value });
    // frmdta.append(e.target.name, e.target.value);
  };

  const sendotpfunc = () => {
    setVerify(false);
    const dta = {
      name: formdta.name,
      email,
      mobile: formdta.phonenumber,
      dob: formdta.dob,
      gender: formdta.gender,
    };
    console.log(dta);

    fetch(BaseURL + "admin/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(dta),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setResuser(res.result);
          setSendotp(true);
          alert(res.success);
        } 
        // else alert(res.error);
      })
      .catch((err) => console.log("err : ", err));
  };

  const verifyotp = () => {
    fetch(BaseURL + "admin/verifyotp/" + resuser._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ otp }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setVerify(true);
          alert(res.success);
        } 
        // else alert(res.error);
      })
      .catch((err) => console.log("err : ", err));
  };

  const createuser = () => {
    const dta = {
      document: formdta.documentImage,
    };
    console.log(dta);

    // fetch(BaseURL + "admin/sendpwdlink/" + resuser._id, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    //   body: JSON.stringify(dta),
    // })
    fetch(BaseURL + "admin/sendpwdlink/" + resuser._id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "form-data/json",
      },
      body: frmdta,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setPagefil(true);
        } 
        // else alert(res.error);
      })
      .catch((err) => console.log("err : ", err));
  };

  const setsave = () => {
    const dta = {
      savingprofit: saving,
    };
    console.log(dta);

    fetch(BaseURL + "admin/setsavingpro/" + resuser._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(dta),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          navigate("/users");
        } 
        // else alert(res.error);
      })
      .catch((err) => console.log("err : ", err));
  };

  return (
    <div className="createuserform pad90 mt-5">
      {!page1fil && (
        <>
          <div className="contact-form row">
            <h6>Create User</h6>
            <div className="form-field col-lg-4">
              <input
                id="name"
                className="input-text"
                type="text"
                name="name"
                value={formdta.name}
                onChange={handlechange}
                disabled={isverify}
              />
              <label className="label" htmlFor="name">
                Full Name
              </label>
            </div>
            <div className="form-field col-lg-4 ">
              <input
                id="phonenumber"
                className="input-text phone"
                type="text"
                name="phonenumber"
                value={formdta.phonenumber}
                onChange={handlechange}
                disabled={isverify}
                required
              />
              <label className="label" htmlFor="phonenumber">
                Phone Number
              </label>
            </div>
            <div className="form-field col-lg-4">
              <input
                id="dob"
                className="input-text"
                type="date"
                name="dob"
                value={formdta.dob}
                onChange={handlechange}
                disabled={isverify}
              />
              <label className="label" htmlFor="dob">
                Date of Birth
              </label>
            </div>
            <div className="form-field col-lg-4">
              <select
                id="gender"
                className="input-text"
                name="gender"
                onChange={handlechange}
                disabled={isverify}
              >
                <option value="" defaultValue hidden>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-field col-lg-4 d-flex align-items-center">
              <input
                id="email"
                className="input-text"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isverify}
              />
              <label className="label" htmlFor="email">
                Email Address
              </label>
              <button
                className="btn btn-sm btn-dark ms-3 verifybtn"
                onClick={sendotpfunc}
                disabled={sendotp}
              >
                Send OTP
              </button>
            </div>
            <div className="form-field col-lg-4 d-flex align-items-center">
              <input
                id="otp"
                className="input-text"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={!sendotp || isverify}
              />
              <label className="label" htmlFor="otp">
                <p className="p-0 m-0">Code sent to your Email</p>
              </label>
              <button
                className="btn btn-sm btn-dark ms-3 verifybtn"
                onClick={verifyotp}
                disabled={!sendotp || isverify}
              >
                {isverify ? "Verified" : "Verify"}
              </button>
            </div>
          </div>
          <div className="my-2">
            <p className="uploadlabel">Document</p>
            <div className="upload-btn-wrapper">
              <input
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                className="btn btn-sm btn-dark verifybtn"
                onChange={imageupload}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              className="btn btn-dark btn-sm"
              disabled={!isverify}
              onClick={createuser}
            >
              Send Password Reset link
            </button>
          </div>
        </>
      )}
      {page1fil && (
        <div className="page2">
          <div className="mb-3">
            <span onClick={() => setPagefil(false)}>
              <i className="fa-solid fa-arrow-left"></i> Back
            </span>
          </div>
          <div className="d-flex w-75  justify-content-between">
            <div className="">
              <p>Full Name</p>
              <h6>
                {resuser?.name} <br />{" "}
                <span className="text-green">Verified</span>
              </h6>
            </div>
            <div className="divder"></div>
            <div className="">
              <p>Date of Birth</p>
              <h6>
                {resuser?.dob.split("T")[0].split("-").reverse().join("-")}
              </h6>
            </div>
            <div className="divder"></div>
            <div className="">
              <p>Email Address</p>
              <h6>{resuser?.email}</h6>
            </div>
            <div className="divder"></div>
            <div className="">
              <p>Phone Number</p>
              <h6>{resuser?.mobile}</h6>
            </div>
            <div className="divder"></div>
            <div className="">
              <p>Submitted Documents</p>
              <h6>
                <i className="fa-solid fa-file-invoice"></i> Profile ID Cad{" "}
                <br />
                <a target="_blank" rel="noreferrer" href={""}>
                  View
                </a>
              </h6>
            </div>
          </div>
          <h6 className="text-red mt-5">Create User</h6>
          <div className="d-flex">
            <div className="my-3 me-5 radiobox">
              <input
                type="radio"
                name="saving"
                id="Share"
                defaultChecked
                onChange={(e) => setSaving(e.target.id)}
              />
              <label className="" htmlFor="share">
                <h6>Share Profit</h6>
                <span>
                  members share profits made on loans and thus no interest on
                  loans
                </span>
              </label>
            </div>
            <div className="m-3 ms-5 radiobox">
              <input
                type="radio"
                name="saving"
                id="Set"
                onChange={(e) => setSaving(e.target.id)}
              />
              <label className="" htmlFor="set">
                <h6>Set Interest</h6>
                <span>members have a set interest on the deposits/savings</span>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-dark btn-sm" onClick={setsave}>
              Create user
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
