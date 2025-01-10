// Get Elements
const nominateBtn = document.getElementById('pop-nominateBtn');
const mainPopup = document.getElementById('pop-mainPopup');
const closeMainPopup = document.getElementById('pop-closeMainPopup');
const nominateYourself = document.getElementById('pop-nominateYourself');
const nominateSomeoneElse = document.getElementById('pop-nominateSomeoneElse');

// Show Main Popup
nominateBtn.addEventListener('click', () => {
  mainPopup.style.display = 'flex';
});

// Close Main Popup
closeMainPopup.addEventListener('click', () => {
  mainPopup.style.display = 'none';
});

// Get the 'Nominate Yourself' card
const nominateYourselfCard = document.getElementById('pop-nominateYourself');

// Add click event listener
nominateYourselfCard.addEventListener('click', () => {
    window.location.href = '/nominateyourself'; // Redirect to the desired route
});

// Get the 'Nominate Someone Else' card
const nominateSomeoneElseCard = document.getElementById('pop-nominateSomeoneElse');

// Add click event listener
nominateSomeoneElseCard.addEventListener('click', () => {
    window.location.href = '/nominatesomeoneelse'; // Redirect to the desired route
});


