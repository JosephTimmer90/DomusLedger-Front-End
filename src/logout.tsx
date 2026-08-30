import { useBoundStore } from "./store";

function logOut(){
    const { clearAccessToken, handleClear } = useBoundStore.getState();
    clearAccessToken();
    handleClear();
};

export default logOut;