import styled from 'styled-components'

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

const Header = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: var(--spacer-3);
`

const Row = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: ${props => props.justify ?? 'center'};
	align-items: ${props => props.align ?? 'center'};
	gap: var(--spacer-3);
	padding: var(--spacer-3);
	border-top: ${props => props.border ? '1px solid var(--figma-color-border)' : 'none'};
	flex-grow: ${props => props.grow ? 1 : 0};
`
const Column = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: ${props => props.justify ?? 'center'};
	align-items: ${props => props.align ?? 'center'};
	gap: var(--spacer-3);
	padding: var(--spacer-3);
	border-top: ${props => props.border ? '1px solid var(--figma-color-border)' : 'none'};
	width: ${props => props.width ?? 'auto'};
`

export { Main, Header, Row, Column }
