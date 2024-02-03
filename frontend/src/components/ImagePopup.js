import React from 'react';
import closeIcon from '../img/elements/CloseIcon.svg';

function ImagePopup({ card, onClose }) {
    return (
        <section className={`popup popup-images ${card ? 'popup_opened' : ''}`}>
            <div className="popup-images__container-image">
                <img className="popup-images__image" src={card?.link} alt={card?.name} />
                <h2 className="popup-images__title">{card?.name}</h2>
                <button className="popup__button-close" type="button" onClick={onClose}>
                    <img src={closeIcon} className="popup-images__close" alt="Закрыть" />
                </button>
            </div>
        </section>
    );
}

export default ImagePopup;
