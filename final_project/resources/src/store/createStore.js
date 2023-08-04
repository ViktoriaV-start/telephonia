import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const createStore = (fn, name) => {
    if (process.env.NODE_ENV === 'development') {
        return create(devtools(fn, { name }));
    }

    return create(fn);
};
