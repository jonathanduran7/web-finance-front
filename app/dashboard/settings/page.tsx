"use client";
import Accordion from "@/components/ui/accordion";
import CurrencyAccordion from "./currency-accordion";
import CategoryAccordion from "./category-accordion";
import AccountAccordion from "./account-accordion";

export default function Page() {
  return (
    <div className="h-full">
      <h1>Settings</h1>
      <div className="w-[80%]">
        <Accordion title="Cuentas">
          <AccountAccordion />
        </Accordion>
        <Accordion title="Categorias">
          <CategoryAccordion />
        </Accordion>
        <Accordion title="Monedas">
          <CurrencyAccordion />
        </Accordion>
      </div>
    </div>
  );
}
