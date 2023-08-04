import ReactPaginate from "react-paginate";
import { useNumberStore } from "@/store/useNumberStore";
import classes from "./NumberPagination.module.scss";
import { NumbersList } from "../NumbersList";

export const NumberPagination = ({
    itemsPerPage,
    itemOffset,
    setItemOffset,
    currentPage,
    setCurrentPage,
    numbersArray,
}) => {
    const [numbers] = useNumberStore((state) => [state.numbers]);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = numbersArray.slice(itemOffset, endOffset);

    let pageCount = Math.ceil(numbersArray.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % numbersArray.length;

        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

    return (
        <>
            {!numbers.length ? (
                <span className={classes.plug}>
                    В данной категории не найдено номеров
                </span>
            ) : (
                <NumbersList slicedAndSearchedNumbers={currentItems} />
            )}

            <ReactPaginate
                breakLabel="..."
                nextLabel={<img src="/img/arrow_right.svg" alt={""} />}
                nextClassName={classes.page__wrapper_next}
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={<img src="/img/arrow_left.svg" alt={""} />}
                previousClassName={classes.page__wrapper_previous}
                renderOnZeroPageCount={null}
                containerClassName={classes.page__wrapper}
                pageClassName={classes.page__btn}
                activeClassName={classes.page__btn_active}
                forcePage={currentPage}
            />
        </>
    );
};
