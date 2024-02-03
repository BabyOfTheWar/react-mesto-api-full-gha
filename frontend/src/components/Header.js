import headerLogo from '../img/header/logo.svg';
import {Link, useLocation} from 'react-router-dom'

function Header({loggedIn, userEmail, onSignOut}) {
    const location = useLocation();
    return (
        <header className="header">
            <a href="src/components/App#">
                <img src={headerLogo} className="header__logo" alt="Место"/>
            </a>
            {loggedIn ? (
                <>
                    <p className="header__login">{userEmail}</p>
                    <Link to="/sign-in" className="header__logout" onClick={onSignOut}>Выйти</Link>
                </>
            ) : (
                <>
                    {location.pathname.includes('sign-in') &&
                        <Link to="/sign-up" className="header__signin">Регистрация</Link>}
                    {location.pathname.includes('sign-up') &&
                        <Link to="/sign-in" className="header__signup">Войти</Link>}
                </>
            )}
        </header>
    )
}

export default Header