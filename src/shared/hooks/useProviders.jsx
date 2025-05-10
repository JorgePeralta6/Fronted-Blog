import { useState } from "react";
import toast from "react-hot-toast";
import { getProviders as getProvidersRequest, saveProviders as saveProvidersRequest, updateProviders as updateProvidersRequest, deleteProvider as deleteProviderRequest } from "../../services";

export const useProviders = () => {
    const [providers, setProviders] = useState(null);
    const [isFetching, setIsFetching] = useState(null);

    const getProviders = async (isLogged = false) => {
        setIsFetching(true);

        const providersData = await getProvidersRequest();

        setIsFetching(false);

        if (providersData.error) {
            toast.error(providersData.e?.response?.data || 'Error al traer a los proveedores');
            return;
        }

        setProviders(providersData.data.providers)

        if (isLogged) {
            return { providers: providersData.data.providers }
        }

    };

    const addProviders = async (newProvider) => {
        const result = await saveProvidersRequest(newProvider);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || 'No se pudo guardar el proveedor')
        }

        toast.success('Proveedor guardado correctamente');
        await getProviders();
    };

    const updateProvider = async (id, updateProvider) => {
        const result = await updateProvidersRequest(id, updateProvider);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || "No se pudo actualizar el proveedor");
        }

        toast.success("Proveedor actualizado correctamente");
        await getProviders();
    }

    const deleteProvider = async (id) => {
        const result = await deleteProviderRequest(id);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || "No se pudo eliminar el proveedor");
        }

        toast.success("Proveedor eliminado correctamente");
        await getProviders();
    };

    return {
        providers,
        getProviders,
        addProviders,
        updateProvider,
        deleteProvider,
        isFetching
    }
}