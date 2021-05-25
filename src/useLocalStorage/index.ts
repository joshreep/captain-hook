import { SetStateAction, useState } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    function setValue(value: SetStateAction<T>) {
        try {
            if (value instanceof Function) {
                setStoredValue((prev) => {
                    const valueToStore = value(prev)
                    window.localStorage.setItem(key, JSON.stringify(valueToStore))
                    return valueToStore
                })
            } else {
                window.localStorage.setItem(key, JSON.stringify(value))
                setStoredValue(value)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return [storedValue, setValue] as const
}
