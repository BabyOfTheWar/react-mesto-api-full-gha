import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    };

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="avatar" isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить"
        >
            <div className="popup__form">
                <input
                    id="avatar"
                    type="url"
                    name="avatar"
                    className="popup__form-info popup__form-info_input-avatar-link popup__input"
                    placeholder="Ссылка на аватар"
                    required
                    ref={avatarRef}
                />
                <span className="popup__input-error-message avatar-error" type="text"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
