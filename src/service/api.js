import {api} from './services';

export const getAllArtist = () => {
    return api.get('/read');
};

export const getOneArtist = (id) => {
    return api.get(`/read/${id}`);
};

export const postArtist = (body) => {
    return api.post('/create', body);
};

export const putArtist = (id, body) => {
    return api.put(`/update?id=${id}`, body);
}

export const deleteArtist = (id) => {
    return api.delete(`/delete?id=${id}`)
}