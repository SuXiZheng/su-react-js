import { shallow, mount } from "enzyme";
import moment, { fn } from "moment";
import { Day, NormalTemplate } from "../calendar/day";
import { Month } from "./month";
import React from "react";

class CustomTemplate extends React.PureComponent {
  render() {
    return (
      <div>
        <span>{this.props.datetime.day()}</span>
        <input type="checkbox" />
      </div>
    );
  }
}

describe("Calendar测试", () => {
  describe("Day组件测试", () => {
    test("day可见", () => {
      const component = mount(<Day datetime={moment()} />);
      component.setProps({ visible: true });
      expect(component.props().visible).toBe(true);
    });

    test("day不可见", () => {
      const component = mount(<Day datetime={moment()} />);
      component.setProps({ visible: false });
      expect(component.props().visible).toBe(false);
    });

    test("day使用默认模版正确渲染", () => {
      const component = mount(<Day datetime={moment()} />);
      expect(
        component
          .find("span")
          .first()
          .text()
          .trim()
      ).toEqual(
        moment()
          .format("D")
          .toString()
      );
    });

    test("day使用自定义模版正确渲染", () => {
      const component = mount(
        <Day datetime={moment()} template={<CustomTemplate />} />
      );
      expect(
        component
          .find("input")
          .first()
          .exists()
      ).toBeTruthy();
    });

    test("Day组件onClick事件被调用", () => {
      const mockProps = {
        onClick: jest.fn()
      };
      const component = shallow(<Day datetime={moment()} {...mockProps} />);
      component
        .find("div")
        .first()
        .simulate("click");
      expect(mockProps.onClick).toBeCalled();
    });
  });

  describe("Month组件测试", () => {
    test("传入时间，得到正确的日历数据", () => {
      var component = mount(
        <Month datetime={moment("2018-09-10", "YYYY-MM-DD")} />
      );
      var calendarDatas = component.instance().setup();
      expect(calendarDatas[0].daysInRow[1].format("YYYY-MM-DD")).toEqual(
        "2018-08-28"
      );
    });

    test("不在本月的日期不显示", () => {
      var component = mount(
        <Month datetime={moment("2018-09-10")} daysOfOtherMonthVisble={false} />
      );
      const span = component.find('span[date="2018-08-30"]');
      expect(component.find('span[date="2018-08-30"]').exists()).toBeFalsy();
    });

    test("日期点击事件被调用", () => {
      const mockProps = {
        onClick: jest.fn()
      };
      const component = mount(<Month datetime={moment()} {...mockProps} />);
      component
        .find(Day)
        .first()
        .simulate("click");
      expect(mockProps.onClick).toBeCalled();
    });
  });
});
