import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { optimize } from 'svgo/dist/svgo.browser'
import { Main, Header, Row, Column } from './components/Layout'
import Button from './components/Button'
import Field from './components/Field'
import Logo from './components/Logo'
import Input from './components/Input'
import Toggle from './components/Toggle'
import { Buffer } from 'buffer'
window.Buffer = Buffer
import { useCopyToClipboard } from './hooks/useCopyToClipboard'

const ScreenReaderOnlyHeading = styled.h1`
	position:absolute;  
  left:-10000px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden;  
`	

const SectionHeading = styled.h2`
	font-size: var(--text-heading-medium-font-size);
	font-weight: var(--font-weight-bold);
	color: var(--figma-color-text);
	margin: 0;
`

const App = () => {
	const [copiedText, copy] = useCopyToClipboard()
	const [numSelected, setNumSelected] = useState(0)
	const [backgroundMode, setBackgroundMode] = useState('background')
	const [maskColor, setMaskColor] = useState('#000000')
	const handleBackgroundModeChange = event => {
		setBackgroundMode(backgroundMode === 'background' ? 'mask' : 'background')
	}
	const handleAccentChange = color => {
		setMaskColor(color)
	}


	const exportSVG = (cssOrHtml, backgroundMode, maskColor) => {
		window.parent.postMessage(
			{
				pluginMessage: {
					type: 'EXPORT_SVG',
					cssOrHtml,
					backgroundMode,
					maskColor
				},
			},
			'*'
		)
	}

	const optimiseSVG = svgString => {
		const result = optimize(svgString, {
			floatPrecision: 2,
			datauri: 'base64',
			multipass: true,
			plugins: [
				'preset-default',
			]
		})
		return result.data
	}

	const compile = (svgString, cssOrHtml, backgroundMode, maskColor) => {
		const data = optimiseSVG(svgString)
		const type = cssOrHtml === 'css' ? 'COMPILE_CSS' : 'COMPILE_HTML'
		window.parent.postMessage(
			{
				pluginMessage: {
					type,
					data,
					cssOrHtml,
					backgroundMode,
					maskColor
				},
			},
			'*'
		)
	}
	

	const copyToClipboard = async (text, cssOrHtml) => {
		const copied = await copy(text)
		window.parent.postMessage(
			{
				pluginMessage: {
					type: 'COPY_COMPLETE',
					cssOrHtml,
					copied
				},
			},
			'*'
		)
	}
	

	useEffect(() => {
		const handleMessage = (event) => {
			const message = event.data.pluginMessage
			switch (message?.type) {
				case 'SELECTION_COUNT':
					setNumSelected(message.numSelected)
					break
				case 'COMPILATION_COMPLETE':
					copyToClipboard(message.data, message.cssOrHtml)
					break
				case 'SVG_STRING_EXPORT_COMPLETE':
					compile(message.svgString, message.cssOrHtml, message.backgroundMode, message.maskColor)
					break
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
				<ScreenReaderOnlyHeading>Base64 Encoder</ScreenReaderOnlyHeading>
				<Logo size={128} />
			</Header>
			<Row $align='flex-start' $grow $border>
				<Column $align='flex-start' $width="50%">
					<SectionHeading>HTML image</SectionHeading>
					<Field>
						<Button onClick={() => exportSVG('html', backgroundMode, maskColor)}>Copy HTML</Button>
					</Field>
				</Column>
				<Column $align='flex-start' $width="50%">
					<SectionHeading>CSS background</SectionHeading>
					<Field>
						<Toggle onChange={handleBackgroundModeChange} checked={backgroundMode === 'mask'} label="As mask" />
					</Field>
					{ backgroundMode === 'mask' &&
						<Field>
							<Input type='color' value={maskColor} $labelAbove={true} label='Apply colour' onChange={handleAccentChange}/>
						</Field>
					}
					<Field>
						<Button onClick={() => exportSVG('css', backgroundMode, maskColor)}>Copy CSS</Button>
					</Field>
				</Column>
			</Row>
		</Main>
	)
}

export default App
