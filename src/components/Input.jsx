import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  height: ${props => props.$labelAbove ? 'calc(var(--spacer-4) + var(--spacer-3))' : 'var(--spacer-4)'};
  display: flex;
  align-items: flex-end;
`;

const DisplayContents = styled.div`
  display: contents;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--spacer-4);
  width: var(--spacer-4);
  flex: 0 0 var(--spacer-4);
  line-height: var(--spacer-4);
  stroke: unset;
  color: var(--figma-color-icon-secondary);
  margin-left: -1px;
  vertical-align: top;
  text-transform: none !important;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  pointer-events: none;
  line-height: var(--spacer-4);
  letter-spacing: inherit;
  text-decoration: none;
  font-weight: 400;
  margin-right: -8px;
`;

const InputLabel = styled.label`
  margin: 1px 0;
  display: flex;
  background-color: var(--figma-color-bg-secondary);
  border: 1px solid transparent;
  height: var(--spacer-4);
  border-radius: var(--radius-medium);
  align-items: center;

  &:hover {
    border-color: var(--figma-color-border);
  }

  &:focus-within {
    border-color: var(--figma-color-border-selected);
    border-width: 1px;
  }
`;

const ColorSwatch = styled.div`
  width: 16px;
  height: 16px;
  border-radius: var(--radius-small, 2px);
  background-color: ${(props) => props.$color || '#000000'};
  margin: 0 4px;
  border: 1px solid var(--figma-color-border);
`;

const LabelAbove = styled.span`
  font-size: var(--text-body-small-font-size);
  font-weight: var(--font-weight-strong);
  position: absolute;
  top: 0;
  left: 0;
  height: var(--spacer-3);
  color: var(--figma-color-text-secondary);
`

const StyledInput = styled.input`
  height: var(--spacer-4);
  display: flex;
  margin: 0;
  padding: 0 7px;
  border: 1px solid transparent;
  border-left: 0;
  border-right: 0;
  background-clip: padding-box;
  margin-left: 0;
  width: 100%;

  &:focus-visible {
    outline: unset;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* For Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
  
  /* Styling for color input */
  &[type='color'] {
    -webkit-appearance: none;
    width: 0;
    padding: 0;
    border: none;
    background: transparent;
  }

  &[type='color']::-webkit-color-swatch-wrapper {
    background-color: var(--figma-color-bg-secondary);
    padding: 0;
  }

  &[type='color']::-webkit-color-swatch {
    border: none;
  }

  /* For Firefox */
  &[type='color']::-moz-color-swatch {
    border: none;
  }
`;

const ColorDisplay = styled.span`
  padding-right: var(--spacer-4);
`;

/**
 * Input component with optional icon
 * @param {Object} props - Component props
 * @param {string} [props.value=''] - Input value
 * @param {string} [props.type='text'] - Input type (text, number, etc.)
 * @param {boolean} [props.showIcon=false] - Whether to show the icon
 * @param {Function} [props.onChange] - Change event handler
 * @returns {JSX.Element} Input component
 */
const Input = ({ value = '', type = 'text', showIcon = false, label='Input', $labelAbove = false, onChange }) => {
  const handleInputChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <InputContainer $labelAbove={$labelAbove}>
      <DisplayContents>
        <InputLabel>
          {$labelAbove && (
            <LabelAbove>
              { label } 
            </LabelAbove>
          )}
          {showIcon && (
            <Icon>
              <i18n-text>X</i18n-text>
            </Icon>
          )}
          
          {type === 'color' && <ColorSwatch $color={value} />}
          
          <StyledInput
            type={type}
            value={value}
            onChange={handleInputChange}
            spellCheck={false}
            dir="auto"
          />

          {type === 'color' && (
            <ColorDisplay>{value.replace('#', '').toUpperCase()}</ColorDisplay>
          )}
        </InputLabel>
      </DisplayContents>
    </InputContainer>
  );
};

export default Input;
