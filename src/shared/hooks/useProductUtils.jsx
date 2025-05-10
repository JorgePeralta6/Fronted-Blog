import { useState, useEffect } from "react";
import { getCategories, getProviders } from "../../services";
import toast from "react-hot-toast";

export const useProductUtils = () => {
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  const fetchData = async () => {
    const catRes = await getCategories();
    if (catRes.error) return toast.error("Error al obtener categorías");
    setCategories(catRes.data.categories || []);

    const provRes = await getProviders();
    if (provRes.error) return toast.error("Error al obtener proveedores");
    setProviders(provRes.data.providers || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { categories, providers };
};
