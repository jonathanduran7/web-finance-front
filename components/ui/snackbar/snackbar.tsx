import React, { useState, useEffect } from "react";
import "./snackbar.css";

interface SnackbarProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Snackbar = ({ message, duration = 3000, onClose }: SnackbarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    const timerClose = setTimeout(() => {
      onClose();
    }, duration + 300);

    return () => {
      clearTimeout(timer);
      clearTimeout(timerClose);
    };
  }, [duration, onClose]);

  return <div className={`snackbar ${visible ? "show" : ""}`}>{message}</div>;
};

export default Snackbar;
