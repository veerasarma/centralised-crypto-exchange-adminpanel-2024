import React, { useState, useMemo, Fragment } from 'react'
import { CCard, CCardBody, CButton, CCardHeader, CBadge, CFormLabel } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil } from '@coreui/icons'
import { useDispatch } from 'react-redux'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import {
    StatusColumnFilter,
    PairStatusFillter,
    DateColumnFilter
} from '../../components/Table/ServerSide/columnFillter'
//import action
import { getVolBotList, cancelBot } from '../../api/spot/pair'
//import lib
import { capitalize } from '../../lib/string'
import { momentFormat } from '../../lib/date'
import { encryptString } from 'src/lib/cryptoJS'
import { toast } from '../../redux/toast/toast.action'
const Pairs = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Created At',
                accessor: 'createdAt',
                Filter: DateColumnFilter,
                Cell: ({ state, row: { original } }) => {
                    return (
                        <Fragment>
                            <CFormLabel>{momentFormat(original.createdAt)}</CFormLabel>
                        </Fragment>
                    )
                },
            },
            {
                Header: 'Pair',
                accessor: 'pair',
                // Filter: DefaultColumnFilter,
                Cell: ({ state, row: { original } }) => {
                    return `${original.firstCoin}/${original.secondCoin}`
                },
            },


            {
                Header: 'Status',
                accessor: 'status',
                Filter: StatusColumnFilter,
                Cell: ({ state, row: { original } }) => {
                    let color = original.status === 'active' ? 'success' : 'danger'
                    return (
                        <CBadge color={color} shape="rounded-pill">
                            {capitalize(original.status)}
                        </CBadge>
                    )
                },
            },
            {
                Header: 'Action',
                // Filter: DefaultColumnFilter,
                Cell: ({ state, row: { original } }) => {
                    let encryptData = encryptString(original._id, true)
                    return (
                        <>
                            <CButton
                                className="edit-btn"
                                size="sm"
                                onClick={() => history('/edit-vol-bot/' + encryptData)}
                            >
                                {' '}
                                <CIcon icon={cilPencil}></CIcon>
                            </CButton>
                        </>

                    )
                },
            },
        ],
        [],
    )
    //status
    const [data, setData] = useState([])
    const [count, setCount] = useState()
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = React.useState([])
    let dispatch = useDispatch()
    const history = useNavigate()
    const fetchPairs = async ({ pageIndex, pageSize, filters, sortBy }) => {
        setLoading(true)
        //  array of Object into object
        const fillterObj = {}
        const sortObj = {}
        sortBy.length > 0 &&
            sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

        filters.forEach(({ id, value }) => Object.assign(fillterObj, {
            [id === 'createdAt'
                ? 'fd_' + id : 'fs_' + id]: value
        }))
        let reqData = {
            page: parseInt(pageIndex),
            limit: parseInt(pageSize),
            fillter: fillterObj,
            sortObj: sortObj,
        }
        let { success, result } = await getVolBotList(reqData)
        setLoading(false)
        if (success) {
            setCount(result.count)
            setData(result.data)
        }
    }
    const forceCancel = async (botId) => {
        let { success, message, errors } = await cancelBot(botId)
        if (success) {
            toast(
                {
                    message: message,
                    type: 'success',
                },
                dispatch,
            )
            history('/volume-bot')
        } else {
            toast(
                {
                    message: message,
                    type: 'error',
                },
                dispatch,
            )
            history('/volume-bot')
        }
    }
    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CButton className="add-btn" onClick={() => history('/add-vol-bot')}>
                    <CIcon icon={cilPlus}></CIcon>Add Bot
                </CButton>
                <CButton className="add-btn" onClick={() => history('/vol-user')}>
                    <CIcon icon={cilPlus}></CIcon>Add Bot User
                </CButton>
            </CCardHeader>

            <CCardBody>
                <ServerSideTable
                    columns={columns}
                    data={data}
                    fetchData={fetchPairs}
                    pageCount={count}
                    filters={filters}
                    loading={loading}
                    setFilters={setFilters}
                />
            </CCardBody>
        </CCard>
    )
}
Pairs.propTypes = {
    row: PropTypes.any,
    state: PropTypes.any,
}

export default Pairs
