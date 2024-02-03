import Card from "./Card";
import editImg from '../img/profile/Edit-img.svg';
import addImg from '../img/profile/add-img.svg';
import CurrentUserContext from "../contexts/CurrentUserContext";
import {useContext} from "react";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <img
                        src={currentUser ? currentUser.avatar : ''}
                        alt="Ваш аватар"
                        className="profile__img"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser ? currentUser.name : ''}</h1>
                    <p className="profile__title">{currentUser ? currentUser.about : ''}</p>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile}>
                        <img className="profile__edit-img" src={editImg}
                             alt="Редактировать"/>
                    </button>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}>
                    <img className="profile__add-img" src={addImg}
                         alt="Добавить"/>
                </button>
            </section>
            <section className="template-section">
                {cards.map((card) => (
                    <Card key={card['_id']} card={card} onCardClick={onCardClick} onCardLike={onCardLike}
                          onCardDelete={onCardDelete}/>
                ))}
            </section>
        </main>
    )
}

export default Main;

