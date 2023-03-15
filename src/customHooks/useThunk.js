import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const useThunk = (thunk) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    const runThunk = () => {
        setIsLoading(true)
        dispatch(thunk)
            .unwrap()
            .catch(err => setError(err))
            .finally(() => setIsLoading(false))
    }

    return [runThunk, isLoading, error]
}