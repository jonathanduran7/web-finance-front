import Modal from "@/components/ui/modal";
import { useForm } from "react-hook-form";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

type Inputs = {
  title: string;
  amount: number;
  description: string;
  date: string;
};

export default function TransactionsModal({
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="date"
              {...register("date", { required: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            />
            {errors.date && <span>La fecha es requerida</span>}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            />

            {errors.title && <span>El titulo es requerido</span>}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: false })}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="Amount"
              {...register("amount", { required: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            />
            {errors.amount && <span>El monto es requerido</span>}
          </div>

          <button
            className={`mt-4 px-4 py-2 text-white rounded bg-primary w-full`}
            type="submit"
          >
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
