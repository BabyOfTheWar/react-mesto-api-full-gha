import '../index.css';
import './Header.js'
import React, {useEffect, useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CurrentLoadContext from "../contexts/IsLoadContext";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as apiAuthorize from "../utils/apiAuthorize";
import {getToken, removeToken, setToken} from "../utils/token";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [notification, setNotification] = useState({type: "", text: ""});
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const loggedInStatus = localStorage.getItem("loggedIn");

        if (token && loggedInStatus) {
            setToken(token);
            setLoggedIn(true);
            navigate("/");
        }
    }, [navigate]);

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltipOpen(false)
        setSelectedCard(null);
    };

    const handleUpdateAvatar = (data) => {
        setIsLoading(true);
        api.setNewAvatar(data.avatar, getToken())
            .then(res => {
                setCurrentUser(prevUser => ({
                    ...prevUser,
                    avatar: res.avatar
                }));
                closeAllPopups();
            })
            .catch(error => {
                console.error('Ошибка при обновлении аватара:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleAddCard = (data) => {
        setIsLoading(true);
        api.uploadCard(data, getToken())
            .then(newCard => {
                setCards(prevCards => [newCard, ...prevCards]);
                closeAllPopups()
            })
            .catch(error => {
                console.error('Ошибка при загрузке новой карточки:', error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleLogin = async (email, password) => {
        try {
            const response = await apiAuthorize.authorize(email, password);

            if (response.token) {
                setToken(response.token);
                setLoggedIn(true);
                setUserEmail(email);
                localStorage.setItem("token", response.token)
                localStorage.setItem("loggedIn", true);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            infoTooltip({
                type: "error",
                text: "При попытке входа возникла ошибка",
            });
        }
    };

    const infoTooltip = (info) => {
        setNotification(info);
        setIsInfoTooltipOpen(true);
    };

    const handleRegister = (email, password) => {
        return apiAuthorize
            .register(email, password)
            .then((data) => {
                if (data) {
                    infoTooltip({
                        type: "success",
                        text: "Вы успешно зарегистрировались!",
                    });
                    navigate("/sign-in", {replace: true});
                }
            })
            .catch((error) => {
                infoTooltip({
                    type: "error",
                    text: "Ошибка регистрации",
                });
                console.error('Ошибка при регистрации', error);
            });
    };

    const onSignOut = () => {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/sign-in");
    };

    function handleCardLike(card, currentUser) {
        const isLiked = card.likes.some(i => i === currentUser?._id);

        api.changeLikeCardStatus(card._id, !isLiked, getToken())
            .then(newCard => {
                setCards(prevCards => prevCards.map(c => (c._id === card._id ? newCard : c)));
            })
            .catch(error => {
                console.error('при постановке лайка:', error);
            });
    }

    function handleCardDelete(card) {

        api.deleteCard(card._id, getToken())
            .then(() => {
                setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
            })
            .catch((error) => {
                console.error('Ошибка при удалении карточки:', error);
            });
    }

    function handleUpdateUser(data) {
        api.setUserInfoApi(data, getToken())
            .then(updatedUserInfo => {
                setCurrentUser(updatedUserInfo)
                closeAllPopups();
            })
            .catch(error => {
                console.error('Ошибка при обновлении информации о пользователе:', error);
            });
    }

    useEffect(() => {
        if (loggedIn) {
            api.getUserInfoApi(getToken())
                .then((currentUserData) => {
                    setCurrentUser(currentUserData);
                })
                .catch(error => {
                    console.error('Ошибка при получении данных с сервера:', error);
                });
            api.getInitialCards(getToken())
                .then((cardData) => {
                    setCards(cardData);
                })
                .catch(console.error);
        }
    }, [loggedIn]);


    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    useEffect(() => {
        const token = getToken();

        if (token && loggedIn) {
            apiAuthorize.checkToken(token)
                .then((userData) => {
                    if (userData && userData.data && userData.data.email) {
                        setUserEmail(userData.data.email);
                        navigate("/");
                    } else {
                        console.error('Invalid user data received:', userData);
                        removeToken();
                        navigate("/sign-in");
                    }
                })
                .catch((error) => {
                    console.error('Error checking token:', error);
                    removeToken();
                    navigate("/sign-in");
                });
        }
    }, []);

    return (
        <CurrentLoadContext.Provider value={isLoading}>
            <div className="page">
                <Header
                    onSignOut={onSignOut}
                    loggedIn={loggedIn}
                    userEmail={userEmail}
                />
                <CurrentUserContext.Provider value={currentUser}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    component={Main}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    cards={cards}
                                    onSignOut={onSignOut}
                                />
                            }
                        />
                        <Route path="/sign-in" element={<Login onLogin={handleLogin}/>}/>
                        <Route
                            path="/sign-up"
                            element={<Register onRegister={handleRegister}/>}
                        />
                        <Route path="*" element={<Navigate replace to="/sign-in"/>}/>
                    </Routes>
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        addPlace={handleAddCard}
                    />
                </CurrentUserContext.Provider>
                <Footer/>

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    isInfoTooltipOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    notification={notification}
                />
            </div>
        </CurrentLoadContext.Provider>
    );
}

export default App;
