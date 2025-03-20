import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { optimize } from 'svgo'
import { Main, Header, Row, Column } from './components/Layout'
import Button from './components/Button'
import Field from './components/Field'
import Logo from './components/Logo'
import Input from './components/Input'
import Toggle from './components/Toggle'
import { Buffer } from 'buffer'
window.Buffer = Buffer
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


	const exportSVG = (mode, accent) => {
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

	const copileCSS = (svgString, mode, accent) => {
		const result = optimize(svgString, {
			floatPrecision: 2,
			datauri: 'base64',
			multipass: true,
			plugins: [
				'preset-default',
			]
		})
		window.parent.postMessage(
			{
				pluginMessage: {
					type: 'COMPILE_CSS',
					data: result.data,
					mode,
					accent
				},
			},
			'*'
		)
	}

	const copyCSS = async text => {
		const copied = await copy(text)
		window.parent.postMessage(
			{
				pluginMessage: {
					type: 'COPY_COMPLETE',
					copied
				},
			},
			'*'
		)
	}
	

	useEffect(() => {
		const handleMessage = (event) => {
			const message = event.data.pluginMessage
			if (message?.type === 'SELECTION_COUNT') {
				setNumSelected(message.numSelected)
			}
			if (message?.type === 'CSS_COMPILATION_COMPLETE') {
				copyCSS(message.css)
			}
			if (message?.type === 'SVG_STRING_EXPORT_COMPLETE') {
				copileCSS(message.svgString, mode, accent)
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
