import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Main, Header, Row, Column } from './components/Layout'
import Button from './components/Button'
import Field from './components/Field'
import Logo from './components/Logo'
import Input from './components/Input'
import Toggle from './components/Toggle'

import { useCopyToClipboard } from './hooks/useCopyToClipboard'

const SectionHeading = styled.h2`
	font-size: var(--text-heading-medium-font-size);
	font-weight: var(--font-weight-bold);
	color: var(--figma-color-text);
	margin: 0;
`

const App = () => {
	const [copiedText, copy] = useCopyToClipboard()
	const [numSelected, setNumSelected] = useState(0)
	const [mode, setMode] = useState('background')
	const [accent, setAccent] = useState('#000000')
	const handleModeChange = event => {
		setMode(mode === 'background' ? 'mask' : 'background')
	}
	const handleAccentChange = color => {
		setAccent(color)
	}


	const exportSVG = mode => {
		window.parent.postMessage(
			{
				pluginMessage: {
					type: 'EXPORT_SVG',
					 mode,
					 accent
				},
			},
			'*'
		)
	}
	const copyCSS = async text => {
		// const copied = await copy(text)
		const copied = await copy(text)
		if (copied) {
			console.log('Copied to clipboard:', text)
		}
	}

	useEffect(() => {
		const handleMessage = (event) => {
			const message = event.data.pluginMessage
			if (message?.type === 'SELECTION_COUNT') {
				setNumSelected(message.numSelected)
			}
			if (message?.type === 'SVG_EXPORT_COMPLETE') {
				copyCSS(message.svgBase64)
			}
		}
		window.addEventListener('message', handleMessage)
		return () => {
			window.removeEventListener('message', handleMessage)
		}
	}, [])

	return (
		<Main>
			<Header>
				<Logo size={128} />
			</Header>
			<Row align='flex-start' grow border>
				<Column width="50%">
					<SectionHeading>Image</SectionHeading>
				</Column>
				<Column align='flex-start' width="50%">
					<SectionHeading>CSS</SectionHeading>
					<Field>
						<Toggle onChange={handleModeChange} checked={mode === 'mask'} label="As mask" />
					</Field>
					{ mode === 'mask' &&
						<Field>
							<Input type='color' value={accent} labelAbove={true} label='Apply colour' onChange={handleAccentChange}/>
						</Field>
					}
					<Field>
						<Button onClick={() => exportSVG(mode, accent)}>Copy CSS</Button>
					</Field>
				</Column>
			</Row>
		</Main>
	)
}

export default App
