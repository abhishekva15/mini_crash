import React, { useEffect } from "react";
import "./Popup.css";
import { useSocketContext } from "../context/socket/SocketContext";

const Error: React.FC = () => {
  const { errorText, errorModel, setErrorModel } = useSocketContext();

  useEffect(() => {
    let timer: number;
    if (errorModel) {
      timer = setTimeout(() => {
        setErrorModel(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [errorModel, setErrorModel]);

  return (
    <div className="toast-center">
      <div className="toast-container red-toast">{errorText}</div>
    </div>
  );
};

export default Error;
