import { useState } from "react";
import toast from "react-hot-toast";
import { getTop } from "../../services/api"; // Asegúrate de que la ruta esté correcta

export const useTopProduct = () => {
  const [topProduct, setTopProduct] = useState(null);
  const [isFetchingTop, setIsFetchingTop] = useState(false);

  const fetchTopProduct = async () => {
    setIsFetchingTop(true);

    const response = await getTop();

    setIsFetchingTop(false);

    if (response.error) {
      toast.error(response.e?.response?.data?.msg || "Error al obtener el producto más vendido");
      return;
    }

    setTopProduct(response.data.product);
  };

  return {
    topProduct,
    isFetchingTop,
    fetchTopProduct,
  };
};
