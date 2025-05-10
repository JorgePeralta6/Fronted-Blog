import { useState } from "react";
import toast from "react-hot-toast";
import { getTop3 } from "../../services/api"; // Asegúrate de que esta ruta sea correcta

export const useTop3 = () => {
  const [top3Products, setTop3Products] = useState([]);
  const [isFetchingTop3, setIsFetchingTop3] = useState(false);

  const fetchTop3Products = async () => {
    setIsFetchingTop3(true);

    const response = await getTop3();

    setIsFetchingTop3(false);

    if (response.error) {
      toast.error(response.e?.response?.data?.msg || "Error al obtener los productos más vendidos");
      return;
    }

    setTop3Products(response.data.products);
  };

  return {
    top3Products,
    isFetchingTop3,
    fetchTop3Products,
  };
};
