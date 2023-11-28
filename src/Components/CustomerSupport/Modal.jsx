import React from "react";

const Modal = (props) => {
  return (
    <div>
      <button
        type="button"
        class="btn btn-blue"
        data-bs-toggle="modal"
        data-bs-target={"#exampleModal" + props.dta._id}
      >
        View Message
      </button>

      <div
        class="modal fade"
        id={"exampleModal" + props.dta._id}
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">{props.dta.subject}</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">{props.dta.message}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
