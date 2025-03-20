import styled from 'styled-components';

const ToggleLabel = styled.label`
  display: inline-flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
  gap: .25rem;
`;

const CheckboxInput = styled.input`
  /* Hide the default checkbox */
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const Slider = styled.span`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: var(--figma-color-bg-tertiary);
  border-radius: 20px;
  transition: background-color var(--duration-md);

  &::before {
    content: "";
    position: absolute;
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: var(--figma-color-icon-onbrand);
    border-radius: 50%;
    transition: transform var(--duration-md)
  }

  ${CheckboxInput}:checked + && {
    background-color: var(--figma-color-bg-brand);
  }

  ${CheckboxInput}:checked + &&::before {
    background-color: var(--figma-color-icon-onbrand);
    transform: translateX(20px);
  }
`;

/**
 * Toggle switch component
 * @param {Object} props - Component props
 * @param {string} [props.label] - Label text to display next to toggle
 * @param {boolean} [props.checked] - Whether the toggle is checked
 * @param {Function} [props.onChange] - Change event handler
 * @param {Object} [props.style] - Additional inline styles to apply
 * @returns {JSX.Element} Toggle component
 */
const Toggle = ({ label, checked, onChange, style }) => {
  return (
    <ToggleLabel style={style}>
      {label}
      <CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <Slider />
    </ToggleLabel>
  );
};

export default Toggle;
