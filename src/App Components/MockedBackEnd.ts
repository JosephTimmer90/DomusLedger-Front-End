import { useBoundStore } from '../store';

async function RetrieveAccessToken(){
    const AccessToken = useBoundStore.getState().accessToken;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(AccessToken)
        }, 2000)
    })
}

export default RetrieveAccessToken;