import React from 'react';
import PropTypes from 'prop-types';
import './templates.css'
import ReactDOM from 'react-dom';

export class Arrow extends React.PureComponent {
    static propTypes = {
        isChecked: PropTypes.bool,
        children: PropTypes.element,
        color: PropTypes.string,
    }
    static defaultProps = {
        /** 
         * 是否选中
        */
        isChecked: false,
        /** 
         * 
        */
        color: 'white'
    }

    render() {
        return (
            <div style={{
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    borderLeft: '12px solid white',
                    borderTop: '12px solid transparent',
                    borderBottom: '12px solid transparent',
                    left: '100%',
                    top: 87.5,
                }}>

                </div>
                {this.props.children}
            </div>
        );
    }
}