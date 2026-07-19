import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Calendar.scss";
import Layout from "../../components/Layout/Layout";
import ScheduleWorkoutModal from "../../components/ScheduleWorkoutModal/ScheduleWorkoutModal";
import { getScheduledSessions, getSessions } from "../../api/sessions";
import { useUser } from "@clerk/react";
import { getSessionsByUserId } from "../../api/users";

function Calendar({ onDateSelect }) {
  // state to check to set open or close status on routine selector modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // currentDate holds what month/year we're currently looking at
  // We initialize it with "new Date()" which gives us RIGHT NOW (today)
  // WHY? Because when you open a calendar, you want to see THIS month, not January 1970
  const [currentDate, setCurrentDate] = useState(new Date());

  // selectedDate remembers which day the user clicked on
  // We start with null because the user hasn't clicked anything yet
  const [selectedDate, setSelectedDate] = useState(null);

  const [allSessions, setAllSessions] = useState(null);
  const [scheduledDates, setScheduledDates] = useState(null);
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const { user } = useUser();

  async function fetchAndSetSessions() {
    if (!user?.id) {
      return;
    }
    const data = await getSessionsByUserId(user.id);
    const dates = new Set(
      data.map(
        (s) => new Date(s.scheduledDate ?? s.date).toISOString().split("T")[0],
      ),
    );
    setAllSessions(data);
    setScheduledDates(dates);
  }

  useEffect(() => {
    fetchAndSetSessions();
  }, [user]);

  function handleScheduled(session) {
    const dateStr = new Date(session.scheduledDate).toISOString().split("T")[0];
    setScheduledDates((prev) => new Set([...prev, dateStr]));
    setAllSessions((prev) => [...prev, session]);
    setScheduledSessions((prev) => [...prev, session]);
  }

  function handleRemove(sessionId) {
    // So pass an onRemove prop from Calendar to the modal, and in handleRemoveRoutine call both the delete API and onRemove(sessionId). Then in Calendar, onRemove filters it out of allSessions and scheduledDates.
    let sessionToRemove = allSessions.find(
      (session) => session.id == sessionId,
    );

    setAllSessions(allSessions.filter((session) => session.id !== sessionId));

    let sessionDate = new Date(sessionToRemove.scheduledDate)
      .toISOString()
      .split("T")[0];
    setScheduledDates(
      new Set(
        Array.from(scheduledDates).filter(
          (scheduled) => scheduled !== sessionDate,
        ),
      ),
    );
    setScheduledSessions(
      scheduledSessions.filter((session) => session.id !== sessionId),
    );
  }

  // This function moves us to the PREVIOUS month
  function goToPreviousMonth() {
    // We create a NEW date object (we don't modify the old one - that's a React no-no)
    const newDate = new Date(currentDate);

    // setMonth() changes the month. We do currentDate.getMonth() - 1
    // getMonth() returns 0 for January, 1 for February, etc.
    // So if we're in March (2), doing 2-1 gives us February (1)
    // BONUS: JavaScript is smart! If you're in January (0) and do 0-1,
    // it automatically wraps to December of the PREVIOUS YEAR
    newDate.setMonth(currentDate.getMonth() - 1);

    // Update our state with the new date
    // This triggers a re-render, so the calendar updates on screen
    setCurrentDate(newDate);
  }

  // This function moves us to the NEXT month
  function goToNextMonth() {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);

    setCurrentDate(newDate);
  }

  // This function handles when a user CLICKS on a day
  // "day" is the number (like 1, 2, 3... 31)
  function handleDayClick(day) {
    // We create a new Date object for the specific day they clicked
    // We use currentDate to get the right month and year
    // WHY? Because if you click "15" we need to know if it's March 15 or April 15
    const clickedDate = new Date(
      currentDate.getFullYear(), // Gets the year (like 2026)
      currentDate.getMonth(), // Gets the month (0-11)
      day, // The day they clicked (1-31)
    );

    let clickedDateStr = clickedDate.toISOString().split("T")[0];

    const schedSessions = allSessions.filter(
      (session) =>
        clickedDateStr ===
        (session.scheduledDate ?? session.date).split("T")[0],
    );

    setScheduledSessions(schedSessions);

    // Pass selectedDaySessions to the modal
    // In the modal, if selectedDaySessions has items, render them with Start and Delete buttons. Otherwise just show the routine picker.

    // Update our selectedDate state so we remember what they clicked
    setSelectedDate(clickedDate);
    setIsModalOpen(true);

    // Call the onDateSelect function that was passed in as a prop
    // This lets the PARENT component know "hey, the user picked a date!"
    // WHY? The parent might want to do something with this date, like open a modal
    // to schedule a workout
    if (onDateSelect) {
      onDateSelect(clickedDate);
    }
  }

  // ===== DATE CALCULATIONS =====
  // These functions figure out what days to show in the calendar grid

  // This gets us an array of all the day names (abbreviated)
  // WHY an array? Because we need to loop through them to create the header row
  function getDayNames() {
    return ["S", "M", "T", "W", "T", "F", "S"];
  }

  // This figures out how many days are in the current month
  // WHY? Because February has 28/29 days, but July has 31
  function getDaysInMonth() {
    // This is a JavaScript TRICK:
    // If you create a date for day 0 of NEXT month, it gives you the LAST day of THIS month
    // Example: Day 0 of March = February 28 (or 29)
    // The getDate() then tells us that number (28, 29, 30, or 31)
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1, // Next month
      0, // Day 0 = last day of previous month (which is our current month)
    ).getDate();
  }

  // This figures out what day of the week the month STARTS on
  // WHY? Because January 1st might be a Wednesday, so we need to know
  // where to place it in our calendar grid
  function getFirstDayOfMonth() {
    // We create a date for the 1st of the current month
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1, // The 1st day
    );

    // getDay() returns 0 for Sunday, 1 for Monday, etc.
    // This tells us which column the month should START in
    return firstDay.getDay();
  }

  // This creates an array of all the days we need to DISPLAY
  // WHY an array? So we can use .map() to create a grid of day cells
  function generateCalendarDays() {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const days = [];

    // STEP 1: Add empty cells for days BEFORE the month starts
    // Example: If the month starts on Wednesday, we need 3 empty cells
    // (for Sunday, Monday, Tuesday)
    // WHY? So day 1 lines up in the correct column
    for (let i = 0; i < firstDay; i++) {
      days.push(null); // null means "empty cell, don't show anything"
    }

    // STEP 2: Add cells for each actual day of the month
    // If there are 31 days, we add 1, 2, 3... all the way to 31
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    // Now we have an array like: [null, null, null, 1, 2, 3, 4, 5... 31]
    return days;
  }

  // This checks if a specific day is the one currently selected by the user
  // WHY? So we can add a special class/style to highlight it
  function isSelectedDay(day) {
    // If nothing is selected yet, return false
    if (!selectedDate) return false;

    // Check if this day matches our selected date
    // We compare: same year AND same month AND same day
    // WHY all three? Because March 15, 2026 is different from March 15, 2025
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  }

  // This checks if a day is TODAY (the actual current day in real life)
  // WHY? So we can highlight today differently in the calendar
  function isToday(day) {
    const today = new Date(); // Get the actual current date

    // Check if this day is today by comparing year, month, and day
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  }


  const isSelectedDateToday = () => {
    const today = new Date();
    if (selectedDate === null) return false;
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    )
  }

  function isScheduledDay(day) {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    )
      .toISOString()
      .split("T")[0];
    return scheduledDates?.has(dateStr) ?? false;
  }

  function isDayComplete(day) {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    )
      .toISOString()
      .split("T")[0];

    const daySessions = allSessions?.filter(
      (session) => session.scheduledDate?.split("T")[0] === dateStr,
    );

    return daySessions?.length > 0 && daySessions.every((s) => s.completed);
  }

  // This formats the month and year for display at the top
  // Example: "March 2026"
  // WHY a function? So if we want to change the format later, we only change it in one place
  function getMonthYearDisplay() {
    // toLocaleString is a JavaScript method that formats dates nicely
    // 'en-US' means American English format
    // { month: 'long', year: 'numeric' } means "March 2026" not "03/2026"
    return currentDate.toLocaleString("en-US", {
      month: "long", // "March" instead of "Mar" or "3"
      year: "numeric", // "2026" instead of "26"
    });
  }

  return (
    <Layout>
      <div className="calendar">
        {/* HEADER - Shows month/year and navigation arrows */}
        <div className="calendar__header">
          {/* Display the current month and year */}
          <h2 className="calendar__month-year">{getMonthYearDisplay()}</h2>

          {/* Navigation buttons container */}
          <div className="calendar__nav">
            {/* PREVIOUS MONTH BUTTON */}
            <button
              onClick={goToPreviousMonth}
              className="calendar__nav-btn"
              aria-label="Previous month" // For screen readers/accessibility
            >
              {/* Using lucide-react icon for a clean left arrow */}
              {/* WHY an icon library? Looks better than text and is consistent */}
              <ChevronLeft color="white" size={20} />
            </button>

            {/* NEXT MONTH BUTTON */}
            <button
              onClick={goToNextMonth}
              className="calendar__nav-btn"
              aria-label="Next month"
            >
              <ChevronRight color="white" size={20} />
            </button>
          </div>
        </div>

        {/* CALENDAR GRID - Where all the magic happens */}
        <div className="calendar__grid">
          {/* DAY NAME HEADERS (S, M, T, W, T, F, S) */}
          {getDayNames().map((dayName, index) => (
            <div key={index} className="calendar__day-name">
              {dayName}
            </div>
          ))}

          {/* DAY CELLS (1, 2, 3... 31) */}
          {generateCalendarDays().map((day, index) => (
            <div key={index} className="calendar__day-cell">
              {/* CONDITIONAL RENDERING: Only show a button if day is NOT null */}
              {day !== null && (
                // Each actual day is a BUTTON (so it's clickable and accessible)
                <button
                  onClick={() => handleDayClick(day)} // When clicked, call our handler with the day number
                  className={`
                  calendar__day-btn
                  ${isToday(day) ? "calendar__day-btn--today" : ""}  
                  ${isSelectedDay(day) ? "calendar__day-btn--selected" : ""}
                  ${isScheduledDay(day) ? "calendar__day-btn--scheduled calendar__day-btn--selected" : ""}
                  ${isDayComplete(day) ? "calendar__day-btn--scheduled calendar__day-btn--completed" : ""}
                `}
                >
                  {day} {/* Display the actual day number */}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* LEGEND - Shows what the colors mean */}
        <div className="calendar__legend">
          {/* Completed indicator */}
          <div className="calendar__legend-item">
            {/* The dot - a small colored circle */}
            {/* WHY a span? It's inline and good for small decorative elements */}
            <span className="calendar__legend-dot calendar__legend-dot--completed"></span>
            <span className="calendar__legend-label">Completed</span>
          </div>

          {/* Scheduled indicator */}
          <div className="calendar__legend-item">
            <span className="calendar__legend-dot calendar__legend-dot--scheduled"></span>
            <span className="calendar__legend-label">Scheduled</span>
          </div>
        </div>
      </div>
      <ScheduleWorkoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        routineDate={selectedDate}
        onSchedule={handleScheduled}
        scheduled={scheduledSessions}
        onRemove={handleRemove}
        canStartToday={isSelectedDateToday}
      />
    </Layout>
  );
}

export default Calendar;
