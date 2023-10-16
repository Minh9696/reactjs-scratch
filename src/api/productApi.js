import axiosClient from "./axiosClient";


const productApi = {
    async getAll(params) {

        // Transform _page to _start
        const newParams = { ...params };
        newParams._start = !params._page || params._page <= 1
        ? 0
        : (params._page - 1) * (params._limit || 50);
        // Remove un-needed key
        delete newParams._page;
        // Fetch product list + count
        const response = await axiosClient.get('/products', { params: newParams });
        const totalRespnse = await axiosClient.get('/products/count', { params: newParams });
        // Build response and return
        return {
            data: response.data,
            pagination: {
                page: params._page,
                limit: params._limit,
                total: totalRespnse.data
            }
        }
    },

}

export default productApi;