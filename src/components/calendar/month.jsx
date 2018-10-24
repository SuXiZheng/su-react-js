import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Day } from "./day";
import { cloneDeep } from "lodash";

export class Month extends React.PureComponent {
  static propTypes = {
    datetime: PropTypes.object.isRequired,
    style: PropTypes.object,
    daysOfOtherMonthVisble: PropTypes.bool,
    onClick: PropTypes.func,
    weekdays: PropTypes.arrayOf(PropTypes.string)
  };
  static defaultProps = {
    style: {},
    weekdays: ["一", "二", "三", "四", "五", "六", "七"],
    headItemStyle: {
      width: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    bodyItemStyle: {
      width: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    /**
     * 不在当月的日期是否显示
     */
    daysOfOtherMonthVisble: true,
    /**
     * 日期点击事件
     * @param {string} [dateString] YYYY-MM-DD
     * @param {momment} [date] moment对象
     */
    onClick: (dateString, date) => {}
  };

  setup() {
    // 当月第一天
    const firstDayOfMonth = moment(
      `${this.props.datetime.format("YYYY-MM")}-01`,
      "YYYY-MM-DD"
    );
    // 当月1号是周几
    const firstDayOfWeekInMonth = firstDayOfMonth.isoWeekday();
    // 当月共多少天
    const daysInMonth = this.props.datetime.daysInMonth();
    var rows = [];

    for (
      var row = 1;
      row <= Math.ceil((daysInMonth + firstDayOfWeekInMonth - 1) / 7);
      row++
    ) {
      var daysInRow = [];
      for (var weekday = 1; weekday <= 7; weekday++) {
        if (row === 1 && weekday < firstDayOfWeekInMonth) {
          daysInRow.push(
            firstDayOfMonth
              .clone()
              .add(0 - (firstDayOfWeekInMonth - weekday), "days")
          );
        } else {
          daysInRow.push(
            firstDayOfMonth
              .clone()
              .add((row - 1) * 7 + weekday - firstDayOfWeekInMonth, "days")
          );
        }
      }
      rows.push({ daysInRow });
    }
    return rows;
  }

  headRender() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.props.weekdays.map(weekday => {
          return (
            <div key={weekday} style={this.props.headItemStyle}>
              <span>{weekday}</span>
            </div>
          );
        })}
      </div>
    );
  }

  bodyRender() {
    var rows = this.setup();
    return rows.map((row, index) => {
      return (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {row.daysInRow.map(day => {
            var dayVisible = true;
            if (this.props.daysOfOtherMonthVisble === false) {
              dayVisible = day.month() === this.props.datetime.month();
            }
            return (
              <Day
                key={day}
                visible={dayVisible}
                datetime={day}
                style={this.props.bodyItemStyle}
                onClick={this.props.onClick}
              />
            );
          })}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.headRender()}
        {this.bodyRender()}
      </div>
    );
  }
}
