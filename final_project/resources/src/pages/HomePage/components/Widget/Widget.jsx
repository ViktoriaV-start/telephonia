import classes from "./Widget.module.scss";

import { useEffect, useMemo, useState } from "react";
import { NumberPagination } from "../NumberPagination";
import { NumberSearch } from "../NumberSearch";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useNumberStore } from "@/store/useNumberStore";
import { CustomSelect } from "@/pages/HomePage/components/UI";
import { CategoriesList } from "../CategoriesList";

export const Widget = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [city, setCity] = useState(null);

    const [
        categories,
        fetchCategoriesCity,

        isLoadingCategories,
        errorCategories,
    ] = useCategoryStore((state) => [
        state.categories,
        state.fetchCategoriesCity,

        state.isLoading,
        state.error,
    ]);

    const [numbers] = useNumberStore((state) => [state.numbers]);

    const [searchQuery, setSearchQuery] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const resetPage = () => {
        setItemOffset(0);
        setCurrentPage(0);
    };

    const slicedNumbers = useMemo(() => {
        if (selectedCity) {
            return [...numbers];
        }

        return numbers;
    }, [selectedCity, numbers]);

    const slicedAndSearchedNumbers = useMemo(() => {
        resetPage();

        return slicedNumbers.filter((num) => num.number.includes(searchQuery));
    }, [searchQuery, slicedNumbers]);

    useEffect(() => {
        fetchCategoriesCity();
    }, []);

    useEffect(() => {
        if (!city) {
            setCity(categories[0]);
        }
    }, [city, categories]);

    useEffect(() => {
        if (categories.length) {
            setCity(categories.find((city) => city.name === selectedCity));

            resetPage();
        }
    }, [selectedCity]);

    return (
        <section className={classes.widget}>
            {errorCategories && (
                <span className="error">{errorCategories}</span>
            )}

            {isLoadingCategories ? (
                <h2>Загрузка...</h2>
            ) : (
                <div>
                    <div className={classes.widget__header}>
                        <CustomSelect
                            categories={categories}
                            onChange={(e) =>
                                setSelectedCity(JSON.parse(e.target.value).name)
                            }
                        />

                        <NumberSearch
                            className={classes.widget__input}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </div>

                    <div>
                        <CategoriesList
                            categoriesStatusArray={city?.categories}
                        />

                        <NumberPagination
                            itemsPerPage={12}
                            itemOffset={itemOffset}
                            setItemOffset={setItemOffset}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            numbersArray={slicedAndSearchedNumbers}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};
