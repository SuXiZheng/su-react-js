import React from 'react';
import PropTypes from 'prop-types';
import './templates.css'
import ReactDOM from 'react-dom';

export class Mask extends React.PureComponent {
    static propTypes = {
        isSelected: PropTypes.bool,
        children: PropTypes.element,
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        zIndex: PropTypes.number,
    }
    static defaultProps = {
        /** 
         * 是否选中
        */
       isSelected: false,
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

    constructor(props) {
        super(props);
        this.state = {
            /** 
             * 组件实际宽度
            */
            width: 0,
            /** 
             * 组件实际高度
            */
            height: 0,
        };
    }

    componentDidMount() {
        this.measureActualSize();
    }

    componentDidUpdate() {
        this.measureActualSize();
    }

    measureActualSize() {
        const rootPanel = ReactDOM.findDOMNode(this.rootRef) || {
            clientWidth: 0,
            clientHeight: 0,
        };

        if (this.state.width === rootPanel.clientWidth && this.state.height === rootPanel.clientHeight) {
            return;
        }
        this.setState({
            width: rootPanel.clientWidth,
            height: rootPanel.clientHeight,
        });
    }

    render() {
        return (
            <div
                name='root'
                ref={reactElement => { this.rootRef = reactElement; }}
                style={{
                    position: 'relative'
                }}
            >
                {
                    this.props.isSelected === true &&
                    <div
                        name='mask'
                        style={{
                            position: 'absolute',
                            zIndex: this.props.zIndex,
                            backgroundColor: this.props.backgroundColor,
                            width: this.state.width,
                            height: this.state.height,
                        }}
                    >
                    </div>
                }
                {this.props.children}
            </div>
        );
    }
}