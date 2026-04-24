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
    
    // Sun & Moon Icon and Display
        updateIcons() {
            const { hours } = this.getNow();
            const modeIcon = document.getElementById(`modeIcon`);
            const nightIcon = document.getElementById(`nightIcon`);
            const isDay = hours >= 6 && hours < 18;
            const body = document.body;

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

    // Button Swap Clock Mode
        toggleTimeMode() {
            this.timeMode = this.timeMode === `24` ? `12` : `24`;
            this.updateModeButton();
            this.updateClock(); // refresh display immediately
        },

        updateModeButton() {
            const btn = document.getElementById(`hourModeBtn`);
            btn.textContent = this.timeMode === `24` ? `24-hour` : `12-hour`;
        },
        
        updateClock() {
            const display = document.getElementById(`clock-display`);
            display.textContent = this.formatTime();

            const dateDisplay = document.getElementById(`date-display`);
            dateDisplay.textContent = this.formatDate();

            display.innerHTML = this.formatTime(); //Keep <span> from displaying on screen

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

clockApp.updateModeButton();
clockApp.start();