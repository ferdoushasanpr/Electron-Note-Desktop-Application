/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";

// Define the structure of a Note
interface Note {
  id: number;
  title: string;
  topics: string[];
  date: string;
}

// Mock data (In a real app, this would come from a database/file)
const notes: Note[] = [
  {
    id: 1,
    title: "Project Brainstorm",
    topics: ["Work", "Design"],
    date: "2024-05-20",
  },
  { id: 2, title: "Grocery List", topics: ["Personal"], date: "2024-05-21" },
  {
    id: 3,
    title: "TypeScript Tips",
    topics: ["Coding", "Learning"],
    date: "2024-05-22",
  },
];

const container = document.getElementById("notes-container");

const modal = document.getElementById("note-modal") as HTMLElement;
const addBtn = document.getElementById("add-note") as HTMLButtonElement;
const closeBtn = document.getElementById("close-modal") as HTMLButtonElement;
const saveBtn = document.getElementById("save-note-btn") as HTMLButtonElement;

function renderNotes() {
  if (!container) return;
  container.innerHTML = ""; // Clear container

  notes.forEach((note) => {
    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
            <strong class="note-title">${note.title}</strong>
            <div class="note-topics">
                ${note.topics.map((t) => `<span class="topic-tag">${t}</span>`).join("")}
            </div>
            <div class="note-date">${note.date}</div>
        `;

    container.appendChild(card);
  });
}

// Show Modal
addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Initialize display
renderNotes();

// Hide Modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Save Logic
saveBtn.addEventListener("click", () => {
  const title = (
    document.getElementById("note-title-input") as HTMLInputElement
  ).value;
  const topicsRaw = (
    document.getElementById("note-topics-input") as HTMLInputElement
  ).value;
  const content = (
    document.getElementById("note-content-input") as HTMLTextAreaElement
  ).value;

  if (!title || !content) {
    alert("Please fill in the title and content!");
    return;
  }

  const newNote: Note = {
    id: Date.now(),
    title: title,
    topics: topicsRaw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== ""),
    date: new Date().toISOString().split("T")[0],
  };

  // Add to our notes array and re-render
  notes.push(newNote);
  renderNotes();

  // Reset and Close
  (document.getElementById("note-title-input") as HTMLInputElement).value = "";
  (document.getElementById("note-topics-input") as HTMLInputElement).value = "";
  (document.getElementById("note-content-input") as HTMLTextAreaElement).value =
    "";
  modal.style.display = "none";
});
