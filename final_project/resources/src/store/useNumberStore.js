import { createStore } from "./createStore";
import { NumbersService } from "@/api/NumbersService";

export const useNumberStore = createStore(
    (set, get) => ({
        numbers: [],
        isLoading: false,
        error: "",

        searchedNumbers: [],
        setSearchedNumbers: (searchedNumbers) => {
            set({
                searchedNumbers,
            });
        },

        fetchNumbers: async (code) => {
            set({
                isLoading: true,
            });

            try {
                // if (!localStorage.getItem(`numberData_${code}`)) {
                const numberData = await NumbersService.getNumberData(
                    JSON.stringify(code)
                );

                // localStorage.setItem(
                //     `numberData_${code}`,
                //     JSON.stringify(numberData)
                // );
                // }

                // if (localStorage.getItem(`numberData_${code}`)) {
                set({
                    // numbers: JSON.parse(localStorage.getItem(`numberData_${code}`)),
                    numbers: numberData,
                    error: "",
                });
                // }
            } catch (error) {
                set({
                    numbers: [],
                    error: error.message,
                });
            } finally {
                set({
                    isLoading: false,
                });
            }
        },

        clearNumberArray: () => {
            set({
                numbers: [],
            });
        },
    }),
    "numberStore"
);
