/**
 * Unepochify Timestamp - Firefox Extension
 * Converts Unix timestamps to human-readable dates via context menu
 */

// Create the context menu item with icon
browser.menus.create({
  id: "unepochify-timestamp",
  title: "Unepochify",
  icons: { "16": "icons/icon-48.png" },
  contexts: ["selection"]
});

/**
 * Parse a string as a Unix timestamp and return a Date object.
 * Uses "closest to now" heuristic to determine seconds vs milliseconds.
 *
 * @param {string} text - The selected text
 * @returns {Date|null} - Parsed date or null if invalid
 */
function parseTimestamp(text) {
  const trimmed = text.trim();

  // Must be a valid positive integer (no decimals, no non-numeric chars)
  if (!/^\d+$/.test(trimmed)) {
    return null;
  }

  const num = parseInt(trimmed, 10);

  // Try both interpretations
  const asSeconds = new Date(num * 1000);
  const asMilliseconds = new Date(num);

  const now = Date.now();
  const diffSeconds = Math.abs(asSeconds.getTime() - now);
  const diffMilliseconds = Math.abs(asMilliseconds.getTime() - now);

  // Pick whichever is closer to now
  const result = diffSeconds < diffMilliseconds ? asSeconds : asMilliseconds;

  // Reject if more than 100 years in the future
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 100);
  if (result.getTime() > maxDate.getTime()) {
    return null;
  }

  return result;
}

/**
 * Format a Date as YYYY-MM-DD hh:mm:ss
 *
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
  const pad = (n) => n.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Update menu dynamically when shown
browser.menus.onShown.addListener((info, tab) => {
  const text = info.selectionText || "";
  let title = "Unepochify";
  let visible = false;

  if (text.trim() !== "") {
    const date = parseTimestamp(text);
    if (date) {
      title = formatDate(date);
      visible = true;
    }
  }

  browser.menus.update("unepochify-timestamp", { title, visible });
  browser.menus.refresh();
});

// Reset menu when hidden
browser.menus.onHidden.addListener(() => {
  browser.menus.update("unepochify-timestamp", {
    title: "Unepochify",
    visible: false
  });
});
