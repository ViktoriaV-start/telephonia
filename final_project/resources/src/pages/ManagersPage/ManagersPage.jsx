import classes from "./ManagersPage.module.scss";
import {useEffect, useState, useRef} from "react";
import {useFetching} from "@/hooks/useFetching";
import {DataService} from "@/api/DataService";
import { AdminHeader } from "@/components/AdminHeader";
import {CreateService} from "@/api/CreateService";
import { token } from "@/utils/getToken";
import { Pagination } from "../ApplicationsPage/components/Pagination";
import { AdminFooter } from "@/components/AdminFooter";
import {GetService} from "@/api/GetService";
import {checkAdminMethod, checkAdminRoute, linkToLogin} from "@/constants/adminConstants";
import { ManagersList } from "./components/ManagersList";
import { ManagerProfile } from "./components/ManagerProfile";

const managersData = '/admin/managers';
const method = 'getManagers'
    // здесь потом сами переукомплектуете как нравится
const startingPage = 1  // номер необходимой страницы
const startingSearch = '' // значения строки ввода для поиска
const startingColumn = 'surname' // column: 'name' // название сортируемого столбца
const startingOrder = 'desc' // order: 'desc', // 'asc', 'desc'
const perPage = 8 // количество строк на странице
const applicationsLink = 'admin__link';
const managersLink = 'admin__active-link';

export const ManagersPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(startingPage);
    const [pageCount, setPageCount] = useState(startingPage);
    const [order, setOrder] = useState(startingOrder);
    const [column, setColumn] = useState(startingColumn);
    const [search, setSearch] = useState(startingSearch);
    const [admin, setAdmin] = useState(null);
    const [adminRole, setAdminRole] = useState(null);
    const [adminId, setAdminId] = useState(null);
    const [adminData, setAdminData] = useState({});

    const focusEl = useRef(null);

    const {
        fetching: fetchData,
        isLoading: isLoading,
        error: errorData,
    } = useFetching(async () => {
        const dbData = await DataService.getData(managersData, method, currentPage, search, column, order, perPage);
        setPageCount(dbData.last_page);
        setData(dbData.data);
    });

    const {
        fetching: checkUser,
        isLoading: loading,
        error: checkError,
    } = useFetching(async () => {
        const authedUser = await GetService.getData(checkAdminRoute, checkAdminMethod);
        if(authedUser.status) {
            setAdmin(authedUser.name + ' ' + authedUser.surname);
            setAdminId(authedUser.id);
            setAdminRole(authedUser.role);
            setAdminData(authedUser.adminData);
        } else {
            window.location.href = linkToLogin;
        }
    });

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
        focusEl.current.scrollIntoView({
          behavior: 'smooth',
          block:    'nearest',
          inline:   'start'
        });
    }

    const handleOrderClick = (option) => {
        (order !== 'asc') ? setOrder('asc') : setOrder('desc');
        if(column !== option) setColumn(option);
    }

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

      const handleButtonClick = () => {
        setSearch(startingSearch);
    };

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        fetchData();
    }, [adminRole, adminId]);

    useEffect(() => {
        setCurrentPage(startingPage);
        fetchData();
    }, [search]);

    useEffect(() => {
        fetchData();
    }, [currentPage, column, order]);

    return (
        <>
            <div className={classes.admin}>
                <AdminHeader admin={admin} adminRole={adminRole} applicationsLink={applicationsLink} managersLink={managersLink}/>

                <main>
                    <section className={classes.managers__wrap}>
                        <div className={'admin__container' + ' ' + classes.admin__title}>
                            {(adminRole === 'agent') ?
                                [
                                    <h1 className={classes.managers__header}>Администрирование - Список менеджеров</h1>,
                                    <a href="/admin/managers/create" className={classes.admin__link}>Добавить сотрудника</a>,
                                    <div className={classes.search}>
                                        <svg className={classes.search__icon} width="35" height="35" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/></svg>
                                        <div className={classes.search__box}>
                                            <input onChange={handleInputChange} className={classes.search__input} type="text" placeholder="Поиск..." value={search} />
                                            <svg onClick={handleButtonClick} class={classes.search__clear} height="20" width="20" viewBox="0 0 512 512"><path class="cart__dlt" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
                                        </div>
                                    </div>
                                ]
                            : <h1 className={classes.managers__header}>Администрирование - Профиль</h1>
                            }
                        </div>
                    </section>

                    <section className={classes.container}>
                        <div className={classes.table__wrap}>
                        <table className={classes.table}>
                            <thead>
                                <tr className={classes.table__header} ref={focusEl}>
                                <td className={classes.table__text  + ' ' +  classes.table__btn}
                                    onClick={() => {handleOrderClick('id')}}
                                >
                                    <span>ID</span>
                                    <svg className={classes.table__icon} width="18" height="18" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>
                                </td>
                                <td className={classes.table__text}>Имя</td>
                                <td className={classes.table__text}>Фамилия</td>
                                <td className={classes.table__text}>Почта</td>
                                <td className={classes.table__text}>Телефон</td>
                                <td className={classes.table__text}>ID агента</td>
                                <td className={classes.table__text}>ID менеджера</td>
                                <td className={classes.table__text}>Роль</td>
                                <td className={classes.table__text  + ' ' +  classes.table__btn}
                                    onClick={() => {handleOrderClick('status')}}
                                >
                                    <span>Статус</span>
                                    <svg className={classes.table__icon} width="18" height="18" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>
                                </td>
                                <td className={classes.table__text  + ' ' +  classes.table__btn}
                                    onClick={() => {handleOrderClick('created_at')}}
                                >
                                    <span>Создано</span>
                                    <svg className={classes.table__icon} width="18" height="18" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>
                                </td>
                                <td className={classes.table__text + ' ' + classes.table__pr}>Сервис</td>
                                </tr>
                            </thead>
                            {adminRole === 'agent' ? <ManagersList data={data} token={token}/>
                                                   : <ManagerProfile adminData={adminData} token={token}/>
                            }
                        </table>
                        {adminRole === 'agent' ? <Pagination handlePageClick={handlePageClick}
                                    currentPage={currentPage}
                                    pageCount={pageCount}/>
                        : null}
                        
                        </div>
                    </section>
                </main>
            </div>
            <AdminFooter />
        </>
    );
};
