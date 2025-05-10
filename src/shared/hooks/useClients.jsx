import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getClients as getClientsRequest, getProducts, saveProducts as saveProductsRequest, updateClient as updateClientRequest, deleteClient as deleteClientRequest } from "../../services";

export const useClient = () => {
    const [clients, setClients] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [total, setTotal] = useState(0);

    const getClients = async ({ limite = 12, desde = 0 }) => {
        setIsFetching(true);
        const clientData = await getClientsRequest(limite, desde);
        setIsFetching(false);
    
        if (clientData?.error) {
          console.error("Error al obtener clientes:", clientData);
          return;
        }
    
        setClients(clientData.data?.clients || []);
        setTotal(clientData.data?.total || 0);
      };


    useEffect(() => {
        getClients();
    }, []);

    const addClient = async (newClient) => {
        const result = await saveProductsRequest(newClient);

        if (result?.error) {
            console.log(result.msg);
            
            return toast.error(result.msg || 'No se pudo guardar el cliente', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            })
        }

        toast.success('Cliente guardado con exito!', {
            style: {
                background: 'green',
                color: 'white'
            }
        })

        await getClients();
    };

    const updateClient = async (id, updateClient) => {
        const result = await updateClientRequest(id, updateClient);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || 'No se pudo actualizar el cliente', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            })
        }

        toast.success('Cliente actualizado con exito!', {
            style: {
                background: 'green',
                color: 'white'
            }
        })

        await getProducts();
    }

    const deleteClient = async(id) => {

        const result = await deleteClientRequest(id);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || 'No se pudo eliminar el cliente', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            })
        }

        toast.success('Cliente eliminado con exito!', {
            style: {
                background: 'green',
                color: 'white'
            }
        })

        await getProducts();
    }


    return {
        clients,
        getClients,
        addClient,
        updateClient,
        deleteClient,
        isFetching,
        total
    }
}