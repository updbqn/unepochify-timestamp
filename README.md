# Unepochify Timestamp

A Firefox extension that converts Unix timestamps to human-readable dates via the context menu.

> **Note:** This is primarily for my personal use.

## Features

- Select any Unix timestamp on a webpage, right-click, and see the converted date in the context menu
- Format: `YYYY-MM-DD hh:mm:ss` (local time)
- Closest to *now* heuristic for seconds or milliseconds identification.
- Only positive timestamps (no dates before 1970).
- Timestamps more than 100 years in the future are rejected.

## Development

Install [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/).

```bash
make lint    # Lint the extension
make run     # Run in Firefox for testing
make build   # Build unsigned extension
make clean   # Remove build artifacts
```
