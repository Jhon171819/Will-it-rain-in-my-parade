import api from "./api"

export const getPosition = async ({ lat, lon }) => {
    const response  = await api.get('/dashboard', { lat, lon })

    return response.data
}