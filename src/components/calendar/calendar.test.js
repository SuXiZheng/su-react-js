import { shallow, mount } from "enzyme";
import moment from "moment";
import { Day, NormalTemplate } from "../calendar/day";
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
        .day()
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
});
