import classes from "./ApplicationsPage.module.scss";
import {useEffect, useRef, useState} from "react";
import {useFetching} from "@/hooks/useFetching";
import {DataService} from "@/api/DataService";
import { Table } from "./components/Table";
import { AdminHeader } from "@/components/AdminHeader";
import { Title } from "./components/Title";
import { Pagination } from "./components/Pagination";
import { AdminFooter } from "@/components/AdminFooter";
import { GetService } from "@/api/GetService";
import {
    applicationRoute,
    gettingDataMethod,
    startingPage,
    startingSearch,
    startingColumn,
    startingOrder,
    perPage,
    linkToLogin,
    checkAdminMethod,
    checkAdminRoute,
} from "@/constants/adminConstants";


const applicationsLink = 'admin__active-link';
const managersLink = 'admin__link';

export const ApplicationsPage = () => {

    const [data, setData] = useState([]);
    const [admin, setAdmin] = useState('');
    const [adminId, setAdminId] = useState(null);
    const [adminRole, setAdminRole] = useState(null);
    const [currentPage, setCurrentPage] = useState(startingPage);
    const [pageCount, setPageCount] = useState(startingPage);
    const [order, setOrder] = useState(startingOrder);
    const [column, setColumn] = useState(startingColumn);
    const [search, setSearch] = useState(startingSearch);

    const refTop = useRef(null);
    
    const {
        fetching: fetchData,
        isLoading: isLoading,
        error: errorData,
    } = useFetching(async () => {

    const dbData = await DataService.getData(applicationRoute,
                                            gettingDataMethod,
                                            currentPage,
                                            search,
                                            column,
                                            order,
                                            perPage,
                                            adminRole,
                                            adminId);

        setPageCount(dbData.last_page);
        correctData(dbData.data);
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
        } else {
            window.location.href = linkToLogin;
        }
    });

    const correctPhone = (phone) => {
        const phoneToStr = String(phone);
        return (
            '8(' +
            phoneToStr.substring(1,4) +
            ') ' +
            phoneToStr.substring(4,7) + '-' +
            phoneToStr.substring(7,9) + '-' +
            phoneToStr.substring(9)
        );
    };

    const correctData = (dbData) => {
        if(dbData.length !==0) {
           const correctedData = [];
           dbData.map((el) => {
            const date = new Date(el.created_at);
            el.created_at = date.toLocaleDateString();

            // el.order = correctPhone(el.order);
            el.client_phone = correctPhone(el.client_phone);
            correctedData.push(el);
           });

            setData(correctedData);
       }
    };

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
        refTop.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
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
              <div className={classes.content}>
                  <AdminHeader admin={admin} adminRole={adminRole} applicationsLink={applicationsLink} managersLink={managersLink}/>
                  <main>
                      <Title handleInputChange={handleInputChange} handleButtonClick={handleButtonClick} search={search} />
                      <Table data={data}
                             handleOrderClick={handleOrderClick}
                             refTop={refTop}
                      />
                      <Pagination handlePageClick={handlePageClick}
                          currentPage={currentPage}
                          pageCount={pageCount}
                      />
                  </main>
              </div>
              <AdminFooter />
          </>
    );
};
