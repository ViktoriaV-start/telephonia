import cn from "classnames";
import classes from "./Slide.module.scss";

export const Slide = ({ title, id, children, className }) => {
    return (
        <section className={cn(classes.slide, className)} id={id ? id : null}>
            {title && <h2 className={classes.slide__title}>{title}</h2>}
            {children}
        </section>
    );
};
