// Clock App Object
    const clockApp = {
        intervalId: null,

        getTimeString: function() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            // Add leading zeros
            hours = hours.toString().padStart(2, `0`);
            minutes = minutes.toString().padStart(2, `0`);
            seconds = seconds.toString().padStart(2, `0`);

            return hours + ':' + minutes + `:` + seconds; 
        },

        updateClock: function() {
            document.getElementById(`clock-display`).innerHTML = this.getTimeString();
        },

        start: function() {
            this.updateClock();
            this.intervalId = setInterval(() => {
                this.updateClock();
            }, 1000);
        }
    };

// Start the Clock
    clockApp.start();

// Convert to Hour Mode (12-hour)
    function convertToHourMode() {
        const now = new Date();
        let hours = now.getHours();

        if (hours > 12) {
            hours = hours - 12;
        }

        return hours;
    }

// AM/PM
    function amPM() {
        const now = new Date();
        return now.getHours() >= 12 ? `PM` : `AM`;
    }

// Example button hookup
    const hourModeBtn = document.getElementById("hourModeBtn");

hourModeBtn.addEventListener("click", () => {
    console.log("Hour Mode Clicked");
    convertToHourMode();
});