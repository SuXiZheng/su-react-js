import React from 'react';
import PropTypes from 'prop-types';
import { Mode, CheckableButton } from './checkablebutton';

export class CheckableButtonGroup extends React.PureComponent {
    static propTypes = {
        isEnable: PropTypes.bool,
        children: PropTypes.arrayOf(PropTypes.objectOf(CheckableButton)),
        mode: PropTypes.oneOf(['single', 'multiple']),
        checkedStyle: PropTypes.object,
        unCheckedStyle: PropTypes.object,
        disabledStyle: PropTypes.object,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
        onChange: PropTypes.func,
    };

    static defaultProps = {
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
         * @param {(string|number|[])} [value] 依据mode不同返回不同类型。single返回一个值，multiple返回一个数组
        */
        onChange: (value) => { }
    };
}