import React from "react";
import closeIcon from '../img/elements/CloseIcon.svg';

function PopupWithForm({title, name, isOpen, onClose, children, onSubmit, buttonText}) {

    return (
        <section className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container-${name}`}>
                <button className="popup__button-close" type="button" onClick={onClose}>
                    <img src={closeIcon} className="popup__close-img"
                         alt="Закрыть"/>
                </button>
                <h2 className="popup__container-title">{title}</h2>
                <form className={`popup__form popup__form-${name}`} name={name} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__button-save">
                        {buttonText}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;

