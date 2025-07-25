# Jina Reader UserScript

Convert any webpage to LLM-friendly format using Jina Reader API with one-click copy to clipboard.

## Features

- **One-click conversion** - Right-click menu or keyboard shortcut
- **Automatic clipboard copy** - No manual copying required  
- **Minimalist design** - No UI clutter or visual interference
- **Smart notifications** - Real-time status updates with auto-dismiss
- **Error handling** - Network timeouts, invalid content detection
- **Universal compatibility** - Works on any website

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://tampermonkey.net/) (Recommended)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)

2. Install the script:
   - **Method 1**: [Install from Greasy Fork](https://greasyfork.org/en/scripts/541650-jina-reader-copy-llm-format) (Recommended)
   - **Method 2**: [Install from GitHub RAW](https://raw.githubusercontent.com/Kouni/jinasnap/main/jina-reader-userscript.js)
   - **Method 3**: Copy `jina-reader-userscript.js` content, create new userscript in your manager, paste and save

## Usage

### Right-click Menu
- Right-click on any webpage → **"📄 Copy as LLM Format"**

### Keyboard Shortcut  
- `Ctrl/Cmd + Shift + R`

## Technical Specifications

### API Integration
- **Endpoint**: `https://r.jina.ai/`
- **Rate limits**: 20 req/min (free), 500 req/min (API key)
- **Timeout**: 30 seconds
- **Content validation**: Minimum length, error page detection

### Browser Support
- Chrome/Chromium/Edge
- Firefox  
- Safari
- Any Greasemonkey-compatible browser

### Required Permissions
- `GM_xmlhttpRequest` - API communication
- `GM_setClipboard` - Clipboard access
- `GM_registerMenuCommand` - Context menu integration

## Development

**Stack**: Vanilla JavaScript, Greasemonkey API  
**Architecture**: Event-driven, state management, error boundaries  
**Code style**: ES6+, functional programming, minimal dependencies

## License

GNU General Public License v2.0