import { AdminHeader } from "@/components/AdminHeader";
import { AdminFooter } from "@/components/AdminFooter";
import { useState } from "react";
import classes from "./LoginPage.module.scss";
import { token } from "@/utils/getToken";

const applicationsLink = 'admin__link';
const managersLink = 'admin__active-link';

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    return (
        <div className={classes.wrap}>
            <AdminHeader applicationsLink={applicationsLink} managersLink={managersLink} />
            <main className={classes.container}>
                <div className={classes.login}>
                    <h1>Вход</h1>
                    <p>Пожалуйста, введите ваши данные для входа в личный кабинет</p>
                    <div>
                        <form id="auth_form" method="POST" action="/login">
                            <input
                                type="hidden"
                                name="_token"
                                value={token}
                            />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="email"
                                onChange={handleEmailChange}
                            />
                            <br/>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="пароль"
                                onChange={handlePasswordChange}
                            />

                            <div>
                                <button className={classes.form_btn} type="submit">Войти</button>
                            </div>
                        </form>
                    </div>
                    <a href="/">На главную</a>
                </div>
            </main>
            <AdminFooter />
        </div>
    );
};
