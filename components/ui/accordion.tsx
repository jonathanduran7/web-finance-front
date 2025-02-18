"use client";
import React, { useState, useRef, useEffect } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children, isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-lg mb-2 shadow-sm">
      <div
        className="flex justify-between p-2 cursor-pointer bg-white rounded-lg"
        onClick={toggleAccordion}
      >
        <h3 className="m-0">{title}</h3>
        <span className="text-lg">{isOpen ? "▼" : "►"}</span>
      </div>
      <div
        style={{
          height: isOpen ? height : 0,
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
      >
        <div className="p-2" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
