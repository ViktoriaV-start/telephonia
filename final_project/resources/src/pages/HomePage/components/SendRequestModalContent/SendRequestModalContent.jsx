import classes from "./SendRequestModalContent.module.scss";

export const SendRequestModalContent = ({ onClose, modalContent }) => {
    return (
        <div className={classes.background} onClick={onClose}>
            <div className={classes.modal} onClick={e => e.stopPropagation()}>
                <p>{modalContent}</p>
                <button type="button" onClick={onClose}>Закрыть</button>
            </div>
        </div>

    );
};
