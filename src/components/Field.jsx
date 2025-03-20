import styled from 'styled-components';

const StyledField = styled.div`
	display: flex;
	gap: var(--spacer-2);
	align-items: center;
`

const Field = ({ children }) => {
	return (
		<StyledField>
			{children}
		</StyledField>
	)
}

export default Field;
