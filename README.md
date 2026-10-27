<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:2563eb,100:f97316&height=170&section=header&text=Character%20%26%20Word%20Counter&fontSize=34&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Abhishek%20Jadhav%20%7C%20Veda%20Technology%20Internship%20Day%2018&descAlignY=62&descSize=17" alt="Character and Word Counter header" />

  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=20&pause=1000&color=2563eb&center=true&vCenter=true&width=760&lines=Veda+Technology+Internship+%E2%80%A2+Day+18;HTML5+%E2%80%A2+CSS3+%E2%80%A2+Vanilla+JavaScript;Live+Text+Analysis+%E2%80%A2+input+event" alt="Typing introduction" />

  <p><b>Light Theme &#183; Navy &amp; Orange Accents &#183; Responsive &#183; Accessible</b></p>

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
  ![Unicode](https://img.shields.io/badge/Unicode_Code_Points-2563eb?style=for-the-badge)
  ![No Build Step](https://img.shields.io/badge/No_Build_Step-16a34a?style=for-the-badge)

</div>

---

Character &amp; Word Counter by **Abhishek Jadhav** &mdash; Web Developer and first-year BCA student at VIIT, Baramati. Built with **HTML5 + CSS3 + Vanilla JavaScript**: a live text analyzer that counts characters, words, sentences, characters without spaces, and paragraphs, and estimates reading time. No frameworks, no build step, no backend.

> **Internship attribution:** 45-day Web Development Internship at **Veda Technology** &mdash; Day 18: Character and Word Counter.

## Features

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=1000&color=f97316&center=true&vCenter=true&width=760&lines=Live+Analysis+%E2%80%A2+input+event;6+Statistics+%E2%80%A2+Clear+%E2%80%A2+Copy+%E2%80%A2+Sample+%E2%80%A2+Select+All" alt="Features animation" />
</div>

- **Live analysis** &mdash; all statistics update instantly on every keystroke, paste, edit, or deletion via the `input` event.
- **Character count** &mdash; counts every character including letters, numbers, spaces, punctuation, and line breaks.
- **Word count** &mdash; trims leading/trailing spaces and handles multiple spaces and newlines.
- **Sentence count** &mdash; splits on `.`, `!`, `?`; empty text yields zero; unterminated text counts as one sentence.
- **Characters without spaces** &mdash; additional useful statistic.
- **Paragraph count** &mdash; counts non-empty blocks separated by blank lines.
- **Reading time** &mdash; estimated at 200 words per minute.
- **Clear button** &mdash; clears the editor and resets all statistics.
- **Copy button** &mdash; copies the entered text with success/error feedback and a fallback.
- **Sample text button** &mdash; inserts demo content and refreshes statistics.
- **Select all button** &mdash; selects all text inside the editor.
- **Empty state** &mdash; helpful message when the editor is empty.
- **Live status indicator** &mdash; "Live analysis active" with a pulsing dot.
- **Keyboard accessibility** &mdash; all controls usable with a keyboard; visible focus states.
- **Reduced motion** &mdash; respects `prefers-reduced-motion`.
- **Responsive** &mdash; works on mobile, tablet, and desktop.

## Technologies

| Technology | Use |
|------------|-----|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Semantic structure, textarea, buttons, footer (`index.html`) |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Custom properties, Grid/Flexbox, animations, media queries, reduced motion (`style.css`) |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000000) | Input events, string methods, regex, clipboard (`script.js`) |
| ![Unicode](https://img.shields.io/badge/Unicode-2563eb?style=flat-square) | `Array.from(text).length` for code-point counting |
| ![No Frameworks](https://img.shields.io/badge/No_Frameworks-2563eb?style=flat-square) | Zero dependencies |

## How Counts Are Calculated

- **Characters:** `Array.from(text).length` &mdash; counts Unicode code points. Letters, numbers, spaces, punctuation, and line breaks are all included. Some complex emojis consist of multiple code points and are counted accordingly.
- **Words:** `text.trim()` then `split(/\s+/)` with empties removed. Handles leading/trailing spaces and multiple spaces/newlines.
- **Sentences:** `text.trim().split(/[.!?]+/)` filtered to non-empty segments. Empty input returns 0. Text without a terminator counts as one sentence.
- **Characters (no spaces):** removes all whitespace via `/\s/g`, then counts code points.
- **Paragraphs:** non-empty blocks separated by one or more blank lines (`/\n\s*\n/`).
- **Reading time:** `words / 200` minutes, formatted as `< 1 min` for sub-minute texts.

## Project Structure

```text
internship-task-18/
+-- index.html
+-- style.css
+-- script.js
+-- README.md
+-- assets/
    +-- favicon.svg
```

## How to Run

1. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).
2. No build step, no server, no dependencies.
3. Resize the window or use DevTools device mode to test desktop, tablet, and mobile widths.

## Testing Checklist

- [x] Empty input: all counts are zero.
- [x] Input `Hello world`: 11 characters and 2 words.
- [x] Input `  Hello   world  `: 17 characters and 2 words.
- [x] Multiple lines: words and paragraphs counted correctly.
- [x] Punctuation: sentence counts sensible.
- [x] Emojis and special characters: consistent code-point counting, documented.
- [x] Clear button resets editor and statistics.
- [x] Sample text button inserts sample and refreshes statistics.
- [x] Copy button copies correct text and handles clipboard errors.
- [x] Responsive layout verified at mobile and desktop widths.
- [x] No console errors during normal use.

## Limitations

- Sentence counting is punctuation-based and cannot detect abbreviations or decimal points perfectly.
- Paragraph counting treats blank-line-separated blocks as paragraphs.
- Reading time is an estimate based on 200 words per minute.
- Complex emojis may count as multiple characters (code points).

## Git Commands

```bash
git init
git add .
git commit -m "Add Day 18 Character and Word Counter"
git branch -M main
git remote add origin https://github.com/0xAbhi13/character-word-counter.git
git push -u origin main
```
