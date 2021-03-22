import React from 'react'
import Select, { ValueType, OptionTypeBase } from 'react-select'

type MySelectProps<
    IsMulti extends boolean = false,
    T extends OptionTypeBase = { label: string; value: string }
> = {
    name: string
    label: string
    options: Array<T>
    value: ValueType<T, IsMulti>
    multi: IsMulti
    onChange: (name: string, value: ValueType<T, IsMulti>) => void
    onBlur: (name: string, value: boolean) => void
}

export const MySelect = function <
    IsMulti extends boolean = false,
    T extends OptionTypeBase = { label: string; value: string }
>(props: React.PropsWithChildren<MySelectProps<IsMulti, T>>) {
    const { name, label, options, value, multi, onChange, onBlur } = props

    const handleChange = (value: ValueType<T, IsMulti>) => {
        // this is going to call setFieldValue and manually update values
        onChange(name, value)
    }

    const handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched
        onBlur(name, true)
    }

    return (
        <div style={{ margin: '1rem 0' }}>
            <label htmlFor="color">{label}</label>
            <Select<T, IsMulti>
                options={options}
                id="color"
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                isMulti={multi}
            />
        </div>
    )
}
