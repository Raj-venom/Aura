import { useEffect, useState } from "react"
import { Alert } from "react-native"


type appWriteProps = () => Promise<any>

const useAppwrite = (fn: appWriteProps) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fn()
            setData(response)
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => fetchData()

    return { data, loading, refetch };

}

export default useAppwrite;