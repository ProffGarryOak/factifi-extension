# Factifi Chrome Extension

A Chrome extension that allows users to perform mock fact-checks on webpage content.

## Features

- Extracts main text content from any webpage
- Sends content to a mock verification API
- Displays confidence score and citations
- Dark mode toggle
- Refresh button

## Installation

### Chrome Extension

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the `factifi-extension` folder

### Mock API

1. Navigate to the `factifi-api` folder
2. Install requirements: `pip install -r requirements.txt`
3. Run the API: `python app.py`
   - The API will run on `http://localhost:5000`

## Usage

1. Navigate to any webpage you want to fact-check
2. Click the Factifi extension icon in the toolbar
3. Click "Check This Page"
4. View the confidence score and citations
5. Use the "Toggle Dark Mode" button to change the theme
6. Use "Refresh" to reload the current page

## Assumptions

- The mock API runs on localhost:5000
- The extension only extracts the first 5000 characters of text for simplicity
- Fact-check results are randomly generated for demonstration purposes#
