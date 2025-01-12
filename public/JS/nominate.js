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

//------------------------------leaderboard-----------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const leaderboardRows = document.querySelectorAll(".leaderboard-row");

  // Filter by Category
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      
      // Set active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter rows
      leaderboardRows.forEach((row) => {
        const rowCategory = row.getAttribute("data-category");
        if (category === "all" || rowCategory === category) {
          row.style.display = ""; // Show row
        } else {
          row.style.display = "none"; // Hide row
        }
      });
    });
  });

  // Search by Name
  searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value.toLowerCase();

    leaderboardRows.forEach((row) => {
      const rowName = row.getAttribute("data-name");
      if (rowName.includes(searchQuery)) {
        row.style.display = ""; // Show row
      } else {
        row.style.display = "none"; // Hide row
      }
    });
  });
});
