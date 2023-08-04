import cn from "classnames";
import classes from "./NumberSearch.module.scss";

export const NumberSearch = ({ searchQuery, setSearchQuery, className }) => {
    return (
        <div className={cn(classes.numberSearch, className)}>
            <input
                type="text"
                placeholder="Поиск по цифрам"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // className={className}
            />
            <div className={classes.icon__wrapper}>
                <div className={classes.icon}></div>
            </div>
        </div>
    );
};
