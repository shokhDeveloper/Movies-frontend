import ReactPaginate from "react-paginate"
import { PaginationInterface, ReactPaginateProps } from "../../settings/types"
import { useDispatch } from "react-redux"
import { setPageChange } from "../../settings/redux/slice"
export const Pagination:React.FC<PaginationInterface> = ({pageCount}):JSX.Element => {
    const dispatch = useDispatch();
    const handleChangePage = (evt:ReactPaginateProps) => {
        console.log(evt.selected)
        dispatch(setPageChange(evt.selected + 1))
    }
    return (    
        <ReactPaginate activeClassName="btn btn-secondary" previousClassName="btn btn-success" previousLinkClassName="text-light text-decoration-none" onClick={(evt:ReactPaginateProps):void => {
            dispatch(setPageChange(evt.selected + 1))
        }} nextClassName="btn btn-success" nextLinkClassName="text-light text-decoration-none" className="d-flex w-50 mx-auto mt-4 align-items-center justify-content-between" pageClassName="btn btn-primary" pageCount={pageCount} onPageChange={handleChangePage }/>
    )
}