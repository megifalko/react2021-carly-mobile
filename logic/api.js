import {Car} from "../objects/Car";

const BASE_URL = 'http://localhost:8080';

export const getCars = async (securityToken) => {

    return fetch(`${BASE_URL}/cars`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'security-header': securityToken
            }
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const getCarsWithParams = async (page, carsPerPage, securityToken) => {

    return fetch(`${BASE_URL}/cars?page=${page}&per_page=${carsPerPage}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'security-header': securityToken
            }
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const getCar = async (id, securityToken) => {

    return fetch(`${BASE_URL}/cars/${id}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'security-header': securityToken
            }
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const addCar = async (car, securityToken) => {

    return fetch(`${BASE_URL}/cars/${car.id}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'security-header': securityToken
            },
            body: JSON.stringify([car])
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const updateCar = async (car, securityToken) => {

    return fetch(`${BASE_URL}/cars/${car.id}`,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'security-header': securityToken
            },
            body: JSON.stringify(car)
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const deleteCar = async (id, securityToken) => {

    return fetch(`${BASE_URL}/cars/${id}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'security-header': securityToken
            },
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const getImagesIds = async (carId, securityToken) => {

    return fetch(`${BASE_URL}/cars/${carId}/imageIds`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'security-header': securityToken
            },
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const imageUri = (imageId) => {
    return `${BASE_URL}/images/${imageId}`
}