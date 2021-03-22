import React from 'react'
import { IHoltelItem } from '../store/reducers'

interface HotelItemProps {
    filteredHotels: Array<IHoltelItem>
}

export const HotelItem: React.FC<HotelItemProps> = ({ filteredHotels }) => {
    return (
        <ul className="grid">
            {filteredHotels.map((hotel, i) => (
                <li className="grid__item" key={i}>
                    <article className="hotel">
                        <div className="hotel__inner">
                            <div className="hotel__heading">
                                <div className="hotel__title">{hotel.name}</div>
                                <div className="hotel__price">
                                    {hotel.min_price} <br />
                                    Цена за 1 ночь
                                </div>
                            </div>
                            <div className="hotel__info">
                                <div className="hotel__stars rating">
                                    {Array.from(Array(hotel.stars), (e, i) => {
                                        return (
                                            <div
                                                className="rating__star"
                                                key={i}
                                            >
                                                &#9733;
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="hotel__type">{hotel.type}</div>
                                <div className="hotel__reviews">
                                    {hotel.reviews_amount}
                                </div>
                                <div className="hotel__country">
                                    {hotel.country}
                                </div>
                            </div>
                            <div className="hotel__body">
                                <div className="hotel__descr">
                                    {hotel.description}
                                </div>
                                <div className="hotel__booked"></div>
                            </div>
                        </div>
                    </article>
                </li>
            ))}
        </ul>
    )
}
