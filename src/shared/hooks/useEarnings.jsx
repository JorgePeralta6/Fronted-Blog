import { useState } from "react";
import toast from "react-hot-toast";
import { getEarnings as getEarningsRequest } from "../../services/api"; // Asegúrate de que la ruta sea correcta

export const useEarnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [isFetchingEarnings, setIsFetchingEarnings] = useState(false);

  const fetchEarnings = async () => {
    setIsFetchingEarnings(true);

    const response = await getEarningsRequest();

    setIsFetchingEarnings(false);

    if (response.error) {
      toast.error(response.e?.response?.data?.msg || 'Error al obtener las ganancias');
      return;
    }

    setEarnings(response.data.totalEarnings); // Asumiendo que el backend devuelve { totalEarnings: number }
    console.log('Ganancias totales:', response.data.totalEarnings);
  };

  return {
    earnings,
    isFetchingEarnings,
    fetchEarnings,
  };
};
