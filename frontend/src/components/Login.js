import {useForm} from "../hooks/useForm";

function Login({ onLogin }) {
    const {values, handleChange, setValues} = useForm({
        email: '',
        password: '',
    });


    const resetForm = () => {
        setValues({
            email: '',
            password: '',
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        onLogin(values.email, values.password)
            .then(resetForm)
    }

    return(
        <div className="loginForm">
            <h2 className="loginForm__title">Вход</h2>
            <form onSubmit={handleSubmit}>
                <label className="loginForm__label">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="loginForm__email"
                        value={values.email || ''}
                        onChange={handleChange}
                        minLength="2"
                        maxLength="40"
                        required
                    />
                    <div className="loginForm__line"></div>
                </label>
                <label className="loginForm__label">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Пароль"
                        className="loginForm__password"
                        value={values.password || ''}
                        onChange={handleChange}
                        minLength="2"
                        maxLength="200"
                        required
                    />
                    <div className="loginForm__line"></div>
                </label>
                <button className="loginForm__button">Войти</button>
            </form>
        </div>
    )
}

export default Login