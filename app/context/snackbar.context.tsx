import SnackbarFactory from "@/components/ui/snackbar/snackbar-factory";
import React, { createContext, useState, useContext } from "react";

export type SnackbarType = "success" | "error" | "info";

interface SnackbarContextProps {
  snackbar: {
    open: boolean;
    message: string;
    type: SnackbarType;
  };
  openSnackbar: (message: string, type: SnackbarType) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext({} as SnackbarContextProps);

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    type: SnackbarType;
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const openSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, openSnackbar, closeSnackbar }}>
      {children}
      {snackbar.open && (
        <SnackbarFactory
          message={snackbar.message}
          type={snackbar.type}
          onClose={closeSnackbar}
        />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
