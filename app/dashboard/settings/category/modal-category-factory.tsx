import CategoryModal from "./create-category-modal";

interface ModalFactoryProps {
  type: "create" | "edit" | "none";
  values?: { id: string; currency: string };
  onClose: () => void;
}

export default function ModalFactory({ type, onClose }: ModalFactoryProps) {
  switch (type) {
    case "create":
      return <CategoryModal isModalOpen={true} setIsModalOpen={onClose} />;
    default:
      return null;
  }
}
