import {
    filtersApply,
    filtersReset,
    showAll,
    FilterActionType,
} from './actions'

export interface IHoltelItem {
    name: string
    country: string
    address: string
    stars: number
    type: string
    description: string
    services: Array<string>
    min_price: number
    currency: string
    rating: number
    reviews_amount: number
    last_review: string
}

export interface IFilterState {
    hotels: Array<IHoltelItem>
    filteredHotels: Array<IHoltelItem>
}

let initialState: IFilterState = {
    hotels: [
        {
            name: 'Marina Inn',
            country: 'Греция',
            address: 'Фалираки, Родос, Греция',
            stars: 4,
            type: 'Отель',
            description:
                'Этот 4-звездочный отель расположен в центре города. На его территории есть бассейн с террасой и сауна. Из номеров открывается вид на море или на средневековый город.',
            services: [
                'Пляж',
                'Кондиционер',
                'Открытый бассейн',
                'Бесплатная парковка',
                'Бесплатный WiFi',
                'Вид на море',
                'Бесплатный завтрак',
            ],
            min_price: 2789.0,
            currency: 'RUR',
            rating: 4.5,
            reviews_amount: 18,
            last_review:
                'Отличное расположение. Вкусный завтрак. Отдыхали с детьми - все понравилось.',
        },
        {
            name: 'Mondrian Suites',
            country: 'Греция',
            address: 'Фалираки, Родос, Греция',
            stars: 5,
            type: 'Апартаменты',
            description:
                'Из окон открывается вид на город.К услугам гостей номера-студио с балконом и чайником в 2,7 км от пляжа.',
            services: [
                'Пляж',
                'Кондиционер',
                'Открытый бассейн',
                'Платная парковка',
                'Бесплатный WiFi',
                'Вид на море',
            ],
            min_price: 3245.2,
            currency: 'RUR',
            rating: 5,
            reviews_amount: 4,
            last_review:
                'Потрясающее место, в номере есть все необходимое. Красивый вид на море.',
        },
        {
            name: 'Sunny Appartments',
            country: 'Греция',
            address: 'Родос, Родос, Греция',
            stars: 2,
            type: 'Апартаменты',
            description:
                'Все номера и апартаменты оборудованы кондиционером и телевизором с плоским экраном. Также в распоряжении гостей тостер и чайник.',
            services: [
                'Пляж',
                'Кондиционер',
                'Бесплатная парковка',
                'Бесплатный WiFi',
            ],
            min_price: 1153.0,
            currency: 'RUR',
            rating: 2.4,
            reviews_amount: 36,
            last_review:
                'Бассейн очень маленький. Кормят невкусно. Больше не поедем.',
        },
        {
            name: 'Super All Inclusive Hotel',
            country: 'Греция',
            address: 'Родос, Родос, Греция',
            stars: 4,
            type: 'Отель',
            description:
                'Все номера оснащены телевизором с плоским экраном. Из некоторых номеров открывается вид на море или город.',
            services: [
                'Пляж',
                'Кондиционер',
                'Открытый бассейн',
                'Бесплатный WiFi',
                'Вид на море',
                'Бесплатный завтрак',
            ],
            min_price: 3689.0,
            currency: 'RUR',
            rating: 4.1,
            reviews_amount: 14,
            last_review:
                'Недалёко от пляжа и старого города, вокруг много разных магазинчиков',
        },
        {
            name: 'Adams Hotel',
            country: 'Россия',
            address: 'Родос, Родос, Греция',
            stars: 3,
            type: 'Отель',
            description:
                'Отель расположен всего в 100 метрах от пляжа и в 5-ти минутах ходьбы от исторической части города, недалеко от всех основных достопримечательностей. Из отеля открывается вид на море. К услугам гостей спокойный открытый бассейн.',
            services: [
                'Пляж',
                'Кондиционер',
                'Открытый бассейн',
                'Бесплатная парковка',
                'Бесплатный WiFi',
                'Бесплатный завтрак',
            ],
            min_price: 1896.0,
            currency: 'RUR',
            rating: 0,
            reviews_amount: 0,
            last_review: '',
        },
    ],
    filteredHotels: [],
}

type FilterValues = ReturnType<typeof filtersApply>['payload']

function countryFilter(selected_country: FilterValues['country']) {
    return (hotel: IHoltelItem) =>
        !selected_country || hotel.country === selected_country.value
}
function typeFilter(selected_types: FilterValues['types']) {
    return (hotel: IHoltelItem) =>
        !selected_types.length ||
        selected_types.some((i) => i.value.includes(hotel.type))
}
function ratingFilter(selected_stars: FilterValues['rating']) {
    return (hotel: IHoltelItem) =>
        !selected_stars.length ||
        selected_stars.includes(hotel.stars.toString())
}
function priceFilter(price_range: FilterValues['price']) {
    const min_price = price_range[0]
    const max_price = price_range[1]
    return (hotel: IHoltelItem) =>
        !price_range.length ||
        (min_price <= hotel.min_price && max_price >= hotel.min_price)
}
function reviewsFilter(reviews_amount: FilterValues['reviews_amount']) {
    return (hotel: IHoltelItem) =>
        !reviews_amount || +reviews_amount <= hotel.reviews_amount
}
export const FiltersReducer = (
    state = initialState,
    action:
        | ReturnType<typeof filtersApply>
        | ReturnType<typeof filtersReset>
        | ReturnType<typeof showAll>
) => {
    switch (action.type) {
        case FilterActionType.FILTER_UPDATE: {
            const {
                country,
                types,
                rating,
                price,
                reviews_amount,
            } = action.payload
            let filteredHotels = state.hotels
            filteredHotels = filteredHotels
                .filter(countryFilter(country))
                .filter(typeFilter(types))
                .filter(ratingFilter(rating))
                .filter(priceFilter(price))
                .filter(reviewsFilter(reviews_amount))
            return { ...state, filteredHotels: filteredHotels }
        }
        case 'FILTER_RESET': {
            let filteredHotels = state.hotels
            return { ...state, filteredHotels: filteredHotels }
        }
        case 'SHOW_ALL': {
            let filteredHotels = state.hotels
            return { ...state, filteredHotels: filteredHotels }
        }
        default:
            return initialState
    }
}
