import PopupWithForm from "./PopupWithForm";
import {useForm} from "../hooks/useForm";
import React, {useContext, useEffect} from "react";
import CurrentLoadContext from "../contexts/IsLoadContext";

function AddPlacePopup({isOpen, onClose, addPlace}) {
    const isLoading  = useContext(CurrentLoadContext)
    const { values, handleChange, setValues } = useForm({
        name: '',
        link: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addPlace({
            name: values.name,
            link: values.link,
        })
    };

    const resetForm = () => {
        setValues({
            name: '',
            link: '',
        })
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    return (

        <PopupWithForm
            title="Новое место"
            name="addPlace"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={isLoading ? "Сохранение..." : "Создать"}
        >
            <label className="popup__label">
                <input
                    id="place"
                    type="text"
                    name="name"
                    placeholder="Введите имя"
                    className="popup__form-info popup__form-info_input-card-name popup__input"
                    minLength="2"
                    maxLength="30"
                    onChange={handleChange}
                    value={values.name}
                    required
                />
                <span className="popup__input-error-message place-error" type="text"></span>
            </label>
            <label className="popup__label">
                <input
                    type="url"
                    id="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                    className="popup__form-info popup__form-info_input-card-ink popup__input"
                    onChange={handleChange}
                    value={values.link}
                    required
                />
                <span className="popup__input-error-message url-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;

