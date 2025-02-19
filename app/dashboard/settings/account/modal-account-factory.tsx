import AccountModal from "./create-account-modal";
import AccountEditModal from "./edit-account-modal";

interface ModalFactoryProps {
  type: "create" | "edit" | "none";
  values?: {
    id: string;
    name: string;
    currencyId: number;
    initialBalance: number;
  };
  onClose: () => void;
}

export default function ModalFactory({
  type,
  onClose,
  values,
}: ModalFactoryProps) {
  switch (type) {
    case "create":
      return <AccountModal isModalOpen={true} setIsModalOpen={onClose} />;
    case "edit":
      return values ? (
        <AccountEditModal
          isModalOpen={true}
          setIsModalOpen={onClose}
          values={values}
        />
      ) : null;
    default:
      return null;
  }
}
