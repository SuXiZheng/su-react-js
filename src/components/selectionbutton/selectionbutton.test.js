import { shallow, mount } from "enzyme";
import { SelectionButton } from "./selectionbutton";
import React from "react";
// import jset from 'jest';

describe("SelectionButton测试", () => {
  test("single模式不可手动切换状态", () => {
    const mockProps = {
      mode: SelectionButton.Mode.single,
      onChange: jest.fn()
    };

    const component = shallow(
      <SelectionButton {...mockProps}>
        <SelectionButton.Mask />
      </SelectionButton>
    );
    component
      .find("div")
      .first()
      .simulate("click");
    expect(component.state().isSelected).toBe(false);
  });

  test("multiple模式可以手动切换状态", () => {
    const mockProps = {
      mode: SelectionButton.Mode.multiple,
      onChange: jest.fn()
    };

    const component = shallow(
      <SelectionButton {...mockProps}>
        <SelectionButton.Mask />
      </SelectionButton>
    );
    component.find('div[name="root"]').simulate("click");
    expect(component.state().isSelected).toBe(true);
  });

  test("disabled时，即便mode是multiple，也不可手动切换状态", () => {
    const mockProps = {
      mode: SelectionButton.Mode.multiple,
      isEnable: false,
      onChange: jest.fn()
    };

    const component = shallow(
      <SelectionButton {...mockProps}>
        <SelectionButton.Mask />
      </SelectionButton>
    );
    component
      .find("div")
      .first()
      .simulate("click");
    expect(component.state().isSelected).toBe(false);
  });

  test("手动切换状态时，isSelected值应正确传递给子组件", () => {
    const mockProps = {
      mode: SelectionButton.Mode.multiple,
      onChange: jest.fn()
    };

    const component = shallow(
      <SelectionButton {...mockProps}>
        <SelectionButton.Mask />
      </SelectionButton>
    );
    component
      .find("div")
      .first()
      .simulate("click");
    expect(component.children().props().isSelected).toBe(true);
  });

  test("传入isSelected到SelectionButton时，isSelected值应正确传递给子组件", () => {
    const mockProps = {
      mode: SelectionButton.Mode.multiple,
      isSelected: false,
      onChange: jest.fn()
    };

    const component = shallow(
      <SelectionButton {...mockProps}>
        <SelectionButton.Mask />
      </SelectionButton>
    );
    component.setProps({ isSelected: true });
    expect(component.children().props().isSelected).toBe(true);
  });

  test("当手动点击改变选中状态时，onChange事件应被触发", () => {
    const mockProps = {
      mode: SelectionButton.Mode.multiple,
      isSelected: false,
      onChange: jest.fn()
    };

    const component = shallow(
      <SelectionButton {...mockProps}>
        <SelectionButton.Mask />
      </SelectionButton>
    );
    component
      .find("div")
      .first()
      .simulate("click");
    expect(mockProps.onChange).toBeCalled();
  });

  test("当传入isSelectedProps改变选中状态时，onChange事件不应被触发", () => {
    const mockProps = {
      mode: SelectionButton.Mode.multiple,
      isSelected: false,
      onChange: jest.fn()
    };

    const component = shallow(
      <SelectionButton {...mockProps}>
        <SelectionButton.Mask />
      </SelectionButton>
    );
    component.setProps({ isSelected: true });
    expect(mockProps.onChange).not.toBeCalled();
  });

  describe("SelectionButton.Mask测试", () => {
    test("选中状态应出现透明遮罩层", () => {
      const mockProps = {
        isSelected: true
      };

      const component = shallow(<SelectionButton.Mask {...mockProps} />);
      expect(component.find({ name: "mask" }).exists()).toBeTruthy();
    });

    test("非选中状态不应出现透明遮罩层", () => {
      const mockProps = {
        isSelected: false
      };

      const component = shallow(<SelectionButton.Mask {...mockProps} />);
      expect(component.find({ name: "mask" }).exists()).toBeFalsy();
    });

    test("遮罩层的应该与根容器宽高一致", () => {
      const mockProps = {
        isSelected: false
      };

      const component = mount(
        <SelectionButton.Mask {...mockProps}>
          <div style={{ width: 100, height: 100 }} />
        </SelectionButton.Mask>
      );

      component.setProps({ isSelected: true });
      const root = component.find({ name: "root" }).getDOMNode();
      const mask = component.find({ name: "mask" }).getDOMNode();
      expect({ width: root.clientWidth, height: root.clientHeight }).toEqual({
        width: mask.clientWidth,
        height: mask.clientHeight
      });
    });
  });

  describe("SelectionButton.Group测试", () => {
      test
  });
});
