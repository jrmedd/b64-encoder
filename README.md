# b64-encoder

A Figma plugin that streamlines the process of using SVGs in web projects by automating the export, optimisation, and conversion to base64-encoded data URIs for both CSS and HTML.

## Overview

If you've ever needed to embed SVGs directly in your code, you know the process can be tedious:

1. Export the SVG from Figma
2. Optimise it with a tool like SVGO 
3. Convert it to base64
4. Format it properly for CSS or HTML

This plugin automates the entire workflow with a single click. Select any frame or element in Figma and instantly copy optimised, base64-encoded SVGs ready to use as:

- HTML `<img>` tags
- CSS `background-image` properties
- CSS `mask-image` properties (with customisable colors)

## When to Use Base64-Encoded SVGs

Base64-encoded SVGs are particularly useful for:

- **Email templates** where external images may be blocked or filtered
- **CSS backgrounds and decorative elements** when you want to avoid additional HTTP requests
- **Custom list markers** that need to maintain consistency across email clients
- **Icon systems** where you need a small number of icons without the overhead of an icon font
- **Mask images** in CSS when you need a shape with a customisable fill color
- **Offline applications** or environments with limited connectivity
- **Performance optimisation** for small, frequently used graphics

In these scenarios, embedding SVGs directly in your code eliminates HTTP requests, avoids CORS issues, and ensures visual elements display correctly regardless of external resource availability.

## Installation

### For Users

The easiest way to install this plugin is through the [Figma Plugin Store](https://www.figma.com/community/plugins).

1. Open Figma
2. Click on "Resources" or "Plugins" 
3. Search for "b64-encoder"
4. Click "Install"

### For Developers

If you want to extend or modify the plugin, follow these development setup instructions:

## Development Quickstart

This plugin was created with [Plugma](https://github.com/gavinmcfarland/plugma) using the [React](https://react.dev/) framework.

### Requirements

-   [Node.js](https://nodejs.org/en)
-   [Figma desktop app](https://www.figma.com/downloads/)

### Setup and Development

1. Install the dependencies and watch for changes while developing:

    ```bash
    npm install
    npm run dev
    ```

2. Open the Figma desktop app and import the plugin:

    - Open a file in Figma.
    - Search for "Import plugin from manifest..." using the [Quick Actions](https://help.figma.com/hc/en-us/articles/360040328653-Use-shortcuts-and-quick-actions#Use_quick_actions) bar.
    - Choose the `manifest.json` file from the `dist` folder.

3. Manage `manifest` details from inside `package.json`.

### Browser Preview

Run this command to preview your plugin in the browser during development.

```bash
npm run preview
```

_Make sure the plugin is open in the Figma desktop app._

### Before Publishing

Before publishing your plugin, make sure to create a build. If not, it will still point to the dev server and won't work properly for users.

```bash
npm run build
```

Now you can publish the plugin from the Figma desktop app.

### Advanced

See the [Plugma docs](https://plugma.dev/docs) for further information.

## How It Works

1. Select one or more elements in your Figma document
2. Launch the plugin and choose whether you want HTML or CSS output
3. For CSS, select between background image or mask image (with customisable color)
4. Click the respective button to copy the optimised code to your clipboard
5. Paste directly into your code

Under the hood, the plugin:
1. Exports the selected element as an SVG
2. Runs it through SVGO for optimisation
3. Converts it to a base64 data URI
4. Formats it as either CSS or HTML markup
5. Copies the result to your clipboard

## Acknowledgments

- Built with [Plugma](https://github.com/gavinmcfarland/plugma)
- SVG optimisation powered by [SVGO](https://github.com/svg/svgo)
- Logo font adapted from work by Brian Kent ([Ænigma Fonts](https://www.dafont.com/aenigma.d188))
