import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateUser, getUsers } from "../../services";

export const useUserSettings = (userId) => {
    const [userSettings, setUserSettings] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const fetchUserSettings = async () => {
        setIsFetching(true);
        const response = await getUsers();
        setIsFetching(false);

        if (response.error) {
            toast.error(response.msg || 'Ocurrió un error al obtener los datos del usuario');
            return;
        }

        const userList = Array.isArray(response.data) ? response.data : response.data.users || [];

        const user = userList.find(u => u._id === userId);

        if (!user) {
            toast.error('Usuario no encontrado');
            return;
        }

        setUserSettings({
            id: user._id,
            email: user.email,
            name: user.name,
            password: user.password,
            phone: user.phone,
            surname: user.surname,
            username: user.username
        });
    };

    const saveSettings = async (data) => {
        const userData = {
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            password: data.password,
            phone: data.phone
        };

        const response = await updateUser(data._id, userData);

        if (response.error) {
            toast.error(response.msg || 'Ocurrió un error al actualizar la información del usuario', {
                style: { background: 'red', color: 'white' }
            });
            return;
        }

        toast.success('Información actualizada correctamente', {
            style: { background: 'green', color: 'white' }
        });

        await fetchUserSettings();
    };

    useEffect(() => {
        if (userId) {
            fetchUserSettings();
        }
    }, [userId]);

    return {
        isFetching: isFetching || !userSettings,
        userSettings,
        saveSettings
    };
};
