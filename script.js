// ===============================
//  CLOCK APP OBJECT
//  Handles time display, date display,
//  12/24-hour mode, theme switching,
//  icon updates, and top-of-hour alert
// ===============================
const clockApp = {

    intervalId: null,          // Stores the setInterval ID
    timeMode: `12`,            // Current time format: "24" or "12"
    themeMode: `auto`,         // Theme mode: "auto", "day", or "night"

    // -------------------------------
    // Start the clock and update every second
    // -------------------------------
    start() {
        this.updateClock();    // Show time immediately
        this.intervalId = setInterval(() => this.updateClock(), 1000);
    },

    // -------------------------------
    // Get the current system time
    // Returns an object with hours, minutes, seconds
    // -------------------------------
    getNow() {
        const now = new Date();
        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
        };
    },

    // -------------------------------
    // Format the time for display
    // Handles:
    // - Leading zeros
    // - 12/24-hour mode
    // - AM/PM suffix
    // - Animated colon <span> elements
    // -------------------------------
    formatTime() {
        let { hours, minutes, seconds } = this.getNow();

        const isPm = hours >= 12;
        let suffix = ``;

        // Add leading zeros
        const h = hours.toString().padStart(2, `0`);
        const m = minutes.toString().padStart(2, `0`);
        const s = seconds.toString().padStart(2, `0`);
        
        // Convert to 12-hour format if needed
        if (this.timeMode === `12`) {
            suffix = isPm ? ` PM` : ` AM`;
            hours = hours % 12;
            if (hours === 0) hours = 12;
        }

        // Return formatted time with pulsing colon animation
        return this.timeMode === `12`
            ? h + `<span class="pulse">:</span>` + m + `<span class="pulse">:</span>` + s + suffix
            : h + `<span class="pulse">:</span>` + m + `<span class="pulse">:</span>` + s;
    },

    // -------------------------------
    // Update icons + background theme
    // Supports:
    // - Auto mode (based on real time)
    // - Manual day mode
    // - Manual night mode
    // -------------------------------
    updateIcons() {
        const { hours } = this.getNow();
        const modeIcon = document.getElementById(`modeIcon`);
        const nightIcon = document.getElementById(`nightIcon`);
        const body = document.body;

        let isDay;

        // AUTO MODE: Day = 6am–6pm
        if (this.themeMode === `auto`) {
            isDay = hours >= 6 && hours < 18;
        }

        // MANUAL DAY MODE
        if (this.themeMode === `day`) {
            isDay = true;
        }

        // MANUAL NIGHT MODE
        if (this.themeMode === `night`) {
            isDay = false;
        }

        // Apply theme + icon updates
        if (isDay) {
            modeIcon.setAttribute(`name`, `sunny-outline`);
            nightIcon.classList.add(`hidden`);
            body.classList.add(`day-mode`);
            body.classList.remove(`night-mode`);
        } else {
            modeIcon.setAttribute(`name`, `moon-outline`);
            nightIcon.classList.add(`hidden`);
            body.classList.add(`night-mode`);
            body.classList.remove(`day-mode`);
        }
    },

    // -------------------------------
    // Toggle between 12-hour and 24-hour time formats
    // -------------------------------
    toggleTimeMode() {
        this.timeMode = this.timeMode === `24` ? `12` : `24`;
        this.updateModeButton();
        this.updateClock();
    },

    // -------------------------------
    // Toggle theme mode:
    // Auto → Day → Night → Auto
    // -------------------------------
    toggleThemeMode() {
        if (this.themeMode === `auto`) {
            this.themeMode = `day`;
        } else if (this.themeMode === `day`) {
            this.themeMode = `night`;
        } else {
            this.themeMode = `auto`;
        }

        this.updateThemeButton();
        this.updateClock();
    },

    // -------------------------------
    // Update the text on the hour mode button
    // -------------------------------
    updateModeButton() {
        const btn = document.getElementById(`hourModeBtn`);
        btn.textContent = this.timeMode === `24` ? `24-hour` : `12-hour`;
    },

    // -------------------------------
    // Update the text on the theme mode button
    // -------------------------------
    updateThemeButton() {
        const btn = document.getElementById(`themeToggleBtn`);

        if (this.themeMode === `auto`) btn.textContent = `Auto Mode`;
        if (this.themeMode === `day`) btn.textContent = `Day Mode`;
        if (this.themeMode === `night`) btn.textContent = `Night Mode`;
    },

    // -------------------------------
    // Update the clock + date on screen
    // Also triggers:
    // - Top-of-the-hour alert
    // - Icon/theme updates
    // -------------------------------
    updateClock() {
        const display = document.getElementById(`clock-display`);
        display.innerHTML = this.formatTime(); // Allows <span> animation

        const dateDisplay = document.getElementById(`date-display`);
        dateDisplay.textContent = this.formatDate();

        // Top of the Hour Alert (00:00)
        if (this.getNow().minutes === 0 && this.getNow().seconds === 0) {
            console.log(`Ding!`);
            alert(`Ding!`);
        }

        this.updateIcons();
    },

    // -------------------------------
    // Format the current date
    // Example: "Wednesday, April 29, 2026"
    // -------------------------------
    formatDate() {
        const now = new Date();
        const options = {
            weekday: `long`,
            year: `numeric`,
            month: `long`,
            day: `numeric`
        };
        return now.toLocaleDateString(`en-US`, options);
    }
};

// ===============================
// EVENT LISTENERS
// Connect buttons to their actions
// ===============================
const hourModeBtn = document.getElementById(`hourModeBtn`);
hourModeBtn.addEventListener(`click`, () => clockApp.toggleTimeMode());

const themeToggleBtn = document.getElementById("themeToggleBtn");
themeToggleBtn.addEventListener("click", () => clockApp.toggleThemeMode());

// Initialize UI + start clock
clockApp.updateModeButton();
clockApp.updateThemeButton();
clockApp.start();