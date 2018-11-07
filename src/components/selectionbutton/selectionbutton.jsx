import React from "react";
import PropTypes from "prop-types";
import { isEqual, merge, cloneDeep } from "lodash";
import { SelectionButtonGroup } from "./selectionbuttongroup";
import { Mask } from "./templates/mask";

/**
 * 模式
 * single：不可手动uncheck
 * multiple: 可手动uncheck
 */
export const Mode = {
  single: "single",
  multiple: "multiple"
};

/**
 * 布局方式
 * horizontal 水品布局
 * vertical 垂直布局
 */
export const Orientation = {
  horizontal: "horizontal",
  vertical: "vertical"
};

/**
 * 切换选中状态的按钮
 *
 * @export
 * @class CheckableButton
 * @extends {React.PureComponent}
 */
export class SelectionButton extends React.PureComponent {
  static Mode = Mode;
  static Orientation = Orientation;
  static Group = SelectionButtonGroup;
  static Mask = Mask;
  static propTypes = {
    isSelected: PropTypes.bool,
    isEnable: PropTypes.bool,
    children: PropTypes.node.isRequired,
    mode: PropTypes.oneOf(["single", "multiple"]),
    checkedStyle: PropTypes.object,
    unCheckedStyle: PropTypes.object,
    disabledStyle: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number
    ]),
    onChange: PropTypes.func
  };
  static defaultProps = {
    /**
     * 是否选中
     */
    isSelected: false,
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
     * value
     */
    value: null,
    /**
     * 选中状态改变事件
     * @param {boolean} isSelected
     */
    onChange: isSelected => {}
  };

  // 此控件不适用getDerivedStateFromProps方法的原因时。当在控件内容改变其state.isChecked时，也会触发该方法。但props.isChecked并未改变。
  // static getDerivedStateFromProps(props, state) {
  //     if (isEqual(props.isChecked, state.isChecked) === false) {
  //         return { isChecked: props.isChecked }
  //     }
  //     return null;
  // }

  constructor(props) {
    super(props);
    this.state = {
        isSelected: props.isSelected
    };
  }

  componentWillReceiveProps(nextProps) {
    if (isEqual(this.props.isSelected, nextProps.isSelected) === false) {
      this.setState({
        isSelected: nextProps.isSelected
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

    this.setState(
      {
        isSelected: !this.state.isSelected
      },
      () => {
        this.props.onChange(this.state.isSelected);
      }
    );
  }

  render() {
    const newProps = merge(cloneDeep(this.props.children.props), {
        isSelected: this.state.isSelected,
      /**
       * 禁用时使用disableStyle，启用时判断isChecked使用checkedStyle或unCheckedStyle
       */
      style:
        this.props.isEnable === true
          ? this.state.isSelected
            ? this.props.checkedStyle
            : this.props.unCheckedStyle
          : this.props.disabledStyle
    });
    return (
      <div name="root" onClick={this.toggle.bind(this)}>
        {React.cloneElement(this.props.children, newProps)}
      </div>
    );
  }
}
