import { shallow } from 'enzyme';
import { CheckableButton } from './checkablebutton';
import React from 'react';

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
        component.find('div').first().simulate('click')
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
})