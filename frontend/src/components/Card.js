import CurrentUserContext from "../contexts/CurrentUserContext";
import trashIcon from '../img/elements/Trash.svg';
import {useContext} from "react";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    const handleClick = () => {
        onCardClick(card);
    };

    const handleDeleteClick = () => {
        onCardDelete(card);
    };

    const isOwn = card.owner === currentUser?._id;
    const isLiked = card.likes.some(i => i === currentUser?._id);
    const handleLikeClick = () => {
        onCardLike(card, currentUser);
    };

    const deleteButton = isOwn ? (
        <button type="button" className="element__trash-button" onClick={handleDeleteClick}>
            <img className="element__img-delete" src={trashIcon} alt="Кнопка удаления"/>
        </button>
    ) : null;

    const likeButtonClassName = `element__footer-button ${isLiked ? 'element__footer-button_active' : ''}`;

    return (
        <article className="element" id={card.id}>
            {deleteButton}
            <img
                src={card.link}
                alt={card.name}
                className="element__img"
                onClick={handleClick}/>
            <div className="element__footer">
                <h2 className="element__footer-text">{card.name}</h2>
                <div className="element__like-wrapper">
                    <button
                        type="button"
                        className={likeButtonClassName}
                        onClick={handleLikeClick}>

                    </button>
                    <span
                        id="element__like-counter"
                        className="element__like-counter">
                        {card.likes.length}
                    </span>
                </div>
            </div>
        </article>
    )
}

export default Card;
