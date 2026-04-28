// Clock App Object
    const clockApp = {
        intervalId: null,
        timeMode: `24`, // `24` or `12`
    
    // Start the clock and update every second
        start() {
            this.updateClock();
            this.intervalId = setInterval(() => this.updateClock(), 1000);
        },

    // Get the current time from the system
        getNow() {
            const now = new Date();
            return {
                hours: now.getHours(),
                minutes: now.getMinutes(),
                seconds: now.getSeconds(),
            };
        },

    // Format Time
        formatTime() {
            let { hours, minutes, seconds } = this.getNow();

            const isPm = hours >= 12;
            let suffix = ``;

            if (this.timeMode === `12`) {
                suffix = isPm ? ` PM` : ` AM`;
                hours = hours % 12;
                if (hours === 0) hours = 12;
            }

            const h = hours.toString().padStart(2, `0`);
            const m = minutes.toString().padStart(2, `0`);
            const s = seconds.toString().padStart(2, `0`);

            return this.timeMode === `12` 
                ? h + `<span class="pulse">:</span>` + m + `<span class="pulse">:</span>` + s + suffix 
                : h + `<span class="pulse">:</span>` + m + `<span class="pulse">:</span>` + s;
        },
    
        themeMode: `auto`, // auto, day, night to

    // Sun & Moon Icon and Display
        updateIcons() {
            const { hours } = this.getNow();
            const modeIcon = document.getElementById(`modeIcon`);
            const nightIcon = document.getElementById(`nightIcon`);
            const body = document.body;

            let isDay;

            // AUTO MODE (based on real time)

            if (this.themeMode === `auto`) {
                isDay = hours >= 6 && hours < 18;
            }

            // Manual Day Mode
            if (this.themeMode === `day`) {
                isDay = true;
            }

            // Manual Night Mode
            if (this.themeMode === `night`) {
                isDay = false;
            }

            if (isDay) {
                modeIcon.setAttribute(`name`, `sunny-outline`);
                nightIcon.classList.add(`hidden`);
                body.classList.add(`day-mode`);
                body.classList.remove(`night-mode`);
            } else {
                modeIcon.setAttribute(`name`, `moon-outline`);
                body.classList.add(`night-mode`);
                body.classList.remove(`day-mode`);
            }
        },

    // Toggle 12/24 Hour Mode
        toggleTimeMode() {
            this.timeMode = this.timeMode === `24` ? `12` : `24`;
            this.updateModeButton();
            this.updateClock();
        },
    
    // Toggle Theme Mode (Auto → Day → Night)
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

        updateModeButton() {
            const btn = document.getElementById(`hourModeBtn`);
            btn.textContent = this.timeMode === `24` ? `24-hour` : `12-hour`;
        },
        
        updateThemeButton () {
            const btn = document.getElementById(`themeToggleBtn`);

            if (this.themeMode === `auto`) btn.textContent = `Auto Mode`;
            if (this.themeMode === "day") btn.textContent = "Day Mode";
            if (this.themeMode === "night") btn.textContent = "Night Mode";
        },

        updateClock() {
            const display = document.getElementById(`clock-display`);
            display.innerHTML = this.formatTime();

            const dateDisplay = document.getElementById(`date-display`);
            dateDisplay.textContent = this.formatDate();

        // Top of the Hour Alert
            if (this.getNow().minutes === 0 && this.getNow().seconds === 0) {
                console.log(`Ding!`)
                alert (`Ding!`);
            }

            this.updateIcons();
        },

        // Current Date
        formatDate() {
            const now = new Date ();

            const options = {
                weekday: `long`,
                year: `numeric`,
                month: `long`,
                day: `numeric`
            };

            return now.toLocaleDateString(`en-US`, options);
        }
    };

// Start Clock Display on Screen
const hourModeBtn = document.getElementById(`hourModeBtn`);
hourModeBtn.addEventListener(`click`, () => clockApp.toggleTimeMode());

const themeToggleBtn = document.getElementById("themeToggleBtn");
themeToggleBtn.addEventListener("click", () => clockApp.toggleThemeMode());

clockApp.updateModeButton();
clockApp.updateThemeButton();
clockApp.start();