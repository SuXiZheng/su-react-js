import React from 'react';
import PropTypes from 'prop-types';
import './templates.css'
import ReactDOM from 'react-dom';

export class Mask extends React.PureComponent {
    static propTypes = {
        isChecked: PropTypes.bool,
        children: PropTypes.element,
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        zIndex: PropTypes.number,
    }
    static defaultProps = {
        /** 
         * 是否选中
        */
        isChecked: false,
        /** 
         * 遮罩层背景色
        */
        backgroundColor: 'rgba(0,0,0,.6)',
        /** 
         * 
        */
        color: 'white',
        /** 
         * Z轴可见性
        */
        zIndex: 10,
    }

    render() {
        const rootPanel = ReactDOM.findDOMNode(this.rootRef) || {
            clientWidth: 0,
            clientHeight: 0,
        };
        return (
            <div
                ref={reactElement => { this.rootRef = reactElement; }}
                className='root'
                style={{
                    position: 'relative'
                }}
            >
                {
                    this.props.isChecked === true &&
                    <div
                        className='mask'
                        style={{
                            position: 'absolute',
                            zIndex: this.props.zIndex,
                            backgroundColor: this.props.backgroundColor,
                            width: rootPanel.clientWidth,
                            height: rootPanel.clientHeight,
                        }}
                    >
                    </div>
                }
                {this.props.children}
            </div>
        );
    }
}