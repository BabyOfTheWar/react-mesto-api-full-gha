import {Link, useNavigate} from "react-router-dom";
import {useForm} from "../hooks/useForm";

function Register({onRegister}) {
    const {values, handleChange, setValues} = useForm({
        name: '',
        about: '',
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        onRegister(values.email, values.password)
            .then(() => {
                navigate("/sign-in");
            });
    };

    return (
        <div className="registerForm">
            <h2 className="registerForm__title">Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <label className="registerForm__label">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="registerForm__email"
                        value={values.email || ''}
                        onChange={handleChange}
                        minLength="2"
                        maxLength="40"
                        required
                    />
                    <div className="registerForm__line"></div>
                </label>
                <label className="registerForm__label">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Пароль"
                        className="registerForm__password"
                        value={values.password || ''}
                        onChange={handleChange}
                        minLength="2"
                        maxLength="200"
                        required
                    />
                    <div className="registerForm__line"></div>
                </label>
                <button className="registerForm__button-signup">Зарегистрироваться</button>
                <p className="registerForm__text">
                    Есть аккаунт?{" "}
                    <Link to="/sign-in" className="registerForm__login">
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
