"use strict";

// ---------- Data (Array of Objects) ----------
let students = []; // { id: number, name: string, grade: number }
let nextId = 1;

// ---------- DOM Elements ----------
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("studentName");
const gradeInput = document.getElementById("studentGrade");
const tableBody = document.getElementById("studentTableBody");
const avgSpan = document.getElementById("averageGrade");
const errorMsg = document.getElementById("errorMsg");

// ---------- Bonus: LocalStorage ----------
const STORAGE_KEY = "gradeTrackerStudents";

function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    students = JSON.parse(saved);

    // make sure nextId continues correctly
    const maxId = students.reduce((max, s) => Math.max(max, s.id), 0);
    nextId = maxId + 1;
  } catch (e) {
    // if storage is corrupted, clear it
    localStorage.removeItem(STORAGE_KEY);
    students = [];
    nextId = 1;
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// ---------- Validation ----------
function validateInputs(name, grade) {
  if (name.trim() === "") {
    return "Student name must not be empty.";
  }

  const gradeNumber = Number(grade);

  if (Number.isNaN(gradeNumber)) {
    return "Grade must be a number.";
  }

  if (gradeNumber < 0 || gradeNumber > 100) {
    return "Grade must be between 0 and 100.";
  }

  return null; // no errors
}

// ---------- Average ----------
function calculateAverage() {
  if (students.length === 0) return 0;

  const total = students.reduce((sum, s) => sum + s.grade, 0);
  return total / students.length;
}

// ---------- Render DOM ----------
function render() {
  // clear table
  tableBody.innerHTML = "";

  const avg = calculateAverage();
  avgSpan.textContent = avg.toFixed(2);

  students.forEach((student, index) => {
    const tr = document.createElement("tr");

    // Bonus: highlight above average
    if (students.length > 0 && student.grade > avg) {
      tr.classList.add("above");
    }

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.grade}</td>
      <td><button data-id="${student.id}">Delete</button></td>
    `;

    tableBody.appendChild(tr);
  });
}

// ---------- Add Student ----------
function addStudent(name, grade) {
  const newStudent = {
    id: nextId++,
    name: name.trim(),
    grade: Number(grade),
  };

  students.push(newStudent);
  saveToStorage();
  render();
}

// ---------- Delete Student ----------
function deleteStudentById(id) {
  students = students.filter((s) => s.id !== id);
  saveToStorage();
  render();
}

// ---------- Event: Submit Form ----------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent page reload

  const name = nameInput.value;
  const grade = gradeInput.value;

  const error = validateInputs(name, grade);
  if (error) {
    errorMsg.textContent = error;
    alert(error);
    return;
  }

  errorMsg.textContent = "";
  addStudent(name, grade);

  // reset inputs
  nameInput.value = "";
  gradeInput.value = "";
  nameInput.focus();
});

// ---------- Event: Delete Button (Event Delegation) ----------
tableBody.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName === "BUTTON") {
    const id = Number(target.dataset.id);
    deleteStudentById(id);
  }
});

// ---------- Start App ----------
loadFromStorage();
render();
