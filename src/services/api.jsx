import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/blogAprendizaje/v1',
    timeout: 5000
})


apiClient.interceptors.request.use(

    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails) {
            const token = JSON.parse(useUserDetails).token
            config.headers['x-token'] = token;
            config.headers['x-token'] = token;
        }

        return config;
    },
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event('token-expired'));
        }
        return Promise.reject(error);
    }
)

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const register = async (data) => {
    try {
        const res = await apiClient.post('/auth/register', data);
        return {
            success: true,
            data: res.data
        };
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};



export const getProducts = async () => {
    try {
        return await apiClient.get('/products')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }

}

export const getCategories = async () => {
    try {
        return await apiClient.get("/categories");
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};

export const saveProducts = async (data) => {
    try {
        return await apiClient.post('/products', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const updateProducts = async (id, data) => {
    try {
        return await apiClient.put(`/products/${id}`, data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const deleteProducts = async (id, body) => {
    try {
        return await apiClient.delete(`/products/${id}`, { data: body });
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};



export const getUsers = async () => {
    try {
        return await apiClient.get('/users')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/users/${id}`)
        return response.data
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const deleteUser = async (userId) => {
    try {
        return await apiClient.delete(`/users/${userId}`)

    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getStats = async () => {
    try {
        return await apiClient.get('/products/Stats')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getPercentage = async () => {
    try {
        return await apiClient.get('/products/percentage')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getTotalC = async () => {
    try {
        return await apiClient.get('/clients/total')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getEarnings = async () => {
    try {
        return await apiClient.get('/products/earnings')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getTop = async () => {
    try {
        return await apiClient.get('/products/top')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getTop3 = async () => {
    try {
        return await apiClient.get('/products/top3')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getClients = async (limite = 12, desde = 0) => {
    try {
        return await apiClient.get(`/clients?limite=${limite}&desde=${desde}`)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const saveClients = async (data) => {
    try {
        return await apiClient.post('/clients', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const updateClient = async (id, data) => {
    try {
        return await apiClient.put(`/clients/${id}`, data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const deleteClient = async (id) => {
    try {
        return await apiClient.delete(`/clients/${id}`)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getCategory = async (limite = 10, desde = 0) => {
    try {
        return await apiClient.get(`/categories?limite=${limite}&desde=${desde}`)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const saveCategory = async (data) => {
    try {
        return await apiClient.post('/categories', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const updateCategory = async (id, data) => {
    try {
        return await apiClient.put(`/categories/${id}`, data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const deleteCategory = async (id) => {
    try {
        return await apiClient.delete(`/categories/${id}`)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getProviders = async () => {
    try {
        return await apiClient.get("/provider");
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const saveProviders = async (data) => {
    try {
        return await apiClient.post('/provider', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const updateProviders = async (id, data) => {
    try {
        return await apiClient.put(`/provider/${id}`, data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const deleteProvider = async (id) => {
    try {
        return await apiClient.delete(`/provider/${id}`)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getMovimientos = async () => {
    try {
        return await apiClient.get('/movements/')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getMovimientosByDate = async (startDate, endDate) => {
    try {
        const url = `/movements/inventoryMovements?startDate=${startDate}&endDate=${endDate}`;
        return await apiClient.get(url);
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};

export const getMovimientoEntrada = async (data) => {
    try {
        return await apiClient.post('/movements/registerEntry', data);
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};

export const getMovimientoSalida = async (data) => {
    try {
        return await apiClient.post('/movements/registerOutput', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const saveUsers = async (data) => {
    try {
        return await apiClient.post('/users', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const updateUser = async (id, data) => {
    try {
        return await apiClient.put(`/users/${id}`, data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getPublications = async () => {
    try {
        return await apiClient.get('/publications')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const addComment = async (publicationId, commentData) => {
    try {
        return await apiClient.post(`/comments`, {
            publicationC: publicationId,
            ...commentData
        });
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};