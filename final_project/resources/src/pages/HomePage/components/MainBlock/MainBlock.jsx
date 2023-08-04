import classes from "./MainBlock.module.scss";

export const MainBlock = () => {
    const linesCount = 3;
    let linesArr = [];
    for (let i = linesCount; i >= 0; i--) {
        let lineClassName = "main_block__line_" + i;
        linesArr.push(<img
            className={classes[lineClassName]}
            src="./img/Rectangle_2508.svg"
            height="662px"
            width="818px"
        />);
    }

    return (
        <section>
            <div className={classes.main_block}>
                {linesArr}
                <div className={classes.main_block__info}>
                    <h1>Номер 8-800 для бизнеса</h1>
                    <p className={classes.main_block__tagline}>Расширяйте <br /><span>географию бизнеса</span></p>
                    <div className={classes.main_block__prices}>
                        <div className={classes.left}>
                            <p><span>от <span>О</span> ₽</span> <br /> Подключение</p>
                        </div>
                        <div className={classes.right}>
                            <p><span>от <span>299</span> ₽/мес.</span> <br /> Абонентская плата</p>
                        </div>
                    </div>
                    <a href="#choose-number">Выбрать номер</a>
                </div>
            </div>
        </section>
    );
};
