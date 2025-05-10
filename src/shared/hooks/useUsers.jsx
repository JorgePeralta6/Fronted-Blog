import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getUsers as getUsersRequest, saveUsers as saveUsersRequest, updateUser as updateUserRequest, deleteUser as deleteUserRequest } from "../../services";

export const useUser = () => {
    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [total, setTotal] = useState(0);

    const getUsers = async ({ limite = 12, desde = 0 }) => {
        setIsFetching(true);
        const userData = await getUsersRequest(limite, desde);
        setIsFetching(false);
    
        if (userData?.error) {
          console.error("Error al obtener usuarios:", userData);
          return;
        }
    
        setUsers(userData.data?.users || []);
        setTotal(userData.data?.total || 0);
      };

    useEffect(() => {
        getUsers();
    }, []);

    const addUser = async (newUser) => {
        const result = await saveUsersRequest(newUser);

        if (result?.error) {
            console.log(result.msg);
            return toast.error(result.msg || 'No se pudo guardar el usuario');
        }

        toast.success('Usuario guardado con éxito!');

        await getUsers();
    };

    const updateUser = async (id, updatedUser) => {
        const result = await updateUserRequest(id, updatedUser);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || 'No se pudo actualizar el usuario');
        }

        toast.success('Usuario actualizado con éxito!');

        await getUsers();
    };

    const deleteUser = async(id) => {
        const result = await deleteUserRequest(id);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || 'No se pudo eliminar el usuario');
        }

        toast.success('Usuario eliminado con éxito!');

        await getUsers();
    }

    return {
        users,
        getUsers,
        addUser,
        updateUser,
        deleteUser,
        isFetching,
        total
    }
}
