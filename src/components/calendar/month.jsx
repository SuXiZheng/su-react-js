import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Day } from "./day";

export class Month extends React.PureComponent {
  static propTypes = {
    datetime: PropTypes.object,
    style: PropTypes.object
  };
  static defaultProps = {
    style: {}
  };

  daysOfWeek = ["一", "二", "三", "四", "五", "六", "七"];

  headRender() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.daysOfWeek.map(dayOfWeek => {
          return (
            <div>
              <span>{dayOfWeek}</span>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    // 当月第一天
    const firstDayOfMonth = moment(
      `${this.props.datetime.format("YYYY-MM")}-01`,
      "YYYY-MM-DD"
    );
    // 当月1号是周几
    const firstDayOfWeekInMonth = firstDayOfMonth.weekday();
    // 当月共多少天
    const daysInMonth = this.props.datetime.daysInMonth();
    for (
      var row = 1;
      row <= Math.ceil((daysInMonth - firstDayOfWeekInMonth) / 7);
      row++
    ) {
      for (var column = 1; column <= 7; column++) {}
    }

    return <div>{this.headRender()}</div>;
  }
}
