import React from "react";
import "./Styles.css";
import { Link, useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [userlist, setUserlist] = React.useState([]);

  React.useEffect(() => {
    fetch(BaseURL + "admin/allusers", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setUserlist(res.users);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const rendercommntable = () =>
    userlist?.map(
      (dt, idx) =>
        dt._id && (
          <tr key={idx}>
            <td>{idx + 1}.</td>
            <td colSpan={2}>{dt._id}</td>
            <td>{dt.name}</td>
            <td>
              {dt?.joiningDate.split("T")[0].split("-").reverse().join("-")}
            </td>
            <td>
              {dt?.dob?.split("T")[0].split("-").reverse().join("-")}
              </td>
            <td>
              <Link to={"/users/" + dt._id} className="btn btn-sm btn-blue">
                View Details
              </Link>
            </td>
          </tr>
        )
    );

  return (
    <div className="userspag pad90 mt-3">
      <div className="d-flex flex-row-reverse mb-3">
        <Link to="create" className="btn btn-sm btn-green">
          <i className="fa-solid fa-plus"></i> Create New User
        </Link>
      </div>
      <div className="commntable">
        <section>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>User ID</th>
                  <th> </th>
                  <th>User Name</th>
                  <th>Date of Joining</th>
                  <th>Date of Birth</th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>{rendercommntable()}</tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
