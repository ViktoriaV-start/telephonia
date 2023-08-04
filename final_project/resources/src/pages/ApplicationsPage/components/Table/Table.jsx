import classes from "./Table.module.scss";
import cn from "classnames";

export const Table = ({
                          data,
                          handleOrderClick,
                          refTop,
                    }) =>
    {
        return (
            <section className="admin__container">
                <div className={classes.table__wrap}>
                    <table className={classes.table}>
                        <thead>
                            <tr className={classes.table__header} ref={refTop}>
                                <td className={classes.table__text + ' ' +  classes.table__btn}
                                    onClick={() => {handleOrderClick('status')}}
                                >
                                    <span>Статус</span>
                                    <svg className={classes.table__icon} width="18" height="18" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>
                                </td>
                                <td className={classes.table__text}>Заявка на номер</td>
                                <td className={classes.table__text + ' ' +  classes.table__btn}
                                    onClick={() => {handleOrderClick('client_name')}}
                                >
                                    <span>Клиент</span>
                                    <svg className={classes.table__icon} width="18" height="18" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>
                                </td>
                                <td className={classes.table__text}>Контактный телефон клиента</td>
                                <td className={classes.table__text}>Комментарий</td>
                                <td className={classes.table__text}>#ID партнера</td>
                                <td className={classes.table__text  + ' ' +  classes.table__btn}
                                    onClick={() => {handleOrderClick('surname')}}
                                >
                                    <span>Сотрудник</span>
                                    <svg className={classes.table__icon} width="18" height="18" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>
                                </td>
                                <td className={classes.table__text}>Контактный телефон сотрудника</td>
                                <td className={classes.table__text + ' ' + classes.table__pr + ' ' +  classes.table__btn}
                                    onClick={() => {handleOrderClick('created_at')}}
                                >
                                    <span>Дата заявки</span>
                                    <svg className={classes.table__icon} width="18" height="18" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>
                                </td>
                            </tr>
                        </thead>

                        <tbody>
                            {data?.map((el) => (
                                <tr key={el.id} className={classes.table__tr}>
                                    <td key={el.id} className={classes.table__data + ' '
                                                        + cn({[classes.table__bgr]: el.status === 'отказано'})
                                                        + cn({[classes.table__bgg]: el.status === 'подтверждено'})
                                                        + cn({[classes.table__bgb]: el.status === 'в работе'})
                                                    }
                                    >
                                        {el.status ?? ''}
                                    </td>
                                    <td key={el.id} className={classes.table__data + ' ' + classes.table__minw + ' '}>
                                        {el.order ?? ''}
                                    </td>
                                    <td key={el.id} className={classes.table__data}>{el.client_name}</td>
                                    <td key={el.id} className={classes.table__data}>{el.client_phone}</td>
                                    <td key={el.id} className={classes.table__data  + ' ' + classes.table__description}>
                                        {el.description}
                                    </td>
                                    <td key={el.id} className={classes.table__data}>{el.partner_id}</td>
                                    <td key={el.id} className={classes.table__data + ' ' + (!el.user_id && classes.table__null)}>
                                      {el.user_id ?
                                       el.surname + ' ' + el.first_name :
                                       '---'}
                                      </td>
                                    <td key={el.id} className={classes.table__data}>{el.phone}</td>
                                    <td key={el.id} className={classes.table__data}>{el.created_at}</td>
                                </tr>
                            ))}
                        </tbody>

                        <tfooter>
                            <tr className={classes.table__footer}></tr>
                        </tfooter>

                    </table>
                </div>
            </section>
        )
    };

