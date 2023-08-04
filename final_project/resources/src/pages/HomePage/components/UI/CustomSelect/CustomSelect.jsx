import classes from "./CustomSelect.module.scss";

export const CustomSelect = ({ categories = [], ...props }) => {
    return (
        <div className={classes.wrapper}>
            <select {...props} className={classes.select}>
                {categories.map((category, idx) => (
                    <option key={idx} value={JSON.stringify(category)}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
