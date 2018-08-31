import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, merge } from 'lodash';
import { Mask } from './templates/mask';

/** 
 * 模式
 * single：不可手动uncheck
 * multiple: 可手动uncheck
*/
export const Mode = {
    single: 'single',
    multiple: 'multiple',
};

/**
 * 切换选中状态的按钮
 *
 * @export
 * @class CheckableButton
 * @extends {React.PureComponent}
 */
export class CheckableButton extends React.PureComponent {
    static Mode = Mode;
    static Mask = Mask;
    static propTypes = {
        isChecked: PropTypes.bool,
        isEnable: PropTypes.bool,
        children: PropTypes.node.isRequired,
        mode: PropTypes.oneOf(['single', 'multiple']),
        checkedStyle: PropTypes.object,
        unCheckedStyle: PropTypes.object,
        disabledStyle: PropTypes.object,
        onChange: PropTypes.func,
    }
    static defaultProps = {
        /** 
         * 是否选中
        */
        isChecked: false,
        /** 
         * 是否启用
        */
        isEnable: true,
        /** 
         * 模式
         * single：不可手动uncheck
         * multiple: 可手动uncheck
        */
        mode: Mode.multiple,
        /** 
         * 选中时的样式
        */
        checkedStyle: {},
        /** 
         * 取消选中时的样式
        */
        unCheckedStyle: {},
        /** 
         * 禁用时的样式
        */
        disabledStyle: {},
        /** 
         * 选中状态改变事件
         * @param {boolean} isChecked
        */
        onChange: (isChecked) => { }
    }

    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.isChecked,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (isEqual(this.props.isChecked, nextProps.isChecked) === false) {
            this.setState({
                isChecked: nextProps.isChecked,
            });
        }
    }

    /**
     * 切换选中状态
     *
     * @memberof CheckableButton
     */
    toggle() {
        if (this.props.mode === Mode.single || this.props.isEnable === false) {
            return;
        }

        this.setState({
            isChecked: !this.state.isChecked,
        }, () => {
            this.props.onChange(this.state.isChecked);
        });
    }

    render() {
        const newProps = merge(this.props.children.props, {
            isChecked: this.state.isChecked,
            /** 
             * 禁用时使用disableStyle，启用时判断isChecked使用checkedStyle或unCheckedStyle
            */
            style: this.props.isEnable === true ? this.state.isChecked ? this.props.checkedStyle : this.props.unCheckedStyle : this.props.disabledStyle,
        })
        return (
            <div onClick={this.toggle.bind(this)}>
                {
                    React.cloneElement(this.props.children, newProps)
                }
            </div>
        );
    }
}