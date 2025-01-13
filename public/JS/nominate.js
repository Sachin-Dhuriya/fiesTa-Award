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
    window.location.href = '/nominateyourself'; 
});

// Get the 'Nominate Someone Else' card
const nominateSomeoneElseCard = document.getElementById('pop-nominateSomeoneElse');

// Add click event listener
nominateSomeoneElseCard.addEventListener('click', () => {
    window.location.href = '/nominatesomeoneelse'; 
});

//------------------------------leaderboard-----------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const filterButtons = document.querySelectorAll(".filter-btn");
  let leaderboardRows = Array.from(document.querySelectorAll(".leaderboard-row"));

  // Function to sort rows by total score (descending order)
  const sortRowsByScore = (rows) => {
    return rows.sort((a, b) => {
      const scoreA = parseInt(a.cells[6].innerText, 10); 
      const scoreB = parseInt(b.cells[6].innerText, 10);
      return scoreB - scoreA; // Descending order
    });
  };

  // Function to render sorted/filtered rows
  const renderLeaderboard = (rows) => {
    const leaderboardBody = document.getElementById("leaderboard-body");
    leaderboardBody.innerHTML = ""; 
    rows.forEach((row) => leaderboardBody.appendChild(row)); 
  };

  // Initial sorting and rendering in descending order
  leaderboardRows = sortRowsByScore(leaderboardRows);
  renderLeaderboard(leaderboardRows);

  // Filter by Category
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      // Set active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter rows by category
      const filteredRows = leaderboardRows.filter((row) => {
        const rowCategory = row.getAttribute("data-category");
        return category === "all" || rowCategory === category;
      });

      renderLeaderboard(filteredRows);
    });
  });

  // Search by Name
  searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value.toLowerCase();

    const filteredRows = leaderboardRows.filter((row) => {
      const rowName = row.getAttribute("data-name").toLowerCase();
      return rowName.includes(searchQuery);
    });

    renderLeaderboard(filteredRows);
  });
});
