import { useEffect } from 'react';
import { useBoundStore } from '../store';
import RetrieveAccessToken from './MockedBackEnd';


let newDataMessage:any = await RetrieveAccessToken();

function GenericComponent() {
    const dataMessage = useBoundStore((state) => state.dataMessage);
    const updateDataMessage = useBoundStore((state) => state.updateDataMessage);

    useEffect(() => {
        
        updateDataMessage(newDataMessage);
    }, [updateDataMessage]);

    return <p>{dataMessage}</p>;
}

export default GenericComponent;