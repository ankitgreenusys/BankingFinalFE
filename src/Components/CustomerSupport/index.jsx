import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [tickets, setTickets] = React.useState([]);

  React.useEffect(() => {
    fetch(BaseURL + "admin/alltickets", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) setTickets(res.customerSupport);
        // else alert(res.error);
      })
      .catch((err) => console.log(err));
  }, []);

  const rendercommntable = () =>
    tickets.map((dta, idx) => (
      <tr>
        <td>{idx + 1}.</td>
        <td>{dta?.user?.name}</td>
        <td colSpan={2}>{new Date(dta?.date).toLocaleString()}</td>
        <td>
          {dta?.subject.length > 20
            ? dta?.subject.slice(0, 20) + "..."
            : dta?.subject}
        </td>
        <td colSpan={2}>{dta?.user?.email}</td>
        <td>
          <div className="btn btn-sm btn-blue">View Message</div>
        </td>
      </tr>
    ));

  return (
    <div className="investmentpage pad90 mt-3">
      <div className="commntable">
        <section>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>User Name</th>
                  <th>Date & Time</th>
                  <th> </th>
                  <th>Subject</th>
                  <th>Email</th>
                  <th> </th>
                  <th>Message</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No Tickets Found
                    </td>
                  </tr>
                ) : (
                  rendercommntable()
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
