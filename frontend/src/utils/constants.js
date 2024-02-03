const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const formPopupAddCard = document.forms["profile-card"];
const formPopupSaveProfile = document.forms["profile-edit"];
const formPopupEditAvatar = document.forms["form-avatar"];
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__title');
const avatar = document.querySelector('.profile__img');
const buttonOpenEditAvatar = document.querySelector('.profile__avatar');


const userData = {
    name: profileName,
    about: profileJob,
    avatar: avatar
};

const apiConfig = {
    url: 'http://localhost:3000',
    headers:{
        'Content-Type': "application/json",
        //authorization: '537e2371-52bd-46f5-8e26-db05f09a40f9'
    }
}

export {
    buttonOpenEditProfilePopup,
    buttonOpenAddCardPopup,
    buttonOpenEditAvatar,
    formPopupAddCard,
    formPopupSaveProfile,
    formPopupEditAvatar,
    profileName,
    profileJob,
    userData,
    apiConfig,
    avatar
};
