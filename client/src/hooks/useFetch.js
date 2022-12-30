import { useState, useEffect } from "react";
// import { showAlert } from "../utils/alert";

const useFetch = (apiFunction, obj = {}, isInitiallyCalled = true) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        isInitiallyCalled && fetchData();
    }, []);

    const fetchData = async (options) => {
        setIsLoading(true);
        setIsFetched(false);
        try {
            const response = await apiFunction(options ? options : obj);
            if (response.Error) {
                setHasError(true);
                setError(response.Error);
                // showAlert.errorAlert(response.Error);
            } else {
                setData(response);
            }
            setIsLoading(false);
            setIsFetched(true);
        } catch (error) {
            setError(error.message);
            setHasError(true);
            setIsLoading(false);
            setIsFetched(true);
        }
    };

    return { data, isLoading, isFetched, hasError, error, fetchData };
};

export default useFetch;
