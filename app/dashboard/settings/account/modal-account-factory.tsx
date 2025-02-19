import AccountModal from "./create-account-modal";

interface ModalFactoryProps {
  type: "create" | "edit" | "none";
  values?: { id: string; category: string };
  onClose: () => void;
}

export default function ModalFactory({ type, onClose }: ModalFactoryProps) {
  switch (type) {
    case "create":
      return <AccountModal isModalOpen={true} setIsModalOpen={onClose} />;
    default:
      return null;
  }
}
