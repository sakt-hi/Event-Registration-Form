document.addEventListener('DOMContentLoaded', function () {
    var elements = document.querySelectorAll('.timer, .colon');
    var regClose = document.querySelector('.reg-close');
    var registerBtn = document.querySelector('.reg-btn-mobile');
    var register = document.getElementById('register');

    registerBtn.addEventListener('click', function() {
        register.scrollIntoView({ behavior: 'smooth' });
    });

    if (elements.length > 0) {
        window.addEventListener('scroll', function () {
            // Check screen width
            if (window.innerWidth > 950) {
                var scrolled = window.scrollY;
                var scrollThreshold = 10 * parseFloat(getComputedStyle(document.documentElement).fontSize);

                elements.forEach(function (element) {
                    if (scrolled >= scrollThreshold) {
                        element.classList.add('scrolled');
                        regClose.classList.add('scrolled');
                    } else {
                        element.classList.remove('scrolled');
                        regClose.classList.remove('scrolled');
                    }
                });
            }
        });
    } else {
        console.error("No elements with class 'timer' or 'colon' found.");
    }
});

const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const event_day = document.getElementById('event_day')

function updateCountdownTime() {
    // Get today's date each time the function is called
    const todayDate = new Date();

    // Calculate the date one week from today
    const regEndDate = new Date(todayDate);
    regEndDate.setDate(regEndDate.getDate() + 7);
    regEndDate.setHours(17, 0, 0, 0); // Set the time to 5:00 PM

    // Calculate Event Day
    const eventDay = new Date(todayDate);
    eventDay.setDate(eventDay.getDate() + 8);

    // Format the result as a string with "dd/mm/yyyy" format
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedEventDay = eventDay.toLocaleDateString('en-GB', options);

    const diffInTime = regEndDate - todayDate;

    const d = Math.floor(diffInTime / 1000 / 60 / 60 / 24);
    const h = Math.floor(diffInTime / 1000 / 60 / 60) % 24;
    const m = Math.floor(diffInTime / 1000 / 60) % 60;
    const s = Math.floor(diffInTime / 1000) % 60;

    days.innerHTML = '0' + d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
    event_day.innerHTML = formattedEventDay;
}

// Initial call to set the timer values
updateCountdownTime();

// Update the timer values every second
setInterval(updateCountdownTime, 1000);

var formSubmitted = false; // Variable to track whether the form has been submitted

function validateForm() {
    // Reset previous error styles
    resetErrors();

    // Validate Name
    var name = document.getElementById('name').value;
    if (name.trim() === '') {
        document.getElementById('nameError').innerText = 'Name is required';
        applyErrorStyle('name');
        return;
    }

    // Validate Email
    var email = document.getElementById('email_id').value;
    if (email.trim() === '') {
        document.getElementById('emailError').innerText = 'Email is required';
        applyErrorStyle('email_id');
        return;
    }

    // Validate Acknowledge checkbox
    var acknowledge = document.getElementById('acknowledge').checked;
    if (!acknowledge) {
        document.getElementById('acknowledgeError').innerText = 'Please agree to the Terms & Conditions';
        applyErrorStyle('acknowledge');
        return;
    }

    // If all validations pass, set the formSubmitted variable to true
    formSubmitted = true;

    // Show success popup and reset the form
    showSuccessPopup();
    resetForm();
}

function resetErrors() {
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('acknowledgeError').innerText = '';

    // Reset error styles for input elements
    resetErrorStyle('name');
    resetErrorStyle('email_id');
    resetErrorStyle('acknowledge');
}

function applyErrorStyle(elementId) {
    document.getElementById(elementId).style.borderColor = 'red';
    document.getElementById(elementId).style.outlineColor = 'red';
}

function resetErrorStyle(elementId) {
    document.getElementById(elementId).style.borderColor = '';
    document.getElementById(elementId).style.outlineColor = '';
}

function showSuccessPopup() {
    // Check if the form has been successfully submitted
    if (formSubmitted) {
        var successPopup = document.getElementById('successPopup');
        successPopup.style.display = 'flex';

        // Check if the screen width is less than 950px
        if (window.innerWidth < 950) {
            // Calculate the scroll position
            var scrollY = window.scrollY || document.documentElement.scrollTop;

            // Adjust the top position based on the scroll position
            successPopup.style.top = scrollY + window.innerHeight / 2 + 'px';
        }

        // Auto close after 3 seconds
        setTimeout(function () {
            closePopup();
        }, 3000);

        // Set up progress bar
        var progressBar = document.getElementById('progressBar');
        var width = 1;
        var interval = setInterval(function () {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width++;
                progressBar.style.width = width + '%';
            }
        }, 30);
    }
}

function closePopup() {
    var successPopup = document.getElementById('successPopup');
    successPopup.style.display = 'none';

    // Reset progress bar width
    document.getElementById('progressBar').style.width = '0%';

    // Reset the formSubmitted variable to false
    formSubmitted = false;
}

function resetForm() {
    // Reset input values
    document.getElementById('name').value = '';
    document.getElementById('email_id').value = '';
    document.getElementById('acknowledge').checked = false;

    // Reset error styles for input elements
    resetErrorStyle('name');
    resetErrorStyle('email_id');
    resetErrorStyle('acknowledge');
}
