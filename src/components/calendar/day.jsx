import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { isEqual } from "lodash";
import styles from "./calendar.module.css";

export class NormalTemplate extends React.PureComponent {
  static propTypes = {
    style: PropTypes.object,
    datetime: PropTypes.object.isRequired,
    onClick: PropTypes.func
  };
  static defaultProps = {
    style: {},
    /**
     * 日期点击事件
     * @param {string} [dateString] YYYY-MM-DD
     * @param {momment} [date] moment对象
     */
    onClick: (dateString, date) => {}
  };
  render() {
    return (
      <span
        date={this.props.datetime.format("YYYY-MM-DD")}
        style={this.props.style}
        className={styles.default_day_template_text}
      >
        {this.props.datetime.format("D")}
      </span>
    );
  }
}

export class Day extends React.PureComponent {
  static propTypes = {
    datetime: PropTypes.object.isRequired,
    /**
     * 是否可见
     */
    visible: PropTypes.bool,
    /**
     * 样式
     */
    style: PropTypes.object,
    /**
     * 文字样式
     */
    textStyle: PropTypes.object,
    /**
     * 模版
     */
    template: PropTypes.element
  };
  static defaultProps = {
    visible: true,
    style: {},
    textStyle: {},
    template: <NormalTemplate datetime={moment()} />
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div
        style={this.props.style}
        className={styles.day}
        onClick={() => {
          this.props.onClick(
            this.props.datetime.format("YYYY-MM-DD"),
            this.props.datetime.clone()
          );
        }}
      >
        {this.props.visible === true &&
          React.cloneElement(this.props.template, {
            datetime: this.props.datetime,
            style: this.props.textStyle
          })}
      </div>
    );
  }
}
