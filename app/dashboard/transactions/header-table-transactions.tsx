"use client";

export default function HeaderTableTransaction() {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Buscar"
        className="w-[300px] p-2 border border-gray-300 rounded-md outline-none"
      />
      <button className="bg-primary text-white p-2 rounded-md ml-2">
        Buscar
      </button>
      <button className="bg-primary text-white p-2 rounded-md ml-2">
        Crear
      </button>
    </div>
  );
}
