import ReactPaginate from "react-paginate";
import classes from "./Pagination.module.scss";

export const Pagination = ({ handlePageClick, currentPage, pageCount }) => {
  return (<>
    {/* <div className={classes.pagination}>
      <button type="button" className={classes.pagination__btn} onClick={handleBackClick}>Назад</button>
      <button type="button" className={classes.pagination__btn} onClick={handleForwardClick}>Вперед</button>
    </div> */}
    <div>
    <ReactPaginate
                    className={classes.pagination}
                    pageLinkClassName={classes.pagination__link}
                    pageClassName={classes.pagination__page}
                    nextLinkClassName={classes.pagination__btn}
                    previousLinkClassName={classes.pagination__btn}
                    activeClassName={classes.pagination__active}
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel= "<"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    forcePage={currentPage-1}
                    // forcePage={1}
                    pageCount={pageCount}
                    
                    itemsPerPage={5}
                    renderOnZeroPageCount={null}
                />
    </div>
    </>
  )
}

// className={classes.admin__pagination}
//                     pageLinkClassName={classes.admin__pagination__pages}
//                     nextLinkClassName={classes.admin__pagination__pages}
//                     previousClassName={classes.admin__pagination__pages}
//                     activeLinkClassName={classes.admin__pagination__active}
//                     breakLabel="..."
//                     nextLabel="Вперед"
//                     onPageChange={handlePageClick}
//                     pageRangeDisplayed={3}
//                     initialPage={page-1}
//                     forcePage={currentPage-1}
//                     pageCount={lastPage}
//                     previousLabel="Назад"
//                     itemsPerPage={perPage}
//                     renderOnZeroPageCount={null}