import classes from './Header.module.scss'

export const Header = ({ admin }) => {
    return (
        <header className={classes.wrap}>
            <div className={classes.header}>
                <div className={classes.header__logo}>
                    <a href='#'>
                        <img
                            src="./img/Logo.svg"
                            height="34px"
                            width="41px"
                        />
                        <img
                            src="./img/Logo_Teleport.svg"
                            height="35px"
                            width="254px"
                        />
                    </a>
                </div>
                {admin && admin}
                <div className={classes.header__feedback}>
                    <p>8-800 511-26-74</p>
                    <a href='#send-request'>Обратный звонок</a>
                    <div className={classes.user_name}></div>
                </div>
            </div>
        </header>
    )
}
