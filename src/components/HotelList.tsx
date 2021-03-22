import React, { useState } from 'react'
import '../css/hotel.css'
import { HotelItem } from './HotelItem'
import { connect } from 'react-redux'
import { Pagination } from './Pagination'
import { IHoltelItem } from '../store/reducers'
import { RootState } from '../store'

interface HotelListProps {
    hotels: Array<IHoltelItem>
    filteredHotels: Array<IHoltelItem>
}

const mapStateToProps = (state: RootState) => {
    const { hotels, filteredHotels } = state.filter
    return {
        hotels,
        filteredHotels,
    }
}

function HotelList(props: React.PropsWithChildren<HotelListProps>) {
    const { hotels, filteredHotels } = props

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(3)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = filteredHotels.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    if (filteredHotels.length) {
        return (
            <main>
                <HotelItem filteredHotels={currentPosts} />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={filteredHotels.length}
                    paginate={paginate}
                />
            </main>
        )
    } else {
        return <h1>Записей не найдено</h1>
    }
}

export default connect(mapStateToProps, null)(HotelList)
