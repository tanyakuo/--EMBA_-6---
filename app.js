// Course Schedule & Logic for NTUST EMBA Course Calendar

// 1. Course Information Data Structure
const COURSE_DATA = {
  accounting: {
    id: "accounting",
    name: "會計學",
    professor: "郭啟賢 教授",
    credits: 2,
    colorClass: "accounting",
    ta: {
      name: "簡紫婕",
      studentId: "M11408011",
      phone: "0966708093",
      email: "dudududu5033@gmail.com"
    },
    // Accounting dates: 115/06/19 - 07/11 (Fri, Sat)
    // Friday: 18:25-21:05
    // Saturday: 9:00-12:00, 13:00-16:00
    sessions: [
      { date: "2026-06-19", start: "18:25", end: "21:05", label: "週五晚上" },
      { date: "2026-06-20", start: "09:00", end: "12:00", label: "週六早上" },
      { date: "2026-06-20", start: "13:00", end: "16:00", label: "週六下午" },
      { date: "2026-06-26", start: "18:25", end: "21:05", label: "週五晚上" },
      { date: "2026-06-27", start: "09:00", end: "12:00", label: "週六早上" },
      { date: "2026-06-27", start: "13:00", end: "16:00", label: "週六下午" },
      { date: "2026-07-03", start: "18:25", end: "21:05", label: "週五晚上" },
      { date: "2026-07-04", start: "09:00", end: "12:00", label: "週六早上" },
      { date: "2026-07-04", start: "13:00", end: "16:00", label: "週六下午" },
      { date: "2026-07-10", start: "18:25", end: "21:05", label: "週五晚上" },
      { date: "2026-07-11", start: "09:00", end: "12:00", label: "週六早上" },
      { date: "2026-07-11", start: "13:00", end: "16:00", label: "週六下午" }
    ]
  },
  statistics: {
    id: "statistics",
    name: "統計學",
    professor: "葉瑞徽 教授",
    credits: 2,
    colorClass: "statistics",
    ta: {
      name: "鄭佩真",
      studentId: "M11301018",
      phone: "0968861539",
      email: "M11301018@mail.ntust.edu.tw"
    },
    // Statistics dates: 115/06/22 - 07/29 (Mon, Wed)
    // Time: 18:25-21:05
    sessions: [
      { date: "2026-06-22", start: "18:25", end: "21:05", label: "週一晚上" },
      { date: "2026-06-24", start: "18:25", end: "21:05", label: "週三晚上" },
      { date: "2026-06-29", start: "18:25", end: "21:05", label: "週一晚上" },
      { date: "2026-07-01", start: "18:25", end: "21:05", label: "週三晚上" },
      { date: "2026-07-06", start: "18:25", end: "21:05", label: "週一晚上" },
      { date: "2026-07-08", start: "18:25", end: "21:05", label: "週三晚上" },
      { date: "2026-07-13", start: "18:25", end: "21:05", label: "週一晚上" },
      { date: "2026-07-15", start: "18:25", end: "21:05", label: "週三晚上" },
      { date: "2026-07-20", start: "18:25", end: "21:05", label: "週一晚上" },
      { date: "2026-07-22", start: "18:25", end: "21:05", label: "週三晚上" },
      { date: "2026-07-27", start: "18:25", end: "21:05", label: "週一晚上" },
      { date: "2026-07-29", start: "18:25", end: "21:05", label: "週三晚上" }
    ]
  },
  economics: {
    id: "economics",
    name: "經濟學",
    professor: "洪東敏 教授",
    credits: 2,
    colorClass: "economics",
    ta: {
      name: "潘芊華",
      studentId: "B11108022",
      phone: "0966201918",
      email: "108ecaeunice@gmail.com"
    },
    // Economics dates: 115/06/23 - 07/23 (Tue, Thu) + 07/18 (Sat)
    // Time: Tue/Thu 18:25-21:05, Sat 9:00-12:00, 13:00-16:00
    sessions: [
      { date: "2026-06-23", start: "18:25", end: "21:05", label: "週二晚上" },
      { date: "2026-06-25", start: "18:25", end: "21:05", label: "週四晚上" },
      { date: "2026-06-30", start: "18:25", end: "21:05", label: "週二晚上" },
      { date: "2026-07-02", start: "18:25", end: "21:05", label: "週四晚上" },
      { date: "2026-07-07", start: "18:25", end: "21:05", label: "週二晚上" },
      { date: "2026-07-09", start: "18:25", end: "21:05", label: "週四晚上" },
      { date: "2026-07-14", start: "18:25", end: "21:05", label: "週二晚上" },
      { date: "2026-07-16", start: "18:25", end: "21:05", label: "週四晚上" },
      { date: "2026-07-18", start: "09:00", end: "12:00", label: "週六早上(特)" },
      { date: "2026-07-18", start: "13:00", end: "16:00", label: "週六下午(特)" },
      { date: "2026-07-21", start: "18:25", end: "21:05", label: "週二晚上" },
      { date: "2026-07-23", start: "18:25", end: "21:05", label: "週四晚上" }
    ]
  }
};

const COMMON_LOCATION = "國際大樓九樓 IB9 個案教室";

// 2. Application State
let state = {
  selectedCourses: ["accounting", "statistics", "economics"], // default
  currentView: "month", // "month" or "week"
  currentDate: new Date("2026-06-18T12:00:00"), // Today's initial simulated date
  calendarDate: new Date("2026-06-01T00:00:00"), // Month view navigation date (June 2026 default)
  weekStartDate: new Date("2026-06-15T00:00:00"), // Week view navigation date (June 15, 2026 default)
  isSimulated: false
};

// 3. Init Page
window.addEventListener("DOMContentLoaded", () => {
  loadStateFromURLAndStorage();
  initEventListeners();
  updateProgressStats();
  renderCalendar();
  updateSimulatorDisplay();
});

// Load settings
function loadStateFromURLAndStorage() {
  const urlParams = new URLSearchParams(window.location.search);
  const coursesParam = urlParams.get("c");
  
  if (coursesParam) {
    // Override from URL
    state.selectedCourses = coursesParam.split(",").filter(c => COURSE_DATA[c]);
    saveSelectedCoursesToStorage();
  } else {
    // Load from LocalStorage
    const stored = localStorage.getItem("emba_selected_courses");
    if (stored) {
      try {
        state.selectedCourses = JSON.parse(stored);
      } catch (e) {
        state.selectedCourses = ["accounting", "statistics", "economics"];
      }
    }
  }
  
  // Set checkboxes accordingly
  document.getElementById("chkAccounting").checked = state.selectedCourses.includes("accounting");
  document.getElementById("chkStatistics").checked = state.selectedCourses.includes("statistics");
  document.getElementById("chkEconomics").checked = state.selectedCourses.includes("economics");

  // Load theme
  const storedTheme = localStorage.getItem("emba_theme") || "dark";
  document.documentElement.setAttribute("data-theme", storedTheme);
  const themeToggle = document.getElementById("themeToggle");
  if (storedTheme === "light") {
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

function saveSelectedCoursesToStorage() {
  localStorage.setItem("emba_selected_courses", JSON.stringify(state.selectedCourses));
  updateURLQuery();
}

function updateURLQuery() {
  const url = new URL(window.location.href);
  url.searchParams.set("c", state.selectedCourses.join(","));
  // Keep the original openExternalBrowser if it was there
  if (window.location.search.includes("openExternalBrowser=1")) {
    url.searchParams.set("openExternalBrowser", "1");
  } else {
    url.searchParams.delete("openExternalBrowser");
  }
  window.history.replaceState({}, "", url.toString());
}

// 4. Events
function initEventListeners() {
  // Checkbox filters
  const checkboxes = {
    accounting: document.getElementById("chkAccounting"),
    statistics: document.getElementById("chkStatistics"),
    economics: document.getElementById("chkEconomics")
  };
  
  Object.keys(checkboxes).forEach(courseId => {
    checkboxes[courseId].addEventListener("change", (e) => {
      if (e.target.checked) {
        if (!state.selectedCourses.includes(courseId)) {
          state.selectedCourses.push(courseId);
        }
      } else {
        state.selectedCourses = state.selectedCourses.filter(c => c !== courseId);
      }
      saveSelectedCoursesToStorage();
      updateProgressStats();
      renderCalendar();
    });
  });

  // Theme Toggle
  document.getElementById("themeToggle").addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("emba_theme", newTheme);
    
    document.getElementById("themeToggle").innerHTML = 
      newTheme === "light" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  });

  // View Switcher (Month / Week)
  const btnMonthView = document.getElementById("btnMonthView");
  const btnWeekView = document.getElementById("btnWeekView");
  const monthContainer = document.getElementById("monthViewContainer");
  const weekContainer = document.getElementById("weekViewContainer");

  btnMonthView.addEventListener("click", () => {
    state.currentView = "month";
    btnMonthView.classList.add("active");
    btnWeekView.classList.remove("active");
    monthContainer.classList.remove("hidden");
    weekContainer.classList.add("hidden");
    renderCalendar();
  });

  btnWeekView.addEventListener("click", () => {
    state.currentView = "week";
    btnWeekView.classList.add("active");
    btnMonthView.classList.remove("active");
    monthContainer.classList.add("hidden");
    weekContainer.classList.remove("hidden");
    
    // If the viewed month is the same as the simulated "today" date, default to today's week.
    // Otherwise, align to the first week of the navigated month.
    if (state.calendarDate.getFullYear() === state.currentDate.getFullYear() &&
        state.calendarDate.getMonth() === state.currentDate.getMonth()) {
      alignWeekStartDateToCurrentDate();
    } else {
      alignWeekStartDateToCalendarDate();
    }
    renderCalendar();
  });

  // Calendar Navigation
  document.getElementById("btnPrev").addEventListener("click", () => {
    navigateCalendar(-1);
  });

  document.getElementById("btnNext").addEventListener("click", () => {
    navigateCalendar(1);
  });

  document.getElementById("btnToday").addEventListener("click", () => {
    // Jump to the month/week of current simulated date
    state.calendarDate = new Date(state.currentDate);
    state.calendarDate.setDate(1); // align month view to first of month
    alignWeekStartDateToCurrentDate();
    renderCalendar();
  });

  // Export ICS
  document.getElementById("btnExportICS").addEventListener("click", () => {
    exportCalendarICS();
  });

  // Share Link
  document.getElementById("btnShareLink").addEventListener("click", () => {
    copyShareLink();
  });

  // Accordion Contacts
  document.querySelectorAll(".contact-header").forEach(header => {
    header.addEventListener("click", () => {
      const parent = header.parentElement;
      const wasExpanded = parent.classList.contains("expanded");
      
      // Close all
      document.querySelectorAll(".contact-item").forEach(item => {
        item.classList.remove("expanded");
      });
      
      if (!wasExpanded) {
        parent.classList.add("expanded");
      }
    });
  });

  // Detail Modal Close
  document.getElementById("btnModalClose").addEventListener("click", closeModal);
  document.getElementById("detailModalOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("detailModalOverlay")) {
      closeModal();
    }
  });

  // Simulator Events
  document.getElementById("btnOpenSim").addEventListener("click", () => {
    const yyyy = state.currentDate.getFullYear();
    const mm = String(state.currentDate.getMonth() + 1).padStart(2, "0");
    const dd = String(state.currentDate.getDate()).padStart(2, "0");
    document.getElementById("simDateInput").value = `${yyyy}-${mm}-${dd}`;
    document.getElementById("simModalOverlay").classList.add("show");
  });

  document.getElementById("btnSimModalClose").addEventListener("click", () => {
    document.getElementById("simModalOverlay").classList.remove("show");
  });

  document.getElementById("simModalOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("simModalOverlay")) {
      document.getElementById("simModalOverlay").classList.remove("show");
    }
  });

  document.getElementById("btnResetSimDate").addEventListener("click", () => {
    state.currentDate = new Date("2026-06-18T12:00:00");
    state.isSimulated = false;
    updateSimulatorDisplay();
    updateProgressStats();
    renderCalendar();
    document.getElementById("simModalOverlay").classList.remove("show");
    showToast("已重置為系統預設時間 (2026/06/18)");
  });

  document.getElementById("btnApplySimDate").addEventListener("click", () => {
    const inputVal = document.getElementById("simDateInput").value;
    if (inputVal) {
      state.currentDate = new Date(inputVal + "T12:00:00");
      state.isSimulated = true;
      updateSimulatorDisplay();
      updateProgressStats();
      renderCalendar();
      document.getElementById("simModalOverlay").classList.remove("show");
      showToast(`已成功套用模擬日期：${inputVal}`);
    }
  });

  // Guide Tabs
  document.querySelectorAll(".guide-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".guide-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
      
      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(`pane-${tabId}`).classList.add("active");
    });
  });
}

// Align navigation helpers
function alignWeekStartDateToCalendarDate() {
  const d = new Date(state.calendarDate);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  state.weekStartDate = new Date(d.setDate(diff));
}

function alignWeekStartDateToCurrentDate() {
  const d = new Date(state.currentDate);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  state.weekStartDate = new Date(d.setDate(diff));
}

// 5. Calculations & Stats
function getActiveSessions() {
  let list = [];
  state.selectedCourses.forEach(courseId => {
    const course = COURSE_DATA[courseId];
    course.sessions.forEach(sess => {
      list.push({
        ...sess,
        courseId: course.id,
        courseName: course.name,
        professor: course.professor,
        colorClass: course.colorClass,
        ta: course.ta
      });
    });
  });
  // Sort by date then start time
  return list.sort((a, b) => {
    const dateDiff = new Date(a.date) - new Date(b.date);
    if (dateDiff !== 0) return dateDiff;
    return a.start.localeCompare(b.start);
  });
}

function updateProgressStats() {
  const activeSessions = getActiveSessions();
  const total = activeSessions.length;
  
  // Calculate completed (end date/time is prior to state.currentDate)
  let completed = 0;
  
  activeSessions.forEach(sess => {
    const sessEnd = new Date(`${sess.date}T${sess.end}:00`);
    if (sessEnd <= state.currentDate) {
      completed++;
    }
  });
  
  const remaining = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Update UI text
  let credits = 0;
  state.selectedCourses.forEach(c => {
    credits += COURSE_DATA[c].credits;
  });
  
  document.getElementById("statCredits").innerText = credits;
  document.getElementById("statCompleted").innerText = completed;
  document.getElementById("statRemaining").innerText = remaining;
  document.getElementById("progressPercent").innerText = `${percent}%`;
  document.getElementById("progressBarFill").style.width = `${percent}%`;
}

function updateSimulatorDisplay() {
  const textEl = document.getElementById("currentDateText");
  const footerEl = document.querySelector(".app-footer-bar p:last-child");
  
  const yyyy = state.currentDate.getFullYear();
  const mm = String(state.currentDate.getMonth() + 1).padStart(2, "0");
  const dd = String(state.currentDate.getDate()).padStart(2, "0");
  const dateStr = `${yyyy}/${mm}/${dd}`;
  
  if (state.isSimulated) {
    textEl.innerText = `模擬時間: ${dateStr}`;
    textEl.parentElement.style.borderColor = "var(--accent-primary)";
    footerEl.innerText = `今日模擬日期設定：${dateStr} (已啟用模擬)`;
  } else {
    textEl.innerText = `系統日期: ${dateStr}`;
    textEl.parentElement.style.borderColor = "var(--border-color)";
    footerEl.innerText = `今日模擬日期設定：${dateStr} (點擊右上方時鐘按鈕可模擬時間流逝)`;
  }
}

// 6. Navigation
function navigateCalendar(direction) {
  if (state.currentView === "month") {
    // Change by 1 month
    state.calendarDate.setMonth(state.calendarDate.getMonth() + direction);
    renderCalendar();
  } else {
    // Change by 7 days
    state.weekStartDate.setDate(state.weekStartDate.getDate() + (direction * 7));
    renderCalendar();
  }
}

// 7. Calendar Render
function renderCalendar() {
  if (state.currentView === "month") {
    renderMonthView();
  } else {
    renderWeekView();
  }
}

// Render Month
function renderMonthView() {
  const gridContainer = document.getElementById("monthGridDays");
  gridContainer.innerHTML = "";
  
  const year = state.calendarDate.getFullYear();
  const month = state.calendarDate.getMonth(); // 0-indexed
  
  // Set Calendar Header Title
  document.getElementById("calendarTitle").innerText = `${year} 年 ${month + 1} 月`;
  
  // First day of the month (0 = Sun, 1 = Mon ... 6 = Sat)
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Adjust firstDayIndex to make Monday index 0 (1=Mon, 2=Tue ... 6=Sat, 0=Sun becomes index 6)
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();
  
  const activeSessions = getActiveSessions();
  
  // Grid cell count: standard calendar has 35 or 42 grid cells
  const totalCells = startOffset + totalDays > 35 ? 42 : 35;
  
  // Render previous month overlap days
  for (let i = startOffset - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i;
    const dateObj = new Date(year, month - 1, dayNum);
    gridContainer.appendChild(createMonthDayCell(dateObj, false, activeSessions));
  }
  
  // Render current month days
  for (let i = 1; i <= totalDays; i++) {
    const dateObj = new Date(year, month, i);
    gridContainer.appendChild(createMonthDayCell(dateObj, true, activeSessions));
  }
  
  // Render next month overlap days
  const remainingCells = totalCells - (startOffset + totalDays);
  for (let i = 1; i <= remainingCells; i++) {
    const dateObj = new Date(year, month + 1, i);
    gridContainer.appendChild(createMonthDayCell(dateObj, false, activeSessions));
  }
}

function createMonthDayCell(date, isCurrentMonth, activeSessions) {
  const cell = document.createElement("div");
  cell.classList.add("month-day");
  
  if (!isCurrentMonth) {
    cell.classList.add("other-month");
  }
  
  // Check if Today
  const dateStr = formatDateString(date);
  const todayStr = formatDateString(state.currentDate);
  if (dateStr === todayStr) {
    cell.classList.add("today");
  }
  
  // Day number
  const numLabel = document.createElement("span");
  numLabel.classList.add("day-number");
  numLabel.innerText = date.getDate();
  cell.appendChild(numLabel);
  
  // Filter events on this date
  const dayEvents = activeSessions.filter(sess => sess.date === dateStr);
  
  if (dayEvents.length > 0) {
    const eventsContainer = document.createElement("div");
    eventsContainer.classList.add("day-events");
    
    dayEvents.forEach(sess => {
      const pill = document.createElement("div");
      pill.classList.add("event-pill", sess.colorClass);
      
      // Check if session completed
      const sessEnd = new Date(`${sess.date}T${sess.end}:00`);
      const isCompleted = sessEnd <= state.currentDate;
      if (isCompleted) {
        pill.classList.add("completed");
      }
      
      const shortName = sess.courseName.substring(0, 2);
      pill.innerHTML = `<span class="pill-name">${shortName}</span><span class="pill-time"> ${sess.start}</span>`;
      pill.title = `${sess.courseName} - ${sess.professor}\n時間: ${sess.start}-${sess.end}\n地點: ${COMMON_LOCATION}`;
      
      // Click event
      pill.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent triggering cell click
        openDetailModal(sess, dateStr);
      });
      
      eventsContainer.appendChild(pill);
    });
    
    cell.appendChild(eventsContainer);
    
    // Double click or click on cell also opens first event info
    cell.addEventListener("click", () => {
      openDetailModal(dayEvents[0], dateStr);
    });
  } else {
    // Empty cell click
    cell.addEventListener("click", () => {
      // do nothing or create simulation?
    });
  }
  
  return cell;
}

// Render Week
function renderWeekView() {
  const headerContainer = document.getElementById("weekGridHeader");
  const bodyContainer = document.getElementById("weekGridBody");
  
  headerContainer.innerHTML = "";
  bodyContainer.innerHTML = "";
  
  const weekDays = [];
  const start = new Date(state.weekStartDate);
  
  // Set Calendar Header Title (Show range of the week)
  const weekEnd = new Date(start);
  weekEnd.setDate(weekEnd.getDate() + 6);
  
  const formatRangeText = (d) => `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
  document.getElementById("calendarTitle").innerText = `${String(start.getMonth()+1)}月 ${start.getDate()}日 - ${String(weekEnd.getMonth()+1)}月 ${weekEnd.getDate()}日`;
  
  const activeSessions = getActiveSessions();
  const weekdayNames = ["一", "二", "三", "四", "五", "六", "日"];
  
  // Generate headers and data structures for 7 days
  for (let i = 0; i < 7; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    const dateStr = formatDateString(current);
    
    // Header
    const headerDay = document.createElement("div");
    headerDay.classList.add("week-header-day");
    
    const isToday = dateStr === formatDateString(state.currentDate);
    if (isToday) {
      headerDay.classList.add("today");
    }
    
    headerDay.innerHTML = `
      <span class="day-num">${current.getDate()}</span>
      <span class="day-name">週${weekdayNames[i]}</span>
    `;
    headerContainer.appendChild(headerDay);
    
    // Column Body
    const col = document.createElement("div");
    col.classList.add("week-column");
    if (isToday) col.classList.add("today");
    
    // Day sessions
    const daySessions = activeSessions.filter(sess => sess.date === dateStr);
    
    if (daySessions.length > 0) {
      daySessions.forEach(sess => {
        const card = document.createElement("div");
        card.classList.add("week-event-card", sess.colorClass);
        
        const sessEnd = new Date(`${sess.date}T${sess.end}:00`);
        const isCompleted = sessEnd <= state.currentDate;
        if (isCompleted) {
          card.classList.add("completed");
        }
        
        card.innerHTML = `
          <span class="week-event-time"><i class="fa-regular fa-clock"></i> ${sess.start} - ${sess.end}</span>
          <span class="week-event-title">${sess.courseName}</span>
          <span class="week-event-location"><i class="fa-solid fa-location-dot"></i> IB9 個案教室</span>
        `;
        
        card.addEventListener("click", () => {
          openDetailModal(sess, dateStr);
        });
        
        col.appendChild(card);
      });
    } else {
      const emptyText = document.createElement("span");
      emptyText.classList.add("week-empty-text");
      emptyText.innerText = "無課程";
      col.appendChild(emptyText);
    }
    
    bodyContainer.appendChild(col);
  }
}

// 8. Modals Management
function openDetailModal(sess, dateStr) {
  // Translate ISO date back to Minguo 115 format for UI
  const parts = dateStr.split("-");
  const yearMinguo = parseInt(parts[0]) - 1911; // 2026 - 1911 = 115
  const minguoDateStr = `${yearMinguo}/${parts[1]}/${parts[2]}`;
  
  // Weekday translation
  const dateObj = new Date(sess.date);
  const weekdayNames = ["日", "一", "二", "三", "四", "五", "六"];
  const dayName = weekdayNames[dateObj.getDay()];
  
  document.getElementById("modalCourseName").innerText = sess.courseName;
  document.getElementById("modalDate").innerHTML = `<i class="fa-regular fa-calendar"></i> 民國 ${minguoDateStr} (週${dayName})`;
  document.getElementById("modalTime").innerHTML = `<i class="fa-regular fa-clock"></i> ${sess.start} - ${sess.end}`;
  document.getElementById("modalProfessor").innerHTML = `<i class="fa-solid fa-chalkboard-user"></i> ${sess.professor}`;
  
  document.getElementById("modalTAName").innerText = sess.ta.name;
  document.getElementById("modalTAId").innerText = sess.ta.studentId;
  
  // Set Contact Buttons Actions
  const phoneBtn = document.getElementById("modalTAPhoneBtn");
  phoneBtn.href = `tel:${sess.ta.phone}`;
  phoneBtn.innerHTML = `<i class="fa-solid fa-phone"></i> 撥打: ${sess.ta.phone}`;
  
  const emailBtn = document.getElementById("modalTAEmailBtn");
  emailBtn.href = `mailto:${sess.ta.email}`;
  
  document.getElementById("detailModalOverlay").classList.add("show");
}

function closeModal() {
  document.getElementById("detailModalOverlay").classList.remove("show");
}

// 9. Helpers
function formatDateString(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// 10. Share Link Generator
function copyShareLink() {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("c", state.selectedCourses.join(","));
  url.searchParams.set("openExternalBrowser", "1"); // Force open in external browser for LINE
  
  const linkStr = url.toString();
  
  navigator.clipboard.writeText(linkStr).then(() => {
    showToast("分享連結已複製！可以在 LINE 貼上分享給同學。");
  }).catch(err => {
    // Fallback copy
    const el = document.createElement("textarea");
    el.value = linkStr;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    showToast("分享連結已複製！");
  });
}

// 11. ICS Calendar Generator
function exportCalendarICS() {
  if (state.selectedCourses.length === 0) {
    alert("請至少選擇一門課程進行匯出！");
    return;
  }
  
  const activeSessions = getActiveSessions();
  
  let icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NTUST EMBA//Course Calendar//ZH",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];
  
  // Add timezone block for Asia/Taipei to ensure 100% correct parsing across regions
  icsLines = icsLines.concat([
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Taipei",
    "LAST-MODIFIED:20201011T015911Z",
    "TZURL:http://tzurl.org/zoneinfo-outlook/Asia/Taipei",
    "X-LIC-LOCATION:Asia/Taipei",
    "BEGIN:STANDARD",
    "TZNAME:CST",
    "TZOFFSETFROM:+0800",
    "TZOFFSETTO:+0800",
    "DTSTART:19700101T000000",
    "END:STANDARD",
    "END:VTIMEZONE"
  ]);
  
  activeSessions.forEach(sess => {
    const uid = `${sess.courseId}-${sess.date.replace(/-/g, "")}T${sess.start.replace(/:/g, "")}@emba.ntust.edu.tw`;
    
    // Format DTSTART / DTEND
    const dtStartStr = sess.date.replace(/-/g, "") + "T" + sess.start.replace(/:/g, "") + "00";
    const dtEndStr = sess.date.replace(/-/g, "") + "T" + sess.end.replace(/:/g, "") + "00";
    
    // Description text (newline represented by \n in ICS)
    const description = `授課教授: ${sess.professor}\\n上課地點: ${COMMON_LOCATION}\\n助教資訊:\\n姓名: ${sess.ta.name}\\n學號: ${sess.ta.studentId}\\n電話: ${sess.ta.phone}\\n信箱: ${sess.ta.email}\\n\\n本檔案由 EMBA 課程時間表網站匯出`;
    
    icsLines.push("BEGIN:VEVENT");
    icsLines.push(`UID:${uid}`);
    icsLines.push(`DTSTAMP:${formatDTStamp()}`);
    icsLines.push(`DTSTART;TZID=Asia/Taipei:${dtStartStr}`);
    icsLines.push(`DTEND;TZID=Asia/Taipei:${dtEndStr}`);
    icsLines.push(`SUMMARY:${sess.courseName} - ${sess.professor}`);
    icsLines.push(`LOCATION:${COMMON_LOCATION}`);
    icsLines.push(`DESCRIPTION:${description}`);
    icsLines.push("END:VEVENT");
  });
  
  icsLines.push("END:VCALENDAR");
  
  const icsString = icsLines.join("\r\n");
  
  // Download blob
  const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  
  // Dynamic filename based on courses
  const courseShortNames = state.selectedCourses.map(c => COURSE_DATA[c].name).join("_");
  downloadLink.download = `台科EMBA_富6課表_${courseShortNames}.ics`;
  
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  
  showToast("課表行事曆 (.ics) 已開始下載，請參照下方教學匯入！");
}

function formatDTStamp() {
  const d = new Date();
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const min = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`;
}
