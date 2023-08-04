import classes from "./NumbersList.module.scss";
import cn from "classnames";

import { useBasketStore } from "@/store/useBasketStore";
import { useEffect, useState } from "react";

export const NumbersList = ({ slicedAndSearchedNumbers }) => {
    const [basket, addToBasket] = useBasketStore((state) => [
        state.basket,
        state.addToBasket,
    ]);

    const getInfoAboutNumber = (number) => {
        addToBasket(number);
    };

    const [basketNum, setBasketNum] = useState([]);

    useEffect(() => {
        const array = basket.map((item) => item.number);
        setBasketNum(array);
    }, [basket]);

    return (
        <div className={classes.numbers}>
            {slicedAndSearchedNumbers &&
                slicedAndSearchedNumbers.map((num) => (
                    <button
                        key={num.number}
                        onClick={() => getInfoAboutNumber(num)}
                        className={cn(classes.number, {
                            [classes.number__selected]: basketNum.includes(
                                num.number
                            ),
                        })}
                    >
                        {num.number}
                    </button>
                ))}
        </div>
    );
};
