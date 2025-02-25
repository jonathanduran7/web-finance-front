import { Account } from "@/app/models/Accounts";
import { Category } from "@/app/models/Category";
import { getAccount } from "@/app/services/api/account.api";
import { getCategories } from "@/app/services/api/category.api";
import Modal from "@/components/ui/modal";
import { useQuery } from "@tanstack/react-query";
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
  accountId: number;
  categoryId: number;
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

  const { data: accounts } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: getAccount,
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

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
            <select
              {...register("accountId", { required: true })}
              id="account"
              name="account"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none bg-white"
            >
              {accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            {errors.accountId && <span>La cuenta es requerida</span>}
          </div>

          <div className="mb-4">
            <select
              {...register("categoryId", { required: true })}
              id="category"
              name="category"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none bg-white"
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <span>La categoria es requerida</span>}
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
