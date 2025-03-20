import styled from 'styled-components';

const StyledButton = styled.button`
  display: block;
  border-radius: 5px;
  padding: .5rem;
  line-height: 1rem;
  text-decoration: none;
  background-color: var(--figma-color-bg-brand);
  color: var(--figma-color-text-onbrand);
`;

/**
 * Button component that can render as either a button or anchor element
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the button
 * @param {string} [props.href] - URL to navigate to when clicked (turns button into anchor)
 * @param {string} [props.target] - Target attribute for anchor element
 * @param {Object} [props.style] - Additional inline styles to apply
 * @param {Function} [props.onClick] - Click event handler
 * @returns {JSX.Element} Button or anchor element
 */
const Button = ({ children, href, target, style, onClick }) => {
	if (href) {
		return (
			<StyledButton as="a" href={href} target={target} style={style} onClick={onClick}>
				{children}
			</StyledButton>
		)
	}

	return (
		<StyledButton style={style} onClick={onClick}>
			{children}
		</StyledButton>
	)
}

export default Button
