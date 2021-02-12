import React from 'react';
import createReactClass from 'create-react-class'
import cx from 'classnames';
import '../styles/ColorPicker.less';

const COLORS = [ '#FF8A80','#FFD180','#FFFF8D', '#CCFF90']

const ColorPicker = createReactClass({
    render() {
        return (
            <div className='ColorPicker'>
                {
                    COLORS.map(color =>
                        <div
                            key={color}
                            className={cx('ColorPicker__swatch', { selected: this.props.value === color })}
                            style={{ backgroundColor: color }}
                            onClick={this.props.onChange.bind(null, color)}
                        />
                    )
                }
            </div>
        );
    }
});

export default ColorPicker;