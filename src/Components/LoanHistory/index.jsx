import React from "react";
import "./Styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import { Viewer } from "@react-pdf-viewer/core";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [arrLoan, setArrLoan] = React.useState([]);
  const [totpaid, setTotpaid] = React.useState(0);
  const [totremain, setTotremain] = React.useState(0);

  const [currenttab, setCurrenttab] = React.useState(1);
  const handletabs = (id) => {
    setCurrenttab(id);
  };

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }

    fetch(`${BaseURL}admin/loan/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          setArrLoan(data.loan);
          setTotpaid(data.totalpaid);
          setTotremain(data.remaining);
        } else alert("Error");
      })
      .catch((err) => console.log(err));
  }, []);

  const doc = new jsPDF();

  const filldata = () => {
    const header = [
      "S. No.",
      "Date",
      "Time",
      "Transaction ID",
      "Amount",
      "Method",
      "Status",
    ];

    const data = [];
    const total = arrLoan?.repaymenttransactionId?.length;

    arrLoan?.repaymenttransactionId?.map((dta, idx) => {
      data.push([
        idx + 2,
        dta.date.split("T")[0].split("-").reverse().join("-"),
        dta.date.split("T")[1].split(".")[0],
        dta.giventransactionId ? dta.giventransactionId.transactionId : "-",
        dta.amount,
        dta.modeofpayment,
        dta.remark,
      ]);
    });

    // doc.text("Loan History", 14, 15);

    doc.text("Total Paid: " + totpaid, 14, 15 + total * 10);
    doc.text("Total Remaining: " + totremain, 14, 15 + total * 10 + 5);
    doc.autoTable({
      head: [header],
      body: data,
      margin: { top: 40 },
      styles: { fontSize: 10, valign: "middle", halign: "center" },
    });
  };

  const exportToPDF = () => {
    //clear pdf
    doc.deletePage(1);
    doc.addPage();
    if (doc.autoTable.previous) {
      doc.autoTable.previous.finalY = 30;
    }

    filldata();
    doc.save("loan.pdf");
  };

  const printDocument = async () => {
    doc.deletePage(1);
    doc.addPage();
    if (doc.autoTable.previous) {
      doc.autoTable.previous.finalY = 30;
    }
    //reset autoTable

    filldata();

    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
  };

  const exportToCSV = () => {
    const data = arrLoan?.repaymenttransactionId;
    const fileName = "loan";
    const exportType = "csv";

    exportFromJSON({ data, fileName, exportType });
  };

  // const rendergivenloanhistable = () => {
  //   return (
  //     <tr>
  //       <td>1.</td>
  //       <td>
  //         {arrLoan?.giventransactionId?.date
  //           .split("T")[0]
  //           .split("-")
  //           .reverse()
  //           .join("-")}
  //         {", "}
  //         {arrLoan?.giventransactionId?.date.split("T")[1].split(".")[0]}
  //       </td>
  //       <td>{arrLoan?.giventransactionId?.transactionId}</td>
  //       <td>$ {arrLoan?.giventransactionId?.amount}</td>
  //       <td>{arrLoan?.modeOfPayment}</td>
  //       <td className="">{arrLoan?.giventransactionId?.remark}</td>
  //     </tr>
  //   );

  //   // );
  // };

  const renderloanhistable = () => {
    return arrLoan?.loanDetails?.length != 0 ? (
      arrLoan?.loanDetails?.map((dta, idx) => (
        <tr key={idx}>
          <td>{dta.month} </td>
          <td colSpan={2}>
            {dta.date
              ? dta.date.split("T")[0].split("-").reverse().join("-") +
                ", " +
                dta.date.split("T")[1].split(".")[0]
              : "-"}
          </td>
          <td>$ {(Math.round(dta.interestPayment * 100) / 100).toLocaleString()}</td>
          <td>$ {(Math.round(dta.principalPayment * 100) / 100).toLocaleString()}</td>
          <td>$ {dta.totalPayment.toLocaleString()}</td>
        </tr>
      ))
    ) : (
      <tr></tr>
    );
  };

  return (
    <div className="loanhistory pad90 mt-3">
      <div className="">
        <Link className="nav-link" to="/loanmanagement">
          <i className="fa-solid fa-arrow-left me-2"></i> {arrLoan?.user?.name}
        </Link>
      </div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center mb-3">
          {/* <nav className="nav me-auto">
            <span
            // onClick={() => handletabs(1)}
            // className={"nav-link tablink " + (currenttab === 1 ? "active" : "")}
            >
              Loan Requests
            </span>
            <span
            // onClick={() => handletabs(3)}
            // className={"nav-link tablink " + (currenttab === 3 ? "active" : "")}
            >
              Previous Loans History
            </span>
          </nav> */}
        </div>
        <div className="">
          <div className="btn btn-sm btn-dark me-3" onClick={printDocument}>
            Print
          </div>
          <div className="btn btn-sm btn-dark me-3" onClick={exportToPDF}>
            Export
          </div>
          <div className="btn btn-sm btn-red me-2">{arrLoan.status}</div>
          <div className="btn btn-sm btn-green">Total Paid $ {totpaid.toLocaleString()}</div>
          <div className="btn btn-sm btn-red ms-2">
            Remaining Amount $ {totremain.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="commntable">
        <section>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Date & Time</th>
                  <th></th>
                  <th>Interest</th>
                  <th>Principal</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead></thead>
              <tbody>
                {renderloanhistable()}
                {/* {rendergivenloanhistable()} */}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
