import classes from "./CreateForm.module.scss";
import cn from "classnames";

export const CreateForm = ({
                               addUser,
                               surname,
                               firstName,
                               secondName,
                               email,
                               phone,
                               password,
                               role,
                               agentId,
                               handleChangeValue,
                               clearForm,
                               errors
                            }) => {

    return (
        <>
            <section className={classes.form__wrap}>
                <div className={classes.user__container}>
                    <form className={classes.form} onSubmit={addUser}>
                        <div className={classes.form__group}>
                            <label className={classes.form__label} htmlFor="surname">Фамилия</label>
                            <div className={classes.form__grinput}>
                                <input type="text"
                                       className={classes.form__field}
                                       placeholder=""
                                       id="surname"
                                       value={surname}
                                       onChange={(event) => handleChangeValue(event,'surname')}
                                       required
                                />
                                {errors.surname && <div className={classes.form__error}>* {errors.surname}</div>}
                            </div>
                        </div>

                        <div className={classes.form__group}>
                            <label className={classes.form__label} htmlFor="first_name">Имя</label>
                            <div className={classes.form__grinput}>
                                <input type="text"
                                       className={ classes.form__field}
                                       placeholder=""
                                       id="first_name"
                                       value={firstName}
                                       onChange={(event) => handleChangeValue(event, 'first_name')}
                                />
                                {errors.first_name && <div className={classes.form__error}>* {errors.first_name}</div>}
                            </div>

                        </div>

                        <div className={classes.form__group}>
                            <label className={classes.form__label} htmlFor="second_name">Отчество</label>
                            <div className={classes.form__grinput}>
                                <input type="text"
                                       className={classes.form__field}
                                       placeholder=""
                                       id="second_name"
                                       value={secondName}
                                       onChange={(event) => handleChangeValue(event, 'second_name')}
                                />
                                {errors.second_name && <div className={classes.form__error}>* {errors.second_name}</div>}
                            </div>
                        </div>

                        <div className={classes.form__group}>
                            <label className={classes.form__label} htmlFor="email">Электронный адрес</label>
                            <div className={classes.form__grinput}>
                                <input type="text"
                                       className={classes.form__field}
                                       placeholder=""
                                       id="email"
                                       // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                       value={email}
                                       onChange={(event) => handleChangeValue(event, 'email')}
                                       required
                                />
                                {errors.email && <div className={classes.form__error}>* {errors.email}</div>}
                            </div>
                        </div>

                        <div className={classes.form__group}>
                            <label className={classes.form__label} htmlFor="phone">Телефон</label>
                            <div className={classes.form__grinput}>
                                <input type="tel"
                                       className={classes.form__field}
                                       placeholder=""
                                       id="phone"
                                    // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                       value={phone}
                                       onChange={(event) => handleChangeValue(event, 'phone')}
                                />
                                {errors.phone && <div className={classes.form__error}>* {errors.phone}</div>}
                            </div>
                        </div>

                        <div className={classes.form__group}>
                            <label className={classes.form__label} htmlFor="password">Пароль</label>
                            <div className={classes.form__grinput}>
                                <input type="text"
                                       className={classes.form__field}
                                       placeholder=""
                                       id="password"
                                       value={password}
                                       onChange={(event) => handleChangeValue(event, 'password')}
                                       required
                                />
                                {errors.password && <div className={classes.form__error}>* {errors.password}</div>}
                            </div>
                        </div>

                        <div className={classes.form__group}>
                            <label className={classes.form__label} htmlFor="role">Роль</label>
                            <div className={classes.form__grinput}>
                                <input type="text"
                                       className={classes.form__field} placeholder=""
                                       id="role"
                                       value={role}
                                       onChange={(event) => handleChangeValue(event, 'role')}
                                />
                                {errors.role && <div className={classes.form__error}>* {errors.role}</div>}
                            </div>
                        </div>

                        <div className={classes.form__group}>
                            <label className={classes.form__label} htmlFor="agent_id">ID агента</label>
                            <div className={classes.form__grinput}>
                                <input type="text"
                                       className={classes.form__field} placeholder=""
                                       id="agent_id"
                                       value={agentId}
                                       onChange={(event) => handleChangeValue(event, 'agent_id')}
                                />
                                {errors.agent_id && <div className={classes.form__error}>* {errors.agent_id}</div>}
                            </div>
                        </div>

                        <div className={classes.form__btns}>
                            <button type="button" onClick={clearForm} className={classes.form__clear}>Очистить форму</button>
                            <button type="submit" className={classes.form__button}>Сохранить</button>
                        </div>

                    </form>
                </div>
            </section>
        </>
    )
};
