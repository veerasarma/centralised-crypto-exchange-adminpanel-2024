import React, { useMemo, useState, Fragment } from 'react'
import { CCard, CCardBody, CFormLabel } from '@coreui/react'
import { useParams } from 'react-router-dom'
import ServerSideTable from '../../components/Table/ServerSide'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'


//import lib
import { momentFormat } from '../../lib/date'
import { decryptString } from '../../lib/cryptoJS'
//import api
import { getLoginHist } from 'src/api/user'
import {
    DateColumnFilter,
} from '../../components/Table/ServerSide/columnFillter'
//import action
import { toast } from '../../redux/toast/toast.action'

const List = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'createdDate',
                Filter: DateColumnFilter,
                Cell: ({ state, row: { original } }) => {
                    return (
                        <Fragment>
                            <CFormLabel>{momentFormat(original.createdDate)}</CFormLabel>
                        </Fragment>
                    )
                },
            },
            {
                Header: 'IP',
                accessor: 'ipaddress',
                // Filter: DefaultColumnFilter,
            },
            {
                Header: 'Country Name',
                accessor: 'countryName',
                // Filter: DefaultColumnFilter,
            },
        ],

        [],
    )
    const dispatch = useDispatch()
    //state
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const [filters, setFilters] = React.useState([])
    const [filterState, setFilterState] = useState({})
    const params = useParams()
    //function
    const fetchFaqData = async ({ pageIndex, pageSize, filters, sortBy, type }) => {
        try {
            setFilterState({
                pageIndex: pageIndex,
                pageSize: pageSize,
                sortBy: sortBy,
                filters: filters,
                type: type,
            })

            //  array of Object into object
            const fillterObj = {}
            const sortObj = {}
            sortBy.length > 0 &&
                sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))
            filters.forEach(({ id, value }) =>
                Object.assign(fillterObj, {
                    [id == 'createdDate'
                        ? 'fd_' + id
                        :
                        'fs_' + id
                    ]: value,
                }),
            )

            setFilterState((state) => ({ ...state, ['fillterObj']: fillterObj, ['sortObj']: sortObj }))

            let reqData = {
                page: parseInt(pageIndex),
                limit: parseInt(pageSize),
                fillter: fillterObj,
                sortObj: sortObj,
                type,
                userId: decryptString(params.id, true),
            }
            const { success, result, errors } = await getLoginHist(reqData)
            if (success) {
                setData(result.data)
                setCount(result.count)
                setdownloadDisable(false)
            } else {
                setdownloadDisable(true)

                toast(
                    {
                        message: errors.date,
                        type: 'error',
                    },
                    dispatch,
                )
            }
        } catch (err) {
            console.log('err: ', err);

        }
    }
    return (
        <CCard className="mb-4">
            <CCardBody>
                <ServerSideTable
                    columns={columns}
                    data={data}
                    fetchData={fetchFaqData}
                    loading={loading}
                    pageCount={count}
                    filters={filters}
                    // setFilters={setFilters}
                    filterState={filterState}
                />
            </CCardBody>
        </CCard>
    )
}

List.propTypes = {
    row: PropTypes.any,
    state: PropTypes.any,
}

export default List
