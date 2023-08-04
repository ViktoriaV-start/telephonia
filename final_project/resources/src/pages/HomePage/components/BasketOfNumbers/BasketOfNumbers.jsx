import classes from "./BasketOfNumbers.module.scss";
import cn from "classnames";

import { useBasketStore } from "@/store/useBasketStore";

const BasketConditions = ({ title, value, sourceData }) => {
    const calculateSubscriptionFee = (data, key) => {
        return data.reduce((state, currentVal) => {
            state += currentVal[key].value;

            return state;
        }, 0);
    };

    return (
        <h3>
            {title}
            <span style={{ color: "#FD0101" }}>
                {" "}
                {calculateSubscriptionFee(sourceData, value)}{" "}
                <b style={{ color: "black" }}>&#x20bd;</b>
            </span>
        </h3>
    );
};

export const BasketOfNumbers = () => {
    const [basket, deleteFromBasket] = useBasketStore((state) => [
        state.basket,
        state.deleteFromBasket,
    ]);

    return (
        <section className={classes.basket}>
            <h2 className={classes.basket__title}>
                Выбрано: <span>{basket.length} из 3</span>
            </h2>

            <div className={classes.basket__info}>
                <h3>Стоимость подключения</h3>

                <div className={classes.basket__selected}>
                    {basket.map((number) => (
                        <div
                            key={number.number}
                            className={classes.basket__wrapper}
                        >
                            <div className={classes.basket__number}>
                                <span>{number.number}</span>
                                <span style={{ color: "#FD0101" }}>
                                    {number.initialPayment.value}{" "}
                                    {number.initialPayment.currency ===
                                    "RUB" ? (
                                        <b style={{ color: "black" }}>
                                            &#x20bd;
                                        </b>
                                    ) : null}
                                </span>
                            </div>

                            <button
                                onClick={() => deleteFromBasket(number)}
                                className={classes.basket__del}
                            >
                                <svg
                                    width="14"
                                    height="15"
                                    viewBox="0 0 14 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0.292893 12.4566C-0.097631 12.8471 -0.0976312 13.4803 0.292893 13.8708L0.49689 14.0748C0.887414 14.4653 1.52058 14.4653 1.9111 14.0748L6.86768 9.1182L11.8244 14.0749C12.2149 14.4654 12.8481 14.4654 13.2386 14.0749L13.4426 13.8709C13.8331 13.4804 13.8331 12.8472 13.4426 12.4567L8.48589 7.49999L13.4426 2.54331C13.8331 2.15278 13.8331 1.51962 13.4426 1.12909L13.2386 0.925096C12.8481 0.534572 12.2149 0.534571 11.8244 0.925095L6.86768 5.88178L1.91112 0.925222C1.52059 0.534697 0.88743 0.534697 0.496906 0.925221L0.292909 1.12922C-0.0976154 1.51974 -0.0976165 2.15291 0.292908 2.54343L5.24947 7.49999L0.292893 12.4566Z"
                                        fill="#020D1D"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}

                    <BasketConditions
                        title="Абонентская плата:"
                        value="licenseFee"
                        sourceData={basket}
                    />

                    <BasketConditions
                        title="Подключение:"
                        value="initialPayment"
                        sourceData={basket}
                    />
                </div>
            </div>

            <div className={classes.basket__bottom}>
                <a
                    href="#send-request"
                    className={cn({
                        [classes.disabled]: !basket.length,
                    })}
                >
                    Подключить
                </a>
            </div>
        </section>
    );
};
