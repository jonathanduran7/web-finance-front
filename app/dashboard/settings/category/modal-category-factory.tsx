import CategoryModal from "./create-category-modal";
import CategoryUpdateModal from "./edit-category-modal";

interface ModalFactoryProps {
  type: "create" | "edit" | "none";
  values?: { id: string; category: string };
  onClose: () => void;
}

export default function ModalFactory({
  type,
  onClose,
  values,
}: ModalFactoryProps) {
  switch (type) {
    case "create":
      return <CategoryModal isModalOpen={true} setIsModalOpen={onClose} />;
    case "edit":
      return values ? (
        <CategoryUpdateModal
          isModalOpen={true}
          setIsModalOpen={onClose}
          values={values}
        />
      ) : null;
    default:
      return null;
  }
}
