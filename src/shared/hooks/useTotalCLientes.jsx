import { useState } from "react";
import toast from "react-hot-toast";
import { getTotalC as getTotalClientsRequest } from "../../services/api";

export const useTotalClients = () => {
  const [totalClients, setTotalClients] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getTotalClients = async () => {
    setIsFetching(true);

    const response = await getTotalClientsRequest();

    setIsFetching(false);

    if (response.error) {
      toast.error(response.e?.response?.data?.message || "Error al obtener el total de clientes");
      return;
    }

    setTotalClients(response.data.totalClients);
    console.log("Total de clientes:", response.data.totalClients);

    return { totalClients: response.data.totalClients };
  };

  return {
    totalClients,
    isFetching,
    getTotalClients,
  };
};
