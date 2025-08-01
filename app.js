// ----------- Firebase Configuration -----------
const firebaseConfig = {
  apiKey: "AIzaSyCfSGEqZkHNQ4qme3LXZOXp8GGMFwI00nU",
  authDomain: "discipline-tracker-1.firebaseapp.com",
  databaseURL: "https://discipline-tracker-1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "discipline-tracker-1",
  storageBucket: "discipline-tracker-1.firebasestorage.app",
  messagingSenderId: "145989174688",
  appId: "1:145989174688:web:5c08cbc3f945de356550c5"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const userId =
  "uniqueUser_" + (localStorage.uid || (localStorage.uid = (Math.random() + "").slice(2)));
const dbPath = "users/" + userId + "/appData";

// ---------------- App State -----------------
let appData = {
  rules: [
    { id: "1.1", name: "Missed 0730 planning", count: 0, color: "#FF6B6B" },
    { id: "1.2", name: "Missed 2230 review", count: 0, color: "#4ECDC4" },
    { id: "1.3", name: "Late task start", count: 0, color: "#45B7D1" },
    { id: "1.4", name: "Dropped task midway", count: 0, color: "#96CEB4" },
    { id: "1.5", name: "Watched adult content", count: 0, color: "#FFEAA7" }
  ],
  violationLogs: [],
  progress: 0,
  cleanDays: 0
};

const violationTypes = {
  "1.1": [
    { level: 1, text: "Planned at 0800 due to laziness", punishment: "30-min penalty task + no tea/snack" },
    { level: 2, text: "Planned late 2–3 times/week", punishment: "₹100 fine + no phone till 10AM + redo plan log" },
    { level: 3, text: "No planning entire week", punishment: "3-day 4AM wakeup + cold bath + 5km walk" },
    { level: 4, text: "Rejected planning system for 5+ days", punishment: "7-day reset: 4AM wake, 1 meal/day, mirror ban, silence till noon" }
  ],
  "1.2": [
    { level: 1, text: "Forgot once, distracted by phone", punishment: "Cold sit (15 mins) + redo log + no pillow" },
    { level: 2, text: "Skipped review 2–3× week", punishment: "2-page weekly log + digital blackout after 9PM" },
    { level: 3, text: "Lied in log or fake review", punishment: "Handwrite full week log + 3-min voice confession" },
    { level: 4, text: "Faked review all week or refused log", punishment: "7-day Truth Journal + record 5-min 'I Lied' confession" }
  ],
  // ...repeat for other rules, same as original...
};

// --------- DOM Elements -----------
const sections = {
  dashboard: document.getElementById("dashboard-content"),
  rules: document.getElementById("rules-content"),
  logs: document.getElementById("logs-content"),
  charts: document.getElementById("charts-content"),
  history: document.getElementById("history-content")
};
const statusEl = document.getElementById("status");

// --------- Functions -----------

function saveDataCloud() {
  db.ref(dbPath).set(appData, (error) => {
    if (error) updateStatus("❌ Error saving data!", true);
    else updateStatus("✅ Data saved to cloud");
  });
}

function loadDataCloud() {
  return db
    .ref(dbPath)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        appData = snapshot.val();
        renderCurrentTab();
        updateStatus("🔄 Data loaded from cloud");
      } else {
        renderCurrentTab();
        updateStatus("⚠️ No cloud data found; using defaults");
      }
    })
    .catch(() => updateStatus("❌ Failed to load from cloud", true));
}

function updateStatus(msg, isError = false) {
  if (statusEl) {
    statusEl.textContent = "Status: " + msg;
    statusEl.style.color = isError ? "#b91c1c" : "#2563eb";
    setTimeout(() => {
      statusEl.textContent = "Status: 🔄 Ready";
      statusEl.style.color = "#2563eb";
    }, 3000);
  }
}

// Multiple tab handling
function setActiveTab(tabName) {
  // Toggle tab button active classes
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  // Show/hide sections
  Object.keys(sections).forEach((key) => {
    sections[key].classList.toggle("hidden", key !== tabName);
  });

  renderCurrentTab(tabName);
}

function renderCurrentTab(tab = "dashboard") {
  switch (tab) {
    case "dashboard":
      renderDashboard();
      break;
    case "rules":
      renderRules();
      break;
    case "logs":
      renderLogs();
      break;
    case "charts":
      renderCharts();
      break;
    case "history":
      renderHistory();
      break;
  }
}

// You can expand these render functions with UI, events, etc. 
// Here's a minimal example for dashboard and rules

function renderDashboard() {
  const d = sections.dashboard;
  if (!d) return;
  const totalViolations = appData.rules.reduce((a, r) => a + (r.count || 0), 0);
  d.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
    <p>Total violations: <strong>${totalViolations}</strong></p>
    <p>Progress: <strong>${appData.progress}/10</strong></p>
    <p>Clean days: <strong>${appData.cleanDays}</strong></p>
  `;
}

function renderRules() {
  const d = sections.rules;
  if (!d) return;
  d.innerHTML = "<h2 class='text-2xl font-bold mb-4'>Rules</h2>";
  appData.rules.forEach(rule => {
    d.innerHTML += `
      <div class="mb-4 p-4 border-l-4" style="border-color:${rule.color};">
        <strong>Rule ${rule.id}:</strong> ${rule.name} — Break count: ${rule.count || 0}
      </div>`;
  });
}

// Setup event listeners on tab buttons
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
});

// Live listener for cloud updates (sync across devices)
db.ref(dbPath).on("value", (snapshot) => {
  if (snapshot.exists()) {
    appData = snapshot.val();
    renderCurrentTab(activeTab);
  }
});

// Initialize
let activeTab = "dashboard";
window.addEventListener("load", () => {
  setActiveTab(activeTab);
  loadDataCloud();
});
