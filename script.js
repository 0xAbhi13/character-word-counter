/* ============================================================
   Character & Word Counter - script.js
   Live text analysis using input events and string methods.
   ============================================================ */

// --- Configuration --------------------------------------------------
// Average adult reading speed used for the reading-time estimate.
const WORDS_PER_MINUTE = 200;

// Sample content used by the "Sample Text" button.
const SAMPLE_TEXT =
  "Veda Technology empowers students through practical web development internships.\n\n" +
  "This sample paragraph demonstrates live character, word, sentence, and paragraph counting. " +
  "Try editing, deleting, or pasting text to see the statistics update instantly!\n\n" +
  "Reading time is estimated at 200 words per minute. Emojis are counted as single characters where possible: \uD83D\uDE80 \u2728 \uD83C\uDF1F";

// --- DOM references -------------------------------------------------
const editor = document.getElementById("editor");
const emptyState = document.getElementById("emptyState");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const charNoSpaceCount = document.getElementById("charNoSpaceCount");
const paragraphCount = document.getElementById("paragraphCount");
const readingTime = document.getElementById("readingTime");

const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const sampleBtn = document.getElementById("sampleBtn");
const selectAllBtn = document.getElementById("selectAllBtn");
const statusMsg = document.getElementById("statusMsg");

// --- State ----------------------------------------------------------
let statusTimer = null;

// --- Counting helpers ----------------------------------------------
// Character count using Unicode code points (Array.from) so that many
// single-code-point symbols/emojis are counted as one character.
// Note: complex emojis (e.g. family, skin-tone sequences) may consist
// of multiple code points and are therefore counted as multiple characters.
function countCharacters(text) {
  return Array.from(text).length;
}

// Word count: trim, then split on any whitespace run; ignore empties.
function countWords(text) {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

// Sentence count: split on sentence terminators (. ! ?), keep non-empty
// segments. A non-empty text with no terminator counts as one sentence.
function countSentences(text) {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  const segments = trimmed.split(/[.!?]+/).filter(function (s) {
    return s.trim() !== "";
  });
  return segments.length;
}

// Character count excluding all whitespace characters.
function countCharsNoSpaces(text) {
  return Array.from(text.replace(/\s/g, "")).length;
}

// Paragraph count: non-empty blocks separated by one or more blank lines.
function countParagraphs(text) {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed
    .split(/\n\s*\n/)
    .map(function (p) { return p.trim(); })
    .filter(function (p) { return p !== ""; })
    .length;
}

// Reading time estimate based on WORDS_PER_MINUTE.
function estimateReadingTime(words) {
  if (words === 0) return "0 min";
  const minutes = words / WORDS_PER_MINUTE;
  if (minutes < 1) return "< 1 min";
  // Show one decimal for fractional minutes under 10, whole otherwise.
  if (minutes < 10) return minutes.toFixed(1) + " min";
  return Math.round(minutes) + " min";
}

// --- Formatting helpers --------------------------------------------
function setStatus(message, isError, isSuccess, temporary) {
  if (statusTimer) {
    clearTimeout(statusTimer);
    statusTimer = null;
  }
  statusMsg.textContent = message || "";
  statusMsg.classList.toggle("is-error", Boolean(isError));
  statusMsg.classList.toggle("is-success", Boolean(isSuccess));
  if (temporary && message) {
    statusTimer = setTimeout(function () {
      statusMsg.textContent = "";
      statusMsg.classList.remove("is-error", "is-success");
    }, 2200);
  }
}

// --- Core analysis --------------------------------------------------
function analyze() {
  const text = editor.value;

  const chars = countCharacters(text);
  const words = countWords(text);
  const sentences = countSentences(text);
  const charsNoSpaces = countCharsNoSpaces(text);
  const paragraphs = countParagraphs(text);
  const reading = estimateReadingTime(words);

  charCount.textContent = String(chars);
  wordCount.textContent = String(words);
  sentenceCount.textContent = String(sentences);
  charNoSpaceCount.textContent = String(charsNoSpaces);
  paragraphCount.textContent = String(paragraphs);
  readingTime.textContent = reading;

  // Empty state visibility.
  if (text.trim() === "") {
    emptyState.classList.remove("is-hidden");
  } else {
    emptyState.classList.add("is-hidden");
  }
}

// --- Actions --------------------------------------------------------
function clearText() {
  editor.value = "";
  analyze();
  editor.focus();
  setStatus("Editor cleared.", false, true, true);
}

async function copyText() {
  const text = editor.value;
  if (text === "") {
    setStatus("Nothing to copy. The editor is empty.", true, false, true);
    return;
  }
  let copied = false;
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch (err) {
      copied = false;
    }
  }
  if (!copied) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      copied = Boolean(ok);
    } catch (err) {
      copied = false;
    }
  }
  if (copied) {
    setStatus("Text copied to clipboard.", false, true, true);
  } else {
    setStatus("Could not copy text. Please copy manually.", true, false, true);
  }
}

function insertSample() {
  editor.value = SAMPLE_TEXT;
  analyze();
  editor.focus();
  setStatus("Sample text inserted.", false, true, true);
}

function selectAllText() {
  editor.focus();
  editor.select();
  // Also set selection range for robustness.
  try {
    editor.setSelectionRange(0, editor.value.length);
  } catch (err) {
    // ignore
  }
  setStatus("All text selected.", false, true, true);
}

// --- Event listeners -----------------------------------------------
editor.addEventListener("input", analyze);

clearBtn.addEventListener("click", clearText);
copyBtn.addEventListener("click", copyText);
sampleBtn.addEventListener("click", insertSample);
selectAllBtn.addEventListener("click", selectAllText);

// Keyboard shortcuts for convenience (not required, but helpful).
editor.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
    // Let native select-all happen; just ensure focus.
    // (textarea handles Ctrl+A natively)
  }
});

// --- Init -----------------------------------------------------------
analyze();
