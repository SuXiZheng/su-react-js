import { shallow, mount } from 'enzyme';
import { CheckableButton } from './checkablebutton';
import React from 'react';
// import jset from 'jest';

describe('CheckableButton测试', () => {
    test('single模式不可手动切换状态', () => {
        const mockProps = {
            mode: CheckableButton.Mode.single,
            onChange: jest.fn(),
        };

        const component = shallow(
            <CheckableButton {...mockProps}>
                <CheckableButton.Mask />
            </CheckableButton>
        );
        component.find('div').first().simulate('click');
        expect(component.state().isChecked).toBe(false);
    })

    test('multiple模式可以手动切换状态', () => {
        const mockProps = {
            mode: CheckableButton.Mode.multiple,
            onChange: jest.fn(),
        };

        const component = shallow(
            <CheckableButton {...mockProps}>
                <CheckableButton.Mask />
            </CheckableButton>
        );
        component.find('div[name="root"]').simulate('click')
        expect(component.state().isChecked).toBe(true);
    })

    test('disabled时，即便mode是multiple，也不可手动切换状态', () => {
        const mockProps = {
            mode: CheckableButton.Mode.multiple,
            isEnable: false,
            onChange: jest.fn(),
        };

        const component = shallow(
            <CheckableButton {...mockProps}>
                <CheckableButton.Mask />
            </CheckableButton>
        );
        component.find('div').first().simulate('click')
        expect(component.state().isChecked).toBe(false);
    })

    test('手动切换状态时，isChecked值应正确传递给子组件', () => {
        const mockProps = {
            mode: CheckableButton.Mode.multiple,
            onChange: jest.fn(),
        };

        const component = shallow(
            <CheckableButton {...mockProps}>
                <CheckableButton.Mask />
            </CheckableButton>
        );
        component.find('div').first().simulate('click')
        expect(component.children().props().isChecked).toBe(true);
    })

    test('传入isChecked到CheckableButton时，isChecked值应正确传递给子组件', () => {
        const mockProps = {
            mode: CheckableButton.Mode.multiple,
            isChecked: false,
            onChange: jest.fn(),
        };

        const component = shallow(
            <CheckableButton {...mockProps}>
                <CheckableButton.Mask />
            </CheckableButton>
        );
        component.setProps({ isChecked: true });
        expect(component.children().props().isChecked).toBe(true);
    })

    test('当手动点击改变选中状态时，onChange事件应被触发', () => {
        const mockProps = {
            mode: CheckableButton.Mode.multiple,
            isChecked: false,
            onChange: jest.fn(),
        };

        const component = shallow(
            <CheckableButton {...mockProps}>
                <CheckableButton.Mask />
            </CheckableButton>
        );
        component.find('div').first().simulate('click');
        expect(mockProps.onChange).toBeCalled();
    })

    test('当传入isCheckedProps改变选中状态时，onChange事件不应被触发', () => {
        const mockProps = {
            mode: CheckableButton.Mode.multiple,
            isChecked: false,
            onChange: jest.fn(),
        };

        const component = shallow(
            <CheckableButton {...mockProps}>
                <CheckableButton.Mask />
            </CheckableButton>
        );
        component.setProps({ isChecked: true });
        expect(mockProps.onChange).not.toBeCalled();
    })

    describe('CheckableButton.Mask测试', () => {
        test('选中状态应出现透明遮罩层', () => {
            const mockProps = {
                isChecked: true,
            };

            const component = shallow(
                <CheckableButton.Mask {...mockProps} />
            );
            expect(component.find({ name: 'mask' }).exists()).toBeTruthy();
        });

        test('非选中状态不应出现透明遮罩层', () => {
            const mockProps = {
                isChecked: false,
            };

            const component = shallow(
                <CheckableButton.Mask {...mockProps} />
            );
            expect(component.find({ name: 'mask' }).exists()).toBeFalsy();
        });

        test('遮罩层的应该与根容器宽高一致', () => {
            const mockProps = {
                isChecked: false,
            };

            const component = mount(
                <CheckableButton.Mask {...mockProps}>
                    <div style={{ width: 100, height: 100 }} />
                </CheckableButton.Mask>
            );

            var s = 1 + 1;
            component.setProps({ isChecked: true });
            const root = component.find({ name: 'root' }).getDOMNode();
            const mask = component.find({ name: 'mask' }).getDOMNode();
            expect({ width: root.clientWidth, height: root.clientHeight }).toEqual({ width: mask.clientWidth, height: mask.clientHeight });
        })
    });
})