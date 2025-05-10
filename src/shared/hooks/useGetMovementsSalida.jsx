import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovimientoSalida as getMovimientoSalidaRequest } from '../../services';
import toast from "react-hot-toast";

export const useSalida = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const registrarMovimientoSalida = async (productId, quantity, reason, destiny) => {
        setIsLoading(true);
        try {
        const response = await getMovimientoSalidaRequest({ productId, quantity, reason, destiny }); // Llama a la función de la API sin pasar el token
        setIsLoading(false);
    
        if (response?.error) {
            return toast.error(response.msg || 'Ocurrió un error al registrar la salida, intente de nuevo');
        }
    
        toast.success('Salida registrada con éxito!');
        navigate('/movimientos');
    
        } catch (error) {
        setIsLoading(false);
        toast.error('Ocurrió un error inesperado al registrar la salida.');
        console.error("Error al registrar salida:", error);
        }
    };
    
    return {
        registrarMovimientoSalida,
        isLoading
    };
}