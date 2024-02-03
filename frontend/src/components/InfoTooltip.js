import React from "react";
import closeIcon from "../img/elements/CloseIcon.svg";

function InfoTooltip({isInfoTooltipOpen, notification, onClose}) {
    return (

        <section className={`popup popup__container-title-infotooltip ${isInfoTooltipOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container-title-infotooltip`}>
                <button className="popup__button-close" type="button" onClick={onClose}>
                    <img src={closeIcon} className="popup__close-img"
                         alt="Закрыть"/>
                </button>
                <div className={`popup__infotooltip_image-type_${notification.type}`}></div>
                <h2 className="popup__container-title-infotooltip">{notification.text}</h2>
            </div>
        </section>

    );
}

export default InfoTooltip;