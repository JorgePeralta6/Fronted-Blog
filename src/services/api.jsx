import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://backend-blog-gvf0.onrender.com/blogAprendizaje/v1',
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

export const addComment = async (data) => {
    try {
        return await apiClient.post('/comments', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const deleteComment = async (commentId) => {
    try {
        return await apiClient.delete(`/comments/${commentId}`)

    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const updateComment = async (commentId, data) => {
    try {
        return await apiClient.put(`/comments/${commentId}`, data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getPublicationsByCourse = async (course) => {
    try {
        const res = await apiClient.get(`/publications/curso?course=${course}`);
        console.log("Publicaciones por curso:", res.data);
        return res;
    } catch (e) {
        console.error("Error en getPublicationsByCourse:", e.response?.data || e);
        return {
            error: true,
            msg: e.response?.data?.message || 'Error desconocido',
            e,
        };
    }
};