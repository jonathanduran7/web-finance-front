import CurrencyModal from "./create-currency-modal";
import CurrencyUpdateModal from "./edit-currency-modal";

interface ModalFactoryProps {
  type: "create" | "edit" | "none";
  values?: { id: string; currency: string };
  onClose: () => void;
}

export default function ModalFactory({
  type,
  values,
  onClose,
}: ModalFactoryProps) {
  switch (type) {
    case "create":
      return <CurrencyModal isModalOpen={true} setIsModalOpen={onClose} />;
    case "edit":
      return values ? (
        <CurrencyUpdateModal
          values={values}
          isModalOpen={true}
          setIsModalOpen={onClose}
        />
      ) : null;
    default:
      return null;
  }
}
