import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import "jspdf-autotable";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();

  const [transOption, setTransOption] = React.useState("overall");

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const TransactionData = () => {
    console.log("TransactionData");
    fetch(`${BaseURL}admin/gettransaction/${transOption}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((dta) => {
        console.log(dta);
        if (!dta.error) {
          // const data = dta.transactions.map((ele) => {
          //   return {
          //     transactionDate: ele.date,
          //     transactionId: ele.transactionId,
          //     Amount: ele.amount,
          //     Remark: ele.remark,
          //   };
          // });

          // const fileName = "TransactionReport";
          // const exportType = exportFromJSON.types.csv;
          // exportFromJSON({ data, fileName, exportType });

          const header = [
            "Transaction Date",
            "Transaction Time",
            "User ID",
            "User Name",
            "Transaction ID",
            "Amount",
            "Remark",
          ];

          const data1 = [];

          dta.transactions.map((ele, index) => {
            data1.push([
              ele.date.split("T")[0].split("-").reverse().join("-"),
              ele.date.split("T")[1].split(".")[0],
              ele.userId._id,
              ele.userId.name,
              ele.transactionId,
              ele.amount,
              ele.remark,
            ]);
          });

          const doc = new jsPDF({ orientation: "landscape" });

          doc.text("Transaction Report", 14, 10);
          doc.autoTable({
            head: [header],
            body: data1,
            startY: 20,
            //center
            styles: { fontSize: 10, valign: "middle", halign: "center" },
          });

          doc.save("TransactionReport.pdf");
        } else alert("Error");
      })
      .catch((err) => console.log(err));
  };

  const handlechangetrans = (e) => {
    console.log(e.target.id);
    setTransOption(e.target.id);
  };

  const UserData = () => {
    fetch(`${BaseURL}admin/allusers`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((dta) => {
        // console.log(dta);
        // const data = dta.users.map((ele) => {
        //   return {
        //     id: ele._id,
        //     name: ele.name,
        //     email: ele.email,
        //     phone: ele.mobile,
        //     joiningDate: ele.joiningDate,
        //     gender: ele.gender,
        //     dob: ele.dob,
        //     verified: ele.isVerified,
        //     balance: ele.balance,
        //     savingprofit: ele.savingprofit,
        //     totalDeposit: ele.totalDeposit,
        //     totalWithdraw: ele.totalWithdraw,
        //     totalProfit: ele.totalProfit,
        //   };
        // });

        const header = [
          "User ID",
          "User Name",
          "Email",
          "Joining Date",
          "Date Of Birth",
        ];

        const data = [];

        dta.users.map((ele, index) => {
          data.push([
            ele._id,
            ele.name,
            ele.email,
            ele.joiningDate.split("T")[0].split("-").reverse().join("-"),
            ele.dob.split("T")[0].split("-").reverse().join("-"),
          ]);
        });

        const doc = new jsPDF({ orientation: "landscape" });

        doc.text("User Report", 14, 10);
        doc.autoTable({
          head: [header],
          body: data,
          startY: 20,
          //center
          styles: { fontSize: 10, valign: "middle", halign: "center" },
        });

        doc.save("UserReport.pdf");

        // if (!dta.error) {
        //   const fileName = "UserReport";
        //   const exportType = exportFromJSON.types.csv;
        //   exportFromJSON({ data, fileName, exportType });
        // } else alert("Error");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="repage mt-5 pad90">
      <div className="trnssec">
        <h6>Transaction Report</h6>
        <div className="w-50 mt-4">
          <div className="d-flex justify-content-between">
            <div className="my-3">
              <input
                onClick={handlechangetrans}
                type="radio"
                name="record"
                id="overall"
                checked={transOption === "overall"}
              />
              <label className="" htmlFor="overall">
                Overall
              </label>
            </div>
            <div className="my-3">
              <input
                onClick={handlechangetrans}
                type="radio"
                name="record"
                id="28"
                checked={transOption === "28"}
              />
              <label className="" htmlFor="28">
                Last 28 days
              </label>
            </div>
            <div className="my-3">
              <input
                onClick={handlechangetrans}
                type="radio"
                name="record"
                id="14"
                checked={transOption === "14"}
              />
              <label className="" htmlFor="14">
                Last 14 days
              </label>
            </div>
            <div className="my-3">
              <input
                onClick={handlechangetrans}
                type="radio"
                name="record"
                id="7"
                checked={transOption === "7"}
              />
              <label className="" htmlFor="7">
                Last 7 days
              </label>
            </div>
          </div>
          <div onClick={TransactionData} className="btn btn-dark btn-sm mt-4">
            Export
          </div>
        </div>
      </div>
      <div className="usersec mt-5">
        <h6>User Accounts Report</h6>
        <div className="w-50 mt-4">
          <div className="d-flex justify-content-between">
            <div className="my-3">
              <input
                type="radio"
                name="userrecord"
                id="userlast28"
                defaultChecked
              />
              <label className="" htmlFor="userlast28">
                Last 28 days
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="userrecord"
                id="userlast14"
                defaultChecked
              />
              <label className="" htmlFor="userlast14">
                Last 14 days
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="userrecord"
                id="userlast7"
                defaultChecked
              />
              <label className="" htmlFor="userlast7">
                Last 7 days
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="userrecord"
                id="usercustom"
                defaultChecked
              />
              <label className="" htmlFor="usercustom">
                Custom
              </label>
            </div>
          </div>
          <div onClick={UserData} className="btn btn-dark btn-sm mt-4">
            Export
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
