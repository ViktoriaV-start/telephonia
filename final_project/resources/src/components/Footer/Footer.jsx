import classes from './Footer.module.scss'

export const Footer = () => {
    return (
        <footer className={classes.wrap}>
            <div className={classes.footer}>
                <div className={classes.footer__logo}>
                    <a href='#'>
                        <img
                            src="./img/Logo_White.svg"
                            height="35px"
                            width="41px"
                        />
                        <img
                            src="./img/Logo_Teleport_White.svg"
                            height="35px"
                            width="235px"
                        />
                    </a>
                </div>
                <p>Звонок бесплатный <br /> <span>8-800 511-26-74</span></p>
                <p>Консультация по услугам <br /> <span>info@mtt.ru</span></p>
            </div>

        </footer>
    )
}
