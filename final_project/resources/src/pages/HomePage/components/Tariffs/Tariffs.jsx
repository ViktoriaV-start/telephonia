import classes from "./Tariffs.module.scss";
import classnames from "classnames";

export const Tariffs = () => {
    return (
        <section>

            <div className={classnames(classes.tariffs, classes.wrap)}>
                <h2 className={classes.tariffs__title}> Тарифы</h2>
                <div className={classes.tariffs__block}>

                    <div className={classes.tariffs__options}>
                        <h3 className={classes.tariffs__titlesm}> Офис Продаж</h3>

                        <div className={classes.tariffs__tbl}>
                            <div className={classes.tariffs__tbl_l}>
                                <p className={classes.tariffs__tbl_t}>Входящие на 8-800</p>
                                <p className={classes.tariffs__tbl_t}>Исходящие</p>
                                <p className={classes.tariffs__tbl_t}>Рабочие места</p>
                                <p className={classes.tariffs__tbl_t}>SIM-карты FMC</p>
                                <p className={classes.tariffs__tbl_t}>Web-виджеты на сайт</p>
                            </div>
                            <div className={classes.tariffs__tbl_r}>
                                <p className={classes.blue_nmb}>500 мин</p>
                                <p className={classes.blue_nmb}>700 мин</p>
                                <p className={classes.blue_nmb}>5</p>
                                <p className={classes.blue_nmb}>5</p>
                                <p className={classes.blue_nmb}>2</p>
                            </div>
                        </div>

                        <div className={classes.tariffs__btns}>
                            <button className={classes.tariffs__btn}>Запись разговоров</button>
                            <button className={classes.tariffs__btn}>FMC Sim-карта для бизнеса</button>
                        </div>
                        <div className={classes.tariffs__price}>
                            <div className={classes.tariffs__rub}>
                                <p className={classes.tariffs__text}>от <span className={classes.red_nmb}> 1350 </span>/мес.</p>
                                <p className={classes.tariffs__titlemin}>Абонентская плата</p>
                            </div>
                            <div className={classes.tariffs__rub}>
                                <p className={classes.tariffs__text}>от <span className={classes.red_nmb}> 1 </span> &emsp;&emsp;&nbsp;&nbsp;</p>
                                <p className={classes.tariffs__titlemin}>Подключение</p>
                            </div>
                        </div>
                        <div>
                        <a className={classes.tariffs__lnk} href="https://www.mtt.ru/services/telephony/virtualnaya-ats/?agent_referral=c6e10e29a4c3-5d08-118e-ba1a-70e26492/"  target="_blank">Подробнее</a>
                        </div>
                    </div>


                    <div className={classes.tariffs__options}>
                        <h3 className={classes.tariffs__titlesm}> Номер Городской</h3>

                        <div className={classes.tariffs__tbl}>
                            <div className={classes.tariffs__tbl_l}>
                                <p className={classes.tariffs__tbl_t}>Входящие</p>
                                <p className={classes.tariffs__tbl_t}>Исходящие</p>
                                <p className={classes.tariffs__tbl_t}>Рабочие места</p>
                                <p className={classes.tariffs__tbl_t}>SIM-карты FMC</p>
                                <p className={classes.tariffs__tbl_t}>Web-виджеты на сайт</p>
                            </div>
                            <div className={classes.tariffs__tbl_r}>
                                <p className={classes.blue_nmb}>200 мин</p>
                                <p className={classes.blue_nmb}>300 мин</p>
                                <p className={classes.blue_nmb}>3</p>
                                <p className={classes.blue_nmb}>2</p>
                                <p className={classes.blue_nmb}>2</p>
                            </div>
                        </div>

                        <div className={classes.tariffs__btns}>
                            <button className={classes.tariffs__btn}>Запись разговоров</button>
                            <button className={classes.tariffs__btn}>FMC Sim-карта для бизнеса</button>
                        </div>
                        <div className={classes.tariffs__price}>
                            <div className={classes.tariffs__rub}>
                                <p className={classes.tariffs__text}>от &nbsp;<span className={classes.red_nmb}> 299 </span>/мес.</p>
                                <p className={classes.tariffs__titlemin}>Абонентская плата</p>
                            </div>
                            <div className={classes.tariffs__rub}>
                                <p className={classes.tariffs__text}>от <span className={classes.red_nmb}> 1 </span> &emsp;&emsp;&nbsp;&nbsp;</p>
                                <p className={classes.tariffs__titlemin}>Подключение</p>
                            </div>
                        </div>
                        <div>
                        <a className={classes.tariffs__lnk} href="https://www.mtt.ru/services/telephony/abcr/?agent_referral=c6e10e29a4c3-5d08-118e-ba1a-70e26492/" target="_blank">Подробнее</a>
                        </div>
                    </div>

                </div>
                <br />
                <p>Управление тарифами доступно в личном кабинете пользователя после подключения номера телефона</p>
            </div>
        </section>
    );
};
