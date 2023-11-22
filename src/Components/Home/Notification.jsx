import React from "react";

import BaseURL from "../../Api/BaseURL";

const Notification = () => {
  const [noti, setNoti] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.getItem("token"))
      fetch(BaseURL + "admin/notification", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          if (!res.error) {
            setNoti(res.notifications);
          }
          // else alert(res.resposneMessage);
        })
        .catch((err) => console.log(err));
  }, []);

  const renderNoti = () =>
    noti.slice(0, 5).map((item) => (
      <li key={item._id} className="notimes py-2">
        {item.message}
      </li>
    ));

  return (
    <div className="notisec">
      <h5>Notifications</h5>
      <ul className="notilist p-0 m-0">
        {noti.length > 0 ? (
          renderNoti()
        ) : (
          <li className="notimes py-2">No Notifications</li>
        )}
      </ul>
    </div>
  );
};

export default Notification;
