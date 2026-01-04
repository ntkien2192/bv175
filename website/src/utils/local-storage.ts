const getDataLocalStorage = (key: string): unknown | undefined => {
    try {
        const data = localStorage.getItem(key);

        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Read from local storage', error);
    }
};

const setDataLocalStorage = (key: string, value: unknown): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Save in local storage', error);
    }
};

const removeDataLocalStorage = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('🚀 ~ removeData ~ error:', error);
    }
};

export { getDataLocalStorage, setDataLocalStorage, removeDataLocalStorage };
