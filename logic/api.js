export const BASE_URL = 'http://10.0.2.2:8080';

export const getBookings = async (token, page) => {
    return fetch(BASE_URL + `/bookings?active=true&page=${page}&per_page=5`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    });
};

export const deleteBooking = async (token, id) => {
    return fetch(BASE_URL + `/bookings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).then((response) => {
        if (response.ok) {
            return response;
        } else {
            throw response;
        }
    });
};

export const getCars = async (token, page, searchText) => {
    return fetch(BASE_URL + `/cars?page=${page}&per_page=5` + (searchText != undefined ? `&search_text=${searchText}` : ''), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    });
};

export const getImage = async (carId, authToken) => {
    return fetch(BASE_URL + `/cars/${carId}/imageIds`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    });
}