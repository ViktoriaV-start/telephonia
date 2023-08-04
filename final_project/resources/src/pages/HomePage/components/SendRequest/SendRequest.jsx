import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Slide } from "../Slide";
import classes from "./SendRequest.module.scss";
import InputMask from "react-input-mask";
import { useBasketStore } from "@/store/useBasketStore";
import { SendRequestModalContent } from "../SendRequestModalContent";

export const SendRequest = ({ fetchCreate, adminId, showModal, setShowModal, modalContent }) => {
    const [data, setData] = useState(null);
    const basket = useBasketStore((state) => state.basket);

    const onChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name: client_name, phoneNumber, description } = data;

        const order = basket.map((num) => num.number).join(", ");
        const clientPhone = phoneNumber.replace(/[^+\d]/g, '');

        fetchCreate(order, client_name, clientPhone, description);
    };

    const handleModalClose = () => {
        setShowModal(false);
        document.body.style.overflow = "visible";
    }


    return (
        <Slide
            title="Отправьте заявку"
            id="send-request"
            className={classes.sendRequest}
        >
            <p className={classes.sendRequest__text}>
                Наш специалист свяжется с Вами в ближайшее время
            </p>
            <form className={classes.sendRequest__form} onSubmit={handleSubmit}>
                <div className={classes.form__wrapper}>
                    <input
                        className={classes.input_mr}
                        type="text"
                        placeholder="ФИО"
                        onChange={onChange}
                        name="name"
                        required
                        autoComplete="off"
                    />
                    <InputMask
                        type="tel"
                        mask="+\7 (999) 999-99-99"
                        placeholder="+7 (___) ___-__-__"
                        onChange={onChange}
                        name="phoneNumber"
                        pattern="^\+7 \(([1-9]{1}\d{2})\) \d{3}-\d{2}-\d{2}$"
                        title="Введите номер телефона в указанном формате: +7 (999) 999-99-99"
                        required
                        autoComplete="off"
                    />
                </div>

                {adminId && <textarea
                    className={classes.form__textarea}
                    onChange={onChange}
                    name="description"
                    autoComplete="off"
                    title="Введите комментарий"
                    maxLength="1500"
                    placeholder="Комментарий">
                </textarea>}

                <p className={classes.form__text}>
                    Нажимая кнопку, я соглашаюсь с{" "}
                    <a href="#">Политикой конфиденциальности</a>
                </p>
                <button type="submit" className={classes.form__btn}>
                    Отправить
                </button>
            </form>
            {showModal && createPortal(
                <SendRequestModalContent onClose={handleModalClose} modalContent={modalContent} />,
                document.body
            )}
        </Slide>
    );
};
