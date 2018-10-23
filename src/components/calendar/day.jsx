import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { isEqual } from "lodash";

export class NormalTemplate extends React.PureComponent {
  static propTypes = {
    style: PropTypes.object,
    datetime: PropTypes.object.isRequired
  };
  static defaultProps = {
    style: {}
  };
  render() {
    return <span style={this.props.style}>{this.props.datetime.day()}</span>;
  }
}

export class Day extends React.PureComponent {
  static propTypes = {
    datetime: PropTypes.object.isRequired,
    /**
     * 是否可见
     */
    visbile: PropTypes.bool,
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
    visbile: true,
    style: { display: "flex", justifyContent: "center", alignItems: "center" },
    textStyle: {},
    template: <NormalTemplate datetime={moment()} />
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div style={this.props.style}>
        {this.props.visbile === true &&
          React.cloneElement(this.props.template, {
            datetime: this.props.datetime,
            style: this.props.textStyle
          })}
      </div>
    );
  }
}
