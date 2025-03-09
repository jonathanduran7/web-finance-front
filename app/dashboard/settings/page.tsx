"use client";
import Accordion from "@/components/ui/accordion";
import CurrencyAccordion from "./currency-accordion";
import CategoryAccordion from "./category-accordion";
import AccountAccordion from "./account-accordion";

export default function Page() {
  return (
    <div className="h-full">
      <h1 className="mb-4 text-3xl">Configuraciones</h1>
      <div className="mb-4 text-gray-500 text-sm w-full md:w-[60%]">
        <p>
          Configura tus preferencias de la aplicacion. Puedes modificar tus
          cuentas, categorias y monedas.
        </p>
      </div>
      <div className="w-full md:w-[60%] mt-4">
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
