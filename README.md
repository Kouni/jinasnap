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
   - Copy `jina-reader-userscript.js` content
   - Create new userscript in your manager
   - Paste and save

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

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Menu item missing | Enable userscript, refresh page |
| Request fails | Check connection, retry after rate limit |
| Copy fails | Grant clipboard permissions |
| Empty response | Verify page accessibility |

## Development

**Stack**: Vanilla JavaScript, Greasemonkey API  
**Architecture**: Event-driven, state management, error boundaries  
**Code style**: ES6+, functional programming, minimal dependencies

## License

GNU General Public License v2.0