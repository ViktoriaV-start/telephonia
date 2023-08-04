import { createStore } from "./createStore";

export const useBasketStore = createStore(
    (set, get) => ({
        basket: [],

        addToBasket: (number) => {
            const { basket } = get();

            if (basket.length < 3 && !basket.includes(number)) {
                set({
                    basket: [...basket, number],
                });
            }
        },

        deleteFromBasket: (number) => {
            const { basket } = get();

            console.log("number", number);

            set({
                basket: basket.filter((num) => num.number !== number.number),
            });
        },
    }),
    "basketStore"
);
