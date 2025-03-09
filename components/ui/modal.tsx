"use client";
import { FC, ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalSubComponents {
  Header: FC<{ children: ReactNode }>;
  Body: FC<{ children: ReactNode }>;
  Footer: FC<{ children: ReactNode }>;
}

const Modal: FC<ModalProps> & ModalSubComponents = ({
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] md:w-96">
          {children}
        </div>
      </div>
    </div>
  );
};

/* eslint-disable react/display-name */
Modal.Header = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold mb-4">{children}</h2>
);

Modal.Body = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

Modal.Footer = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export default Modal;
