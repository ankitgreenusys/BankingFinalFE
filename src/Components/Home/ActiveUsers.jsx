import React from "react";
import { Doughnut } from "react-chartjs-2";

import BaseURL from "../../Api/BaseURL";

const ActiveUsers = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dta, setDta] = React.useState({
    labels: ["Male", "Female"],
    datasets: [
      {
        label: " of People",
        data: [5, 5],
        borderWidth: 1,
      },
    ],
  });

  React.useEffect(() => {
    if (localStorage.getItem("token"))
      fetch(`${BaseURL}admin/userbasedgender`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((dta) => {
          console.log(dta);
          if (!dta.error) {
            setData(dta.result);
            setLoading(false);
          } else alert("Error");
        })
        .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (data) {
      setDta({
        labels: data.map((ele) => ele._id),
        datasets: [
          {
            label: " of People",
            data: data.map((ele) => ele.count),
            borderWidth: 1,
            backgroundColor: ["#007bff", "#dc3545"],
          },
        ],
      });
    }
  }, [data]);

  return (
    <div className="mt-4">
      <h5>Active Users</h5>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Doughnut data={dta} />
      )}
    </div>
  );
};

export default ActiveUsers;
