export const formatCurrency = (value: number | string): string => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  })
    .format(value)
    .replace(/\s/g, "");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormattedDate = (dateInput: any): string => {
  try {
    if (typeof dateInput === "string") {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        return new Date().toISOString().split("T")[0];
      }
      return date.toISOString().split("T")[0];
    } else if (dateInput instanceof Date && !isNaN(dateInput.getTime())) {
      return dateInput.toISOString().split("T")[0];
    }
    return new Date().toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return new Date().toISOString().split("T")[0];
  }
};
