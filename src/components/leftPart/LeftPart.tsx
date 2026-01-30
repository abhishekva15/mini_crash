import React from "react";
import { icon } from "../../utils/icon";
import "./LeftPart.css";
import InputContainer from "./InputContainer";

const LeftPart: React.FC = () => {
  return (
    <>
      <div className="text_game">Will the Plane Crash Within</div>
      <div className="inc_dec_section">
        <div className="inc_dec">
          <div className="btn_in">
            <img
              src={icon?.upDownIcon}
              alt=""
              style={{ transform: "rotate(180deg)" }}
            />
          </div>
          <div className="time_inc">10 Sec</div>
          <div className="btn_in">
            <img src={icon?.upDownIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="under_section">
        <div className="under_top">
          <div className="under_text">Under</div>
          <div className="line_mi"></div>
          <div className="under_text">Over</div>
        </div>
        <div className="under_bottom">
          <div className="under_text">1.98</div>
          <div className="line_mi_b"></div>
          <div className="under_text">1.998</div>
        </div>
      </div>
      <InputContainer />
      <div className="yes_no_btn">
        <div className="yes_btn">Yes</div>
        <div className="yes_btn">No</div>
      </div>
    </>
  );
};

export default LeftPart;
