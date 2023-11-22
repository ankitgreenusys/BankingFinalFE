import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";

import Stats from "./Stats";
import ActiveUsers from "./ActiveUsers";
import Graph from "./Graph";
import Notification from "./Notification";

const Index = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="pad90 mt-5">
      <div className="row">
        <div className="col-8">
          <Stats />
          {/* <Graph /> */}
        </div>
        <div className="col-1"></div>
        <div className="col-3">
          <Notification />
          {/* <ActiveUsers /> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
