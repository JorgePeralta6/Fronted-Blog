import { useState } from "react";
import toast from "react-hot-toast";
import { getMovimientos as getMovimientosRequest, getMovimientosByDate } from "../../services/api";
import dayjs from "dayjs";

export const useMovimientos = () => {
  const [movimientos, setMovimientos] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const getMovimientos = async ({ startDate, endDate } = {}) => {
    setIsFetching(true);
    setError(null);

    try {
      const res = startDate && endDate
        ? await getMovimientosByDate(startDate, endDate)
        : await getMovimientosRequest();

      setIsFetching(false);

      if (res.error) {
        toast.error(res.error?.response?.data || "Error al traer los movimientos");
        setError(res.error);
        return;
      }

      setMovimientos(res.data);

      if (res.data?.movements && Array.isArray(res.data.movements)) {
        const formatted = res.data.movements.map((movimiento) => ({
          producto:
            movimiento.product === "Data not found"
              ? "Producto no disponible"
              : movimiento.product?.name || "Producto sin nombre",
          cantidad: movimiento.quantity,
          empleado:
            movimiento.employee === "Data not found"
              ? "Empleado no disponible"
              : movimiento.employee?.name || "Empleado sin nombre",
          fecha: dayjs(movimiento.date).format("DD/MM/YYYY HH:mm:ss"),
          razon: movimiento.reason || "N/A",
          destino: movimiento.destiny || "N/A",
          tipo: (!movimiento.reason && !movimiento.destiny) ? "Entrada" : "Salida"
        }));
        setTableData(formatted);
      } else {
        console.error("movimientos.movements no es un array válido");
      }
    } catch (err) {
      console.error("Error al obtener movimientos:", err);
      setError(err);
      setIsFetching(false);
    }
  };

  return {
    movimientos,
    tableData,
    isFetching,
    error,
    getMovimientos,
  };
};
