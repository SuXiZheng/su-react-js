import React from 'react';
import PropTypes from 'prop-types';
import './templates.css'

export class Mask extends React.PureComponent {
    static propTypes = {
        isChecked: PropTypes.bool,
        children: PropTypes.element,
    }
    static defaultProps = {
        isChecked: false,
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}