import { useContext } from "react";
import { Context } from "../store/store";

const useGetContext = () => {
    const { userState, userAction, authAction, authState } = useContext(Context);
    return { userState, userAction, authAction, authState };
}

export default useGetContext;