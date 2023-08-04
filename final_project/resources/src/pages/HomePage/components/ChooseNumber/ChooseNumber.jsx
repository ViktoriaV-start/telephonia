import { BasketOfNumbers } from "../BasketOfNumbers";
import { Slide } from "../Slide";
import { Widget } from "../Widget";
import classes from "./ChooseNumber.module.scss";

export const ChooseNumber = () => {
    return (
        <Slide
            title="Подобрать номер"
            className={classes.chooseNumber}
            id="choose-number"
        >
            <div className={classes.chooseNumber__wrapper}>
                <Widget />
                <BasketOfNumbers />
            </div>
        </Slide>
    );
};
