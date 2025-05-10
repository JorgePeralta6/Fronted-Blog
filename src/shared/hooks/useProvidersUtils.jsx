import { useState, useEffect } from "react";
import { getProducts } from "../../services";
import toast from "react-hot-toast";

export const useProvidersUtils = () => {
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        const prodRes = await getProducts();
        if (prodRes.error) return toast.error('Error al obtener productos');
        setProducts(prodRes.data.products || []);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        products,
        refetchProducts: fetchData
    };
};