let logList = [];
const logListElem = document.getElementById("logList");
const textarea = document.getElementById("violationLog");

function saveLogs() {
  localStorage.setItem("iron_logs", JSON.stringify(logList));
}

function loadLogs() {
  const stored = localStorage.getItem("iron_logs");
  if (stored) {
    logList = JSON.parse(stored);
    renderLogs();
  }
}

function renderLogs() {
  logListElem.innerHTML = "";
  logList.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerText = item;
    logListElem.appendChild(li);
  });
}

function logViolation() {
  const text = textarea.value.trim();
  if (text) {
    logList.push(text);
    textarea.value = "";
    saveLogs();
    renderLogs();
  }
}

window.onload = loadLogs;
