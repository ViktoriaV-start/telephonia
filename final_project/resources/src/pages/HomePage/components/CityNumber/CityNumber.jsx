import classes from "./CityNumber.module.scss";
import classnames from "classnames";

export const CityNumber = () => {
    var img_path='img/Group_1088';
    return (
        <section>

            <div className={classnames(classes.city_number, classes.wrap)}>
                <h2 className={classes.city_number__title}> Городской многоканальный номер</h2>
                <h3 className={classes.city_number__titlesm}> Расширяйте географию бизнеса без открытия дополнительных филиалов</h3>
                <div className={classes.city_number__block}>

                    <div className={classes.city_number__picture}>

                    </div>
                    <div className={classes.city_number__textbox}>
                        <p className={classes.city_number__text}>Ваш реальный офис может находиться в любом месте — будь то Москва, Владивосток или другой город.
                            При подключении городских телефонных номеров вы выбираете нужный вам регион.
                            Получается номер в привычном для стационарных телефонов формате: «+7 (код города) номер телефона».</p>
                        <p className={classes.city_number__text}>Для управления телефонией во всей компании и быстрого подключения к одной сети новых сотрудников и филиалов используется виртуальная АТС.
                            У ВАС широкий набор возможностей, которые позволяют сокращать расходы на связь и более эффективно работать с клиентами.
                            К сети компании можно подключить мобильные и стационарные телефоны, компьютеры, планшеты. </p>
                    </div>

                </div>
                <div className={classes.number_options}>
                    <button className={classes.number_options__btn}>
                        <img src={img_path+'7.svg'} alt="btn_img" />переадресация звонков                      
                    </button>
                    <button className={classes.number_options__btn}>
                        <img src={img_path+'8.svg'} alt="btn_img" />множество звонков одновременно
                    </button>
                    <button className={classes.number_options__btn}>
                        <img src={img_path+'9.svg'} alt="btn_img" />простое подключение
                    </button>

                </div>
            </div>

        </section>
    );
};