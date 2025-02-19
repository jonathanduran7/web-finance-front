"use client";
import Accordion from "@/components/ui/accordion";
import CurrencyAccordion from "./currency-accordion";

export default function Page() {
  return (
    <div className="h-full">
      <h1>Settings</h1>
      <div className="w-[80%]">
        <Accordion title="Cuentas">
          <p>Cuenta</p>
        </Accordion>
        <Accordion title="Categorias">
          <p>Categorias</p>
        </Accordion>
        <Accordion title="Monedas">
          <CurrencyAccordion />
        </Accordion>
      </div>
    </div>
  );
}
