import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "./Calendar.scss";
import Layout from '../../components/Layout/Layout';

// WHY A SEPARATE CALENDAR COMPONENT?
// We're making this its own component so it can be reused anywhere in your app
// Think of it like a LEGO block - you build it once, use it everywhere

function Calendar({ onDateSelect }) {
    // ===== STATE MANAGEMENT =====
    // State is like the component's memory - it remembers things between re-renders

    // currentDate holds what month/year we're currently looking at
    // We initialize it with "new Date()" which gives us RIGHT NOW (today)
    // WHY? Because when you open a calendar, you want to see THIS month, not January 1970
    const [currentDate, setCurrentDate] = useState(new Date());

    // selectedDate remembers which day the user clicked on
    // We start with null because the user hasn't clicked anything yet
    // WHY null? null means "nothing selected yet" - it's like an empty box
    const [selectedDate, setSelectedDate] = useState(null);


    // ===== HELPER FUNCTIONS =====
    // These are like little mini-programs that do specific tasks
    // We define them INSIDE the component so they have access to our state


    // This function moves us to the PREVIOUS month
    // Think of it like pressing the "back" button on a calendar
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
    // It's basically the opposite of goToPreviousMonth
    function goToNextMonth() {
        const newDate = new Date(currentDate);

        // Same idea but we ADD 1 instead of subtract
        // If you're in December (11) and do 11+1, JavaScript wraps to January of NEXT YEAR
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
            currentDate.getFullYear(),  // Gets the year (like 2026)
            currentDate.getMonth(),      // Gets the month (0-11)
            day                          // The day they clicked (1-31)
        );

        // Update our selectedDate state so we remember what they clicked
        setSelectedDate(clickedDate);

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
        return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
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
            currentDate.getMonth() + 1,  // Next month
            0                             // Day 0 = last day of previous month (which is our current month)
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
            1  // The 1st day
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
            days.push(null);  // null means "empty cell, don't show anything"
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
        const today = new Date();  // Get the actual current date

        // Check if this day is today by comparing year, month, and day
        return (
            today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear()
        );
    }


    // This formats the month and year for display at the top
    // Example: "March 2026"
    // WHY a function? So if we want to change the format later, we only change it in one place
    function getMonthYearDisplay() {
        // toLocaleString is a JavaScript method that formats dates nicely
        // 'en-US' means American English format
        // { month: 'long', year: 'numeric' } means "March 2026" not "03/2026"
        return currentDate.toLocaleString('en-US', {
            month: 'long',   // "March" instead of "Mar" or "3"
            year: 'numeric'  // "2026" instead of "26"
        });
    }


    // ===== RENDER / JSX =====
    // This is what actually gets displayed on screen

    return (
        // Main container for the entire calendar
        // WHY a div? Because we need a single parent element to wrap everything
        // className lets us style this later with CSS
        <Layout >
            <div className="calendar">

                {/* HEADER - Shows month/year and navigation arrows */}
                {/* WHY a separate div? To group the header elements together for styling */}
                <div className="calendar__header">

                    {/* Display the current month and year */}
                    {/* WHY h2? It's a heading, and h2 is appropriate for a section title */}
                    <h2 className="calendar__month-year">{getMonthYearDisplay()}</h2>

                    {/* Navigation buttons container */}
                    {/* WHY a separate div? To group the arrows together on the right side */}
                    <div className="calendar__nav">

                        {/* PREVIOUS MONTH BUTTON */}
                        {/* WHY button? Buttons are semantic - screen readers know it's clickable */}
                        {/* onClick tells React "when this is clicked, run goToPreviousMonth" */}
                        <button
                            onClick={goToPreviousMonth}
                            className="calendar__nav-btn"
                            aria-label="Previous month"  // For screen readers/accessibility
                        >
                            {/* Using lucide-react icon for a clean left arrow */}
                            {/* WHY an icon library? Looks better than text and is consistent */}
                            <ChevronLeft />
                        </button>

                        {/* NEXT MONTH BUTTON */}
                        {/* Same concept as previous button, but goes forward */}
                        <button
                            onClick={goToNextMonth}
                            className="calendar__nav-btn"
                            aria-label="Next month"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>


                {/* CALENDAR GRID - Where all the magic happens */}
                {/* WHY a separate div? To contain the entire grid structure */}
                <div className="calendar__grid">

                    {/* DAY NAME HEADERS (S, M, T, W, T, F, S) */}
                    {/* We map over the day names array to create one cell for each day */}
                    {/* WHY .map()? It's the React way to create multiple similar elements from an array */}
                    {getDayNames().map((dayName, index) => (
                        // Each day name gets its own div
                        // WHY a key? React needs a unique identifier for each item in a list
                        // We use index because day names never change order or get added/removed
                        <div
                            key={index}
                            className="calendar__day-name"
                        >
                            {dayName}
                        </div>
                    ))}


                    {/* DAY CELLS (1, 2, 3... 31) */}
                    {/* We map over our generated calendar days to create the grid of numbers */}
                    {generateCalendarDays().map((day, index) => (
                        // Each day gets a div
                        // WHY key={index}? Because we need unique keys, and the index works here
                        // (the array doesn't change after it's created)
                        <div
                            key={index}
                            className="calendar__day-cell"
                        >
                            {/* CONDITIONAL RENDERING: Only show a button if day is NOT null */}
                            {/* WHY? Because null represents empty cells before the month starts */}
                            {/* Example: If month starts on Wednesday, first 3 cells are empty */}
                            {day !== null && (
                                // Each actual day is a BUTTON (so it's clickable and accessible)
                                // WHY button? It's clickable and screen readers know it's interactive
                                <button
                                    onClick={() => handleDayClick(day)}  // When clicked, call our handler with the day number
                                    className={`
                  calendar__day-btn
                  ${isToday(day) ? 'calendar__day-btn--today' : ''}  
                  ${isSelectedDay(day) ? 'calendar__day-btn--selected' : ''}
                `}
                                // The className uses TEMPLATE LITERALS (the backticks) to conditionally add classes
                                // WHY? So we can style today differently (maybe a circle) and selected day differently (maybe highlighted)
                                // The ${} syntax lets us insert JavaScript expressions into the string
                                // The ternary operator (condition ? ifTrue : ifFalse) adds a class only when the condition is true
                                >
                                    {day}  {/* Display the actual day number */}
                                </button>
                            )}
                        </div>
                    ))}

                </div>


                {/* LEGEND - Shows what the colors mean */}
                {/* This matches your design with "Completed" and "Scheduled" indicators */}
                <div className="calendar__legend">

                    {/* Completed indicator */}
                    {/* WHY separate divs? So each legend item can have its own dot + text */}
                    <div className="calendar__legend-item">
                        {/* The dot - a small colored circle */}
                        {/* WHY a span? It's inline and good for small decorative elements */}
                        <span className="calendar__legend-dot calendar__legend-dot--completed"></span>
                        {/* The label text */}
                        <span className="calendar__legend-label">Completed</span>
                    </div>

                    {/* Scheduled indicator */}
                    <div className="calendar__legend-item">
                        <span className="calendar__legend-dot calendar__legend-dot--scheduled"></span>
                        <span className="calendar__legend-label">Scheduled</span>
                    </div>

                </div>

            </div>
        </Layout>
    );
}

// WHY export? So other files can import and use this component
export default Calendar;


// ===== HOW TO USE THIS COMPONENT =====
// In your parent component (like Home.jsx), you'd use it like this:
//
// function Home() {
//   function handleDateSelection(date) {
//     console.log("User selected:", date);
//     // Here you could open a modal to schedule a workout
//     // or navigate to a workout scheduling page
//   }
//
//   return (
//     <div>
//       <Calendar onDateSelect={handleDateSelection} />
//     </div>
//   );
// }
//
// The onDateSelect prop is a CALLBACK FUNCTION
// WHY? Because the Calendar component needs to tell its parent when something happens
// This is called "lifting state up" - the parent controls what happens when a date is clicked