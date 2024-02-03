import PopupWithForm from './PopupWithForm';
import CurrentUserContext from "../contexts/CurrentUserContext";
import {useForm} from "../hooks/useForm";
import React, {useContext, useEffect} from "react";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const {values, handleChange, setValues} = useForm({
        name: '',
        about: '',
    });

    useEffect(() => {
        if (currentUser) {
            setValues(currentUser);
        }
    }, [currentUser, isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser(values);
    };

    return (

        <PopupWithForm
            title="Редактировать профиль"
            name="edit"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить"
        >
            <div className="popup__form">
                <label className="popup__label">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={values.name || ''}
                        onChange={handleChange}
                        placeholder="Введите имя"
                        className="popup__form-info popup__form-info_input_name popup__input" minLength="2"
                        maxLength="40" required
                    />
                    <span className="popup__input-error-message name-error"></span>
                </label>
                <label className="popup__label">
                    <input id="title"
                           type="text"
                           name="about"
                           placeholder="Введите профессию"
                           value={values.about || ''}
                           onChange={handleChange}
                           className="popup__form-info popup__form-info_input_title popup__input" minLength="2"
                           maxLength="200" required
                    />
                    <span className="popup__input-error-message title-error"></span>
                </label>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
