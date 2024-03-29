export const BASE_URL = 'http://localhost:3000';

function checkResponse (res) {
    if (res.ok) {
        return res.json();
    }
    throw new Error('Что-то пошло не так');
}

export const register = (email, password) => {
        return fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        .then(checkResponse)
}

export const authorize = (email, password) => {
        return fetch(`${BASE_URL}/signin`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        .then(checkResponse)
}

export const checkToken = (token) => {
        return fetch(`${BASE_URL}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(checkResponse)
}

