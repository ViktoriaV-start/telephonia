import { createStore } from "./createStore";
import { NumbersService } from "@/api/NumbersService";

export const useCategoryStore = createStore(
    (set) => ({
        categories: [],

        isLoading: false,
        error: "",

        fetchCategoriesCity: async () => {
            set({
                isLoading: true,
            });

            try {
                const categoryCity = await NumbersService.getNumberData(
                    "getDidNumberSetList"
                );

                const categoryNumber = await NumbersService.getNumberData(
                    "getFreeNumberSetList"
                );

                set({
                    categories: [...categoryCity, ...categoryNumber],
                    error: "",
                });
            } catch (error) {
                set({
                    categories: [],
                    error: error.message,
                });
            } finally {
                set({
                    isLoading: false,
                });
            }
        },
    }),
    "categoryStore"
);
