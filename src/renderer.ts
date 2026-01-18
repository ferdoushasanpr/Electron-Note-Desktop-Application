import "./index.css";

// --- 1. State & Interfaces ---
interface Note {
  id: number;
  title: string;
  topics: string[];
  date: string;
  content: string; // Ensure content is part of the interface
}

const notes: Note[] = [
  {
    id: 1,
    title: "Project Brainstorm",
    topics: ["Work", "Design"],
    date: "2024-05-20",
    content: "Initial ideas for the Electron app layout.",
  },
  {
    id: 2,
    title: "Grocery List",
    topics: ["Personal"],
    date: "2024-05-21",
    content: "Eggs, Milk, Bread, Coffee.",
  },
  {
    id: 3,
    title: "TypeScript Tips",
    topics: ["Coding", "Learning"],
    date: "2024-05-22",
    content: "Use interfaces for better type safety.",
  },
];

// --- 2. DOM Elements ---
const container = document.getElementById("notes-container") as HTMLElement;
const header = document.querySelector("header") as HTMLElement;
const fab = document.getElementById("add-note") as HTMLButtonElement;

// Modal Elements
const modal = document.getElementById("note-modal") as HTMLElement;
const closeBtn = document.getElementById("close-modal") as HTMLButtonElement;
const saveBtn = document.getElementById("save-note-btn") as HTMLButtonElement;

// Detail View Elements
const detailView = document.getElementById("note-detail-view") as HTMLElement;
const backBtn = document.getElementById("back-to-home") as HTMLButtonElement;
const summarizeBtn = document.getElementById(
  "summarize-btn",
) as HTMLButtonElement;

// --- 3. View Functions ---

function renderNotes() {
  if (!container) return;
  container.innerHTML = "";

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

    card.addEventListener("click", () => openNote(note));
    container.appendChild(card);
  });
}

function openNote(note: Note) {
  // Switch views
  container.style.display = "none";
  header.style.display = "none";
  fab.style.display = "none";
  detailView.style.display = "block";

  // Populate data
  (document.getElementById("detail-title") as HTMLElement).innerText =
    note.title;
  (document.getElementById("detail-date") as HTMLElement).innerText = note.date;
  (document.getElementById("detail-content") as HTMLElement).innerText =
    note.content;

  const topicsContainer = document.getElementById(
    "detail-topics",
  ) as HTMLElement;
  topicsContainer.innerHTML = note.topics
    .map((t) => `<span class="topic-tag">${t}</span>`)
    .join("");
}

// --- 4. Event Listeners ---

// Show/Hide Modal
fab.addEventListener("click", () => (modal.style.display = "flex"));
closeBtn.addEventListener("click", () => (modal.style.display = "none"));

// Navigation
backBtn.addEventListener("click", () => {
  detailView.style.display = "none";
  container.style.display = "grid";
  header.style.display = "flex";
  fab.style.display = "block";
});

// Save New Note
saveBtn.addEventListener("click", () => {
  const titleInput = document.getElementById(
    "note-title-input",
  ) as HTMLInputElement;
  const topicsInput = document.getElementById(
    "note-topics-input",
  ) as HTMLInputElement;
  const contentInput = document.getElementById(
    "note-content-input",
  ) as HTMLTextAreaElement;

  if (!titleInput.value || !contentInput.value) {
    alert("Please fill in the title and content!");
    return;
  }

  const newNote: Note = {
    id: Date.now(),
    title: titleInput.value,
    topics: topicsInput.value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== ""),
    date: new Date().toISOString().split("T")[0],
    content: contentInput.value,
  };

  notes.push(newNote);
  renderNotes();

  // Reset UI
  titleInput.value = "";
  topicsInput.value = "";
  contentInput.value = "";
  modal.style.display = "none";
});

// AI Summary
summarizeBtn.addEventListener("click", () => {
  alert("Connecting to AI to generate a summary...");
});

// --- 5. Initial Load ---
renderNotes();
