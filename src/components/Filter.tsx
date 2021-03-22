import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { filtersApply, filtersReset, showAll } from '../store/actions'
import { withFormik, Form, FormikProps } from 'formik'
import { MySelect } from './MySelect'
import MySlider from './MySlider'

const mapDispatchToProps = { filtersApply, filtersReset, showAll }

const connector = connect(null, mapDispatchToProps)

type FilterConnectedProps = ConnectedProps<typeof connector>
type FormValues = ReturnType<typeof filtersApply>['payload']

function Filter(props: FilterConnectedProps & FormikProps<FormValues>) {
    const {
        values,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        handleReset,
        filtersReset,
        showAll,
        handleBlur,
        handleChange,
    } = props

    const typesOptions = [
        { value: 'Апартаменты', label: 'Апартаменты' },
        { value: 'Отель', label: 'Отель' },
    ]
    const countriesOptions = [
        { value: 'Греция', label: 'Греция' },
        { value: 'Россия', label: 'Россия' },
        { value: 'Украина', label: 'Украина' },
    ]
    useEffect(() => {
        showAll()
    }, [])

    return (
        <Form className="filter">
            <MySelect
                label="Страны"
                name="country"
                value={values.country}
                options={countriesOptions}
                multi={false}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
            />

            <MySelect
                value={values.types}
                options={typesOptions}
                multi={true}
                label="Типы"
                name="types"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
            />
            <fieldset className="filter__rating">
                <legend>Количество звезд</legend>
                <label htmlFor="one_star">
                    1 звезда
                    <input
                        type="checkbox"
                        name="rating"
                        id="one_star"
                        value="1"
                        checked={values.rating.includes('1')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </label>
                <label htmlFor="two_stars">
                    2 звезды
                    <input
                        type="checkbox"
                        name="rating"
                        id="two_stars"
                        value="2"
                        checked={values.rating.includes('2')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </label>
                <label htmlFor="three_stars">
                    3 звезды
                    <input
                        type="checkbox"
                        name="rating"
                        id="three_stars"
                        value="3"
                        checked={values.rating.includes('3')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </label>
                <label htmlFor="four_stars">
                    4 звезды
                    <input
                        type="checkbox"
                        name="rating"
                        id="four_stars"
                        value="4"
                        checked={values.rating.includes('4')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </label>
                <label htmlFor="five_stars">
                    5 звезд
                    <input
                        type="checkbox"
                        name="rating"
                        id="five_stars"
                        value="5"
                        checked={values.rating.includes('5')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </label>
            </fieldset>
            <label htmlFor="reviews">
                Кол-во отзывов (от)
                <input
                    type="number"
                    name="reviews_amount"
                    value={values.reviews_amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </label>
            <MySlider
                min={0}
                max={10000}
                values={values.price}
                name="price"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
            />
            <button
                type="submit"
                disabled={isSubmitting}
                className="filter__apply"
            >
                Применить фильтр
            </button>
            <button
                type="button"
                className="filter__reset"
                onClick={() => {
                    handleReset()
                    filtersReset()
                }}
            >
                Очистить фильтр
            </button>
        </Form>
    )
}

const enhancedForm = withFormik<FilterConnectedProps, FormValues>({
    mapPropsToValues: (props) => ({
        country: null,
        types: [],
        rating: [],
        reviews_amount: '',
        price: [0, 10000],
    }),
    handleSubmit(values, { props, setSubmitting }) {
        setTimeout(() => {
            props.filtersApply(values)
            setSubmitting(false)
        }, 1000)
    },
    displayName: 'Filter',
})(Filter)

export default connector(enhancedForm)
