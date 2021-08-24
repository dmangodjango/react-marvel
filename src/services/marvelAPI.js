import { getRequest }from './APIHandler';

export const fetchCharacters = async (params) => {
    const response = await getRequest("characters", params);
    const {status, data} = response;
    const {results, total} = data.data;
    return { results, status, total };

}