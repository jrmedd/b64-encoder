import styled from 'styled-components'

/**
 * Main layout container component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the container
 * @returns {JSX.Element} Main layout container
 */
const Main = styled.main`
	background-color: var(--figma-color-bg-primary);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: 0;
	padding: 0;
`

/**
 * Header layout component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the header
 * @returns {JSX.Element} Header component
 */
const Header = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: var(--spacer-3);
`

/**
 * Row layout component with customizable alignment and justification
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the row
 * @param {string} [props.$justify='center'] - Justify content value
 * @param {string} [props.$align='center'] - Align items value
 * @param {boolean} [props.$border=false] - Whether to show a top border
 * @param {boolean} [props.$grow=false] - Whether the row should grow to fill available space
 * @returns {JSX.Element} Row component
 */
const Row = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: ${props => props.$justify ?? 'center'};
	align-items: ${props => props.$align ?? 'center'};
	gap: var(--spacer-3);
	padding: var(--spacer-3);
	border-top: ${props => props.$border ? '1px solid var(--figma-color-border)' : 'none'};
	flex-grow: ${props => props.$grow ? 1 : 0};
`

/**
 * Column layout component with customizable alignment and justification
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the column
 * @param {string} [props.$justify='center'] - Justify content value
 * @param {string} [props.$align='center'] - Align items value
 * @param {boolean} [props.$border=false] - Whether to show a top border
 * @param {string} [props.$width='auto'] - Width of the column
 * @returns {JSX.Element} Column component
 */
const Column = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: ${props => props.$justify ?? 'center'};
	align-items: ${props => props.$align ?? 'center'};
	gap: var(--spacer-3);
	padding: var(--spacer-3);
	border-top: ${props => props.$border ? '1px solid var(--figma-color-border)' : 'none'};
	width: ${props => props.$width ?? 'auto'};
`

export { Main, Header, Row, Column }
