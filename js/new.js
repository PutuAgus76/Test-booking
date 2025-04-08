const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventBtn = document.querySelector(".add-event"), 
    addEventWrapper = document.querySelector(".add-event-wrapper"), 
    addEventCloseBtn = document.querySelector(".close"), 
    addEventTitle = document.querySelector('.event-name'), 
    addEventFrom = document.querySelector('.event-time-from'), 
    addEventTo = document.querySelector('.event-time-to'),
    addEventSubmit = document.querySelector('.add-event-btn');

// Checkbox for protection
const protectionCheckbox = document.getElementById("btn-check-5");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
let isProtected = false; // Add a variable to track protection status

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const eventsArr = [];
getEvents();
console.log(eventsArr);

// Function to initialize calendar
function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();	
    const nextDays = (7 - lastDay.getDay() - 1);

    date.innerHTML = `${months[month]} ${year}`;

    let days = "";

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        let event = false;
        eventsArr.forEach(eventObj => {
            if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
                event = true;
            }
        });
        
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
            if (event) {	
                days += `<div class="day today active event">${i}</div>`;
            } else {	
                days += `<div class="day today active">${i}</div>`;
            }
        } else {	
            if (event) {	
                days += `<div class="day event">${i}</div>`;
            } else {	
                days += `<div class="day">${i}</div>`;
            }
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    
    daysContainer.innerHTML = days;
    addListener();  
}

// Function to navigate between months
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();  
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();  
}

prev.addEventListener("click", prevMonth);   
next.addEventListener("click", nextMonth);   

initCalendar();

// Function to handle day clicks
function addListener() {
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        day.addEventListener('click', e => {
            getActiveDay(e.target.innerHTML);    
            updateEvents(Number(e.target.innerHTML));    
            activeDay = Number(e.target.innerHTML);    
            // Remove Active Class
            days.forEach(day => {   
                day.classList.remove('active');   
            });
            // If clicked on previous or next date switch months
            if (e.target.classList.contains('prev-date')) {   
                prevMonth();  
                setTimeout(() => {     
                    const days = document.querySelectorAll('.day');
                    days.forEach(day => {      
                        if (!day.classList.contains('prev-date') && day.innerHTML === e.target.innerHTML) {       
                            day.classList.add('active');      
                        }        
                    });     
                }, 100);    
            } else if (e.target.classList.contains('next-date')) {       
                nextMonth();        
                setTimeout(() => {         
                    const days = document.querySelectorAll('.day');
                    days.forEach(day => {          
                        if (!day.classList.contains('next-date') && day.innerHTML === e.target.innerHTML) {           
                            day.classList.add('active');         
                        }         
                    });        
                }, 100);       
            } else {
                e.target.classList.add('active');      
            }      
        });
    });
}

// Set today's button functionality
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();  
    initCalendar();  
});

// Handle input in date field
dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }

    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

// Go to specific date function when button clicked.
gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    console.log("here");
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Invalid Date");
}

// Get Active Day and Update Event Day and Event Dates.
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName; 
    eventDate.innerHTML = `${date} ${months[month]} ${year}`;
}

// Update Events when a specific day is selected.
function updateEvents(date) {
    let events = "";
    eventsArr.forEach(event => {
        if (date === event.day && month + 1 === event.month && year === event.year) {
            event.events.forEach(event => {
                events += `
                <div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title"> ${event.title} </h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time"> ${event.time} </span>
                    </div>
                </div>`;
            });
        }
    });

    if (events === "") {
        events = `<div class="no-event">
                    <h3>No Events</h3>
                 </div>`;
    }

    eventsContainer.innerHTML = events;

    saveEvents();
}

// Prompt user for password before adding an Event.
function checkPassword(action) {
    const password = prompt("Please enter the password:");
    if (password === "xyz") {
        action();
    } else {
        alert("Incorrect Password!");
    }
}

// Modify Add Event Button functionality.
addEventBtn.addEventListener("click", () => {
    if (isProtected) {
        checkPassword(() => {
            addEventWrapper.classList.toggle("active");
        });
    }
});

// Allow only certain characters in Event Title input field.
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
});

// Allow only time format in 'from' and 'to' fields of events.
addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }

    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

// Similar logic applies here as well:
addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }

    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

// Functionality to submit added events into array of events.
addEventSubmit.addEventListener("click", (e) => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    // Check all fields are filled out before submission:
    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
        alert("Please fill all fields");
        return;
    }
    // Check correct time format:
    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    // Validate Time Format:
    if (timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59) {
        alert("Invalid Time Format");
        return;
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    // Check whether this title already exists:
    let eventExist = false;

    // Loop through existing events:
    eventsArr.forEach((item) => {
        // Compare against each item’s title:
        if (item.day === activeDay && item.month === month + 1 && item.year === year) {
            item.events.forEach((evtItem) => {
                // Mark as true once found:
                if (evtItem.title === eventTitle) {
                    eventExist = true;
                }
            });
        }
    });

    // Alert user that it already exists:
    if (eventExist) {
        alert("This event has been added");
        return;
    }

    // Create New Event Object:
    const newEvent = {
        title: eventTitle,
        time: `${timeFrom}-${timeTo}`
    };

    // Log New Event Object:
    console.log(newEvent);

    // Log Active Day Value:
    console.log(activeDay);

    // Flag indicating whether we need to push or append this object into our array of objects.
    let eventAdded = false;

    // Loop through existing items again checking where we should place our newly created object.
    if (eventsArr.length > 0) {
        // Iterate over each item again checking conditions against current values stored within them.
        eventsArr.forEach((item) => {
            if (item.day === activeDay && item.month === month + 1 && item.year === year) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    // Push New Item Into Array Of Objects If Not Found In Existing Items Yet:
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent]
        });
    }

    // Clear Input Fields After Submission Is Successful:
    console.log(eventsArr);

    addEventWrapper.classList.remove("active");

    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    // Call Update Events To Refresh Displayed List Of Events On Calendar View.
    updateEvents(activeDay);

    // Select Active Day And Add Class To It For Visual Feedback.
    const activeDayElement = document.querySelector(`.day.active`);

    if (!activeDayElement.classList.contains("event")) {
        activeDayElement.classList.add("event");
    }
});

// Delete An Existing Event When Clicked On It By User
eventsContainer.addEventListener("click", e => {
    // Only Proceed With Deletion Logic When The Target Element Has A Specific Class Name Assigned To It.
    if (e.target.classList.contains("event")) {
        if (isProtected) {
            // Prompt User For Confirmation Before Proceeding With Deletion Logic:
            checkPassword(() => {
                // Confirm Action From User Before Proceeding Further:
                if (confirm("Are you sure you want to delete this event?")) {
                    // Get Title Of The Selected Item That Needs Deleting From DOM Tree Structure Based On Its Children Elements’ Hierarchy:
                    const eventTitle = e.target.children[0].children[1].innerHTML;

                    // Loop Through All Current Items In Our Array Checking Against Each One Until We Find A Match:
                    eventsArr.forEach(eventItem => {
                        // Compare Against Each Item’s Properties Values Until We Find A Match For Both Conditions Below:
                        if (eventItem.day === activeDay && eventItem.month === month + 1 && eventItem.year === year) {
                            // Now Iterate Over Each Individual Child Element Within This Parent Object Checking Their Titles As Well Until We Find A Match Again:
                            eventItem.events.forEach((item, index) => {
                                // Once Found Remove This Specific Index From The Parent Array Using Splice Method Available To Us Here:
                                if (item.title === eventTitle) {
                                    eventItem.events.splice(index, 1);
                                }
                            });

                            // Now Check Whether There Are Any Remaining Items Left Underneath This Parent Object After Removal Occurred Above And Clean Up Accordingly By Removing Entirely As Needed Too!
                            // Also Remove Associated Classes Attached To Current Selected Active Element As Well So They Don’t Remain Visible Anymore Either!
                            // Finally Call Update Events Again At End Here So Everything Reflect Changes Made Accordingly!
                            updateEvents(activeDay);
                        }
                    });
                }
            });
        }
    }
});

// Save All Current State Data Into Local Storage Whenever Changes Occur During Runtime Operations Like Adding Or Removing Items Etc...
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

// Retrieve Saved Data Back Out From Local Storage Whenever Page Loads Initially Or Anytime Else Needed Later Down Line Too...
function getEvents() {
    // First Check Whether Anything Exists Already Inside Local Storage Before Attempting Retrieval Process Here...
    if (localStorage.getItem("events") !== null) {
        eventsArr.push(...JSON.parse(localStorage.getItem("events")));
    }
}

// Convert Time Format Helper Method Used Throughout Codebase Where Necessary...
function convertTime(time) {
    let timeArray = time.split(':');
    let hour = timeArray[0];
    let minute = timeArray[1];
    let format = (hour >= 12) ? 'PM' : 'AM';
    hour = (hour % 12) || 12;
    return `${hour}:${minute}${format}`;
}

// Functionality Updates End Time Based On Start Input Field Value Automatically Adjusting Accordingly Depending Upon What Was Entered Previously By Users...
function updateEndTime() {
    const startInput = document.getElementById("startTime");
    const endInput = document.getElementById("endTime");

    if (startInput.value !== '') { 
        let [hours, minutes] = startInput.value.split(':').map(Number);
        minutes += 30;

        // Handle Overflow Cases Where Minutes Exceed Limitations Set Forth Earlier Above...
        if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes %= 60;
        }

        // Format Final Output Result Back Into Desired String Representation Formatted Correctly According To Requirements Specified Earlier...
        endInput.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    } else {
        endInput.value = '';
    }
}

// Checkbox listener for enabling/disabling adding/deleting events based on protection status
protectionCheckbox.addEventListener('change', function() {
    isProtected = !isProtected; // Toggle the protected state

    if (isProtected) {
        alert('Activated');
        addEventBtn.style.display = 'block'; // Show the Add Event button
    } else {
        alert('Deactivated');
        addEventBtn.style.display = 'none'; // Hide the Add Event button
        addEventWrapper.style.display = 'none'; // Hide the Add Event wrapper
    }
});
