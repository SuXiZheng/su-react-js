import React from 'react';
import { CheckableButton } from '../components/checkablebutton/checkablebutton';

export class CheckableButtonPage extends React.PureComponent {
    render() {
        return (
            <CheckableButton isChecked>
                <CheckableButton.Mask>
                    <div style={{ width: 100, height: 100 }} />
                </CheckableButton.Mask>
            </CheckableButton>
        );
    }
}
