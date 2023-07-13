export function useLocalStorage<T>(key: string, initialValue?: T) {
    const setItem = (value: T) => {
        if (typeof window !== 'undefined') {
            return typeof value === 'string'
                ? localStorage.setItem(key, value)
                : localStorage.setItem(key, JSON.stringify(value));
        }
    };

    const removeItem = (key: string) => {
        if (typeof window !== 'undefined') {
            return localStorage.removeItem(key);
        }
    };

    let item: T =
        typeof window !== 'undefined' && localStorage.getItem(key)
            ? !localStorage.getItem(key)?.split('').includes(':')
                ? localStorage.getItem(key)
                : JSON.parse(localStorage.getItem(key)!)
            : initialValue;

    return { item, setItem, removeItem };
}
