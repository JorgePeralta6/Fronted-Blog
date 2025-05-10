import { useState } from "react";
import toast from "react-hot-toast";
import { getStats as getStatsRequest } from "../../services/api";

export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getStats = async (isLogged = false) => {
    setIsFetching(true); // Establecer el estado de carga antes de hacer la solicitud.

    const statsData = await getStatsRequest();
    
    setIsFetching(false); // Finaliza la carga después de la respuesta.

    if (statsData.error) {
      toast.error(statsData.e?.response?.data || 'Error al traer las estadísticas');
      return;
    }

    
    setStats(statsData.data); 
    console.log('Datos de estadísticas:', statsData.data); // Verifica la estructura de los datos aquí
    if (isLogged) {
      return { stats: statsData.data };
    }
  };

  return {
    stats, 
    isFetching, 
    getStats, 
  };
};

