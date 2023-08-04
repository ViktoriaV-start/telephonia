import classes from "./CategoriesList.module.scss";
import cn from "classnames";

import { useEffect, useState } from "react";
import { useNumberStore } from "@/store/useNumberStore";

export const CategoriesList = ({ categoriesStatusArray = [] }) => {
    const [fetchNumbers] = useNumberStore((state) => [state.fetchNumbers]);

    const [selectedCode, setSelectedCode] = useState("");

    const setInitialData = async (code) => {
        // возможно есть решение получше
        await fetchNumbers(code);

        setSelectedCode(code);
    };

    const getNumbers = async (code) => {
        await fetchNumbers(code);

        setSelectedCode(code);
    };

    const deleteLastCategories = (categoriesArray) => {
        // Простой вариант
        // const result = [];

        // categoriesArray.forEach((elem) => {
        //     if (elem.name === "Платиновые" || elem.name === "Эксклюзивные") {
        //         return;
        //     }

        //     result.push(elem);
        // });

        // return result;

        // Изящный вариант, если конечно элементы в массиве местами не поменяются)
        return categoriesArray.filter(
            (_, idx) => categoriesArray.length - 2 > idx
        );
    };

    useEffect(() => {
        if (categoriesStatusArray[0]?.codes) {
            setInitialData(categoriesStatusArray[0]?.codes);
        }
    }, [categoriesStatusArray]);

    return (
        <>
            <div className={classes.categories}>
                {deleteLastCategories(categoriesStatusArray).map(
                    ({ name, codes }) => (
                        <button
                            key={name}
                            className={cn({
                                [classes.active]: codes === selectedCode,
                            })}
                            onClick={() => getNumbers(codes)}
                        >
                            {name}
                        </button>
                    )
                )}
            </div>
        </>
    );
};
