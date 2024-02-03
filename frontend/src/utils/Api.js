import {apiConfig} from "./constants";

class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    changeLikeCardStatus(cardId, isLiked, token) {
        if (isLiked) {
            return this.likeCard(cardId, token)
                .then(updatedCard => {
                    return updatedCard;
                })
                .catch(error => {
                    console.error('Error liking card:', error);
                    throw error;
                });
        } else {
            return this.dislikeCard(cardId, token)
                .then(updatedCard => {
                    return updatedCard;
                })
                .catch(error => {
                    console.error('Error disliking card:', error);
                    throw error;
                });
        }
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getInitialCards(token) {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._checkStatus(res));
    }

    getUserInfoApi(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._checkStatus(res));
    }

    setUserInfoApi(data, token) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        })
            .then(res => this._checkStatus(res))
    }

    uploadCard(data, token) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        })
            .then(res => this._checkStatus(res))
    };

    deleteCard(id, token) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._checkStatus(res))
    }

    likeCard(id, token) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                console.log('Лайк:', res.status, res.statusText);
                console.log('Лайк Response:', res);
                return this._checkStatus(res);
            });
    }

    dislikeCard(id, token) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                console.log('Дизлайк:', res.status, res.statusText);
                console.log('Дизлайк Response:', res);
                return this._checkStatus(res);
            });
    }


    setNewAvatar(data, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: data,
            }),
        })
            .then(res => this._checkStatus(res))
    }
}

const api = new Api(apiConfig);

export {api}
