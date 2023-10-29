import axios from "axios";
import StorageKeys from "../constants/storage-keys";

export const axiosMerketClient = axios.create({
    baseURL: 'https://dev-api-pleasespeak.merket.io/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(() => localStorage.getItem(StorageKeys.TOKEN) || '')()}`
    }
})

const schoolApi = {
    async getAll(params) {

        const newParams = { ...params };
        newParams.page = !params.page || params.page < 1 ? 1 : params.page;
        const response = await axiosMerketClient.get('/schools', { params: newParams });
        // Build response and return
        console.log({schools_response: response})
        const total = response.data?.object?.total || 0;
        return {
            data: response.data?.object?.docs || [],
            pagination: {
                page: params.page,
                limit: params.limit,
                total: total
            }
        }
    },

}

export default schoolApi;
