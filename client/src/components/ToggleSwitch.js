import React from 'react';

const ToggleSwitch = ({name, checked, onChange}) => {
    return (
        <span>
            <input
                id={name}
                type="checkbox"
                name={name}
                className="custom-switch"
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={name} className="custom-switch-label"/>
        </span>
    );
};

export default ToggleSwitch;