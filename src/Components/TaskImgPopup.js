import React from "react";
import closeImg from "../Assets/Images/x.png";
import { data } from "../Common/config";
function TaskImgPopup({ setShowPopUp, individualTaskData }) {
  const baseApiUrl = data?.apiBaseUrl;
  console.log("individualTaskData", individualTaskData);
  return (
    <div className="popup-container">
      <div className="popup-page-container">
        <div className="popup-size">
          <div
            className="popup-close"
            onClick={() => {
              setShowPopUp(false);
            }}
          >
            <img src={closeImg} alt="close popup" />
          </div>
          <div className="popup-content">
            <h1 className="popup-title"> {individualTaskData?.heading}</h1>
            <div className="popup-image-container">
              <img
                src={`${baseApiUrl}/${individualTaskData?.image?.toString()}`}
                alt={`image`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskImgPopup;
