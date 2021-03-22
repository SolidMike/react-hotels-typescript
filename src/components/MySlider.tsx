import React from 'react'
import Rheostat, { Props as RheostatProps, PublicState } from 'rheostat'
import 'rheostat/initialize'
import 'rheostat/css/rheostat.css'
import '../css/slider.css'

type SliderProps = Omit<RheostatProps, 'onValuesUpdated' | 'onChange'> & {
    onChange: (name: string, value: number[]) => void
    onBlur: (name: string, state: boolean) => void
    name: string
}

export default class Slider extends React.Component<SliderProps> {
    handleChange = (sliderState: PublicState) => {
        const { onChange, onBlur } = this.props

        onChange('price', sliderState.values)
        onBlur('price', true)
    }

    render() {
        const { onChange, onBlur, values, ...rest } = this.props
        return (
            <div className="slider">
                <label className="label">Daily Spend</label>
                <Rheostat
                    {...rest}
                    values={values}
                    onValuesUpdated={this.handleChange}
                />
                {values && (
                    <div className="row">
                        <div>$ {values[0]}</div>
                        <div>$ {values[1]}</div>
                    </div>
                )}
            </div>
        )
    }
}
