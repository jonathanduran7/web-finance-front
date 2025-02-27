import React, { useState, useEffect } from "react";
import "./styles/snackbar.css";

interface SnackbarProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Snackbar = ({ message, duration = 3000, onClose }: SnackbarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Activa la animación de entrada
    setVisible(true);

    // Inicia un timer para comenzar la animación de salida
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    // Espera el tiempo de la animación de salida y cierra el snackbar
    const timerClose = setTimeout(() => {
      onClose();
    }, duration + 300); // 300ms es el tiempo de transición definido

    return () => {
      clearTimeout(timer);
      clearTimeout(timerClose);
    };
  }, [duration, onClose]);

  return <div className={`snackbar ${visible ? "show" : ""}`}>{message}</div>;
};

export default Snackbar;
