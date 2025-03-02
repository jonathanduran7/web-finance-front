"use client";

import { useSnackbar } from "@/app/context/snackbar.context";
import { Currency } from "@/app/models/Currency";
import { createAccount } from "@/app/services/api/account.api";
import { getCurrencies } from "@/app/services/api/currency.api";
import Modal from "@/components/ui/modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface AccountModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function AccountModal({
  isModalOpen,
  setIsModalOpen,
}: AccountModalProps) {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [account, setAccount] = useState({
    name: "",
    currencyId: 1,
    balance: 0,
  });
  const { data } = useQuery<Currency[]>({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      openSnackbar("Cuenta creada", "success");
    },
    onError: () => {
      openSnackbar("Ocurrio un error al crear la cuenta", "error");
    },
  });

  const handleSave = () => {
    mutate({ ...account, initialBalance: account.balance });
    setAccount({
      name: "",
      currencyId: 1,
      balance: 0,
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setAccount({
      name: "",
      currencyId: 1,
      balance: 0,
    });
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>Cuenta</Modal.Header>
      <Modal.Body>
        <p>Ingrese el nombre de la cuenta</p>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
          placeholder="Nombre de la cuenta"
          name="account"
          value={account.name}
          onChange={(e) => setAccount({ ...account, name: e.target.value })}
        ></input>
        <select
          className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
          name="currency"
          value={account.currencyId}
          onChange={(e) =>
            setAccount({ ...account, currencyId: Number(e.target.value) })
          }
        >
          {data?.map((currency) => (
            <option key={currency.id} value={currency.id}>
              {currency.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
          placeholder="Saldo inicial"
          name="balance"
          value={account.balance}
          onChange={(e) =>
            setAccount({ ...account, balance: Number(e.target.value) })
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-col mt-6">
          <button
            onClick={() => handleSave()}
            disabled={!account}
            className={`mt-4 px-4 py-2 text-white rounded ${!account ? "bg-gray-400" : "bg-primary"}`}
          >
            Guardar
          </button>
          <button
            onClick={() => handleCancel()}
            className="mt-2 px-4 py-2 bg-white text-primary rounded border border-primary"
          >
            Cancelar
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
