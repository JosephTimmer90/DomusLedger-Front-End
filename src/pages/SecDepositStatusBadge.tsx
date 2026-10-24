import type { newSecDeposit } from "../secDepositsSlice";
import ProcessSecDepositReturnForm from "./ProcessSecDepositReturnForm";

type SecDepositStatusBadgeProps = {
    deposit: newSecDeposit;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

function SecDepositStatusBadge({deposit, isOpen, onOpen, onClose}: SecDepositStatusBadgeProps) {

    const displayProcessReturnFormButton = deposit.status === 'Held';
    const secDepositStyle: string = "w-50 h-10 border-2 rounded-[20px] flex items-center justify-center"
    type SecDepositStatus = "Held" | "Returned";

    const secDepositStatus: Record<SecDepositStatus, string> = {
        Held: `bg-yellow-600 ${secDepositStyle}`,
        Returned: `bg-green-600 ${secDepositStyle}`,
    };

    return(
        <>
            <div className={secDepositStatus[deposit.status as SecDepositStatus]}>
                {displayProcessReturnFormButton && 
                    <button onClick={onOpen} className="cursor-pointer text-black">{deposit.status === 'Held' ? 'Process Return Form' : 'Returned'}</button>}
                {!displayProcessReturnFormButton && <p className="text-black">Returned</p>}
            </div>
            <div className="absolute top-50 left-50">
                {isOpen && <ProcessSecDepositReturnForm id={deposit.id} leaseId={deposit.leaseId} secDepositCents={deposit.secDepositCents} onClose={onClose}/>}
            </div>
        </>

    )
}

export default SecDepositStatusBadge;
