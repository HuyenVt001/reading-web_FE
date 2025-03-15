import httpRequest from "../utils/httpRequest";

const searchApi = () => {
    const searchByKeyword = async (order, page, keyword) => {
        try {
            const res = await httpRequest.post(`/search/${order}/${page}`, { keyword });

            return { status: res.status, data: res.data };
        } catch (error) {
            console.log(error);
        }
    };

    const searchByGenre = async (order, page, genreName) => {
        try {
            const res = await httpRequest.post(`/search/${genreName}/${order}/${page}`, {});

            return { status: res.status, data: res.data };
        } catch (error) {
            console.log(error);
        }
    };

    return {
        searchByKeyword,
        searchByGenre
    };
};

export default searchApi;