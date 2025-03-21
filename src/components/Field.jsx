import styled from 'styled-components';

const StyledField = styled.div`
	display: flex;
	gap: var(--spacer-2);
	align-items: center;
`

/**
 * Field component for layout with flex display and spacing
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the field
 * @returns {JSX.Element} Field component
 */
const Field = ({ children }) => {
	return (
		<StyledField>
			{children}
		</StyledField>
	)
}

export default Field;
