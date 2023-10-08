import axiosClient from "./axiosClient"

const categoryApi = {
    getAll(params) {
        const url = '/categories'
        return axiosClient.get(url, {params})
    },
    get(id) {
        const url = `/caregoryes/${id}`;
        return axiosClient.get(url);
    },

}