document.addEventListener("DOMContentLoaded", () => {
    const voteButtons = document.querySelectorAll(".vote-btn");

    voteButtons.forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");

        fetch(`/vote/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              // Update the votes count in the UI
              const voteCountElement = document.getElementById(`votes-${id}`);
              voteCountElement.textContent = data.votes;
            } else {
              alert("Failed to update votes. Please try again.");
            }
          })
          .catch(err => {
            console.error("Error updating vote: ", err);
            alert("An error occurred. Please try again.");
          });
      });
    });
  });

  //----------------------------------------------------------Search------------------------------
  // document.addEventListener("DOMContentLoaded", () => {
  //   const searchBar = document.getElementById("search-bar");
  //   const cards = document.querySelectorAll(".card");

  //   // Event listener for search bar
  //   searchBar.addEventListener("input", () => {
  //     const query = searchBar.value.toLowerCase();

  //     cards.forEach(card => {
  //       const name = card.getAttribute("data-name");

  //       if (name.includes(query)) {
  //         card.style.display = "block";
  //       } else {
  //         card.style.display = "none";
  //       }
  //     });
  //   });

  //   const voteButtons = document.querySelectorAll(".vote-btn");

  //   voteButtons.forEach(button => {
  //     button.addEventListener("click", () => {
  //       const id = button.getAttribute("data-id");

  //       fetch(`/vote/${id}`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //         .then(response => response.json())
  //         .then(data => {
  //           if (data.success) {
  //             const voteCountElement = document.getElementById(`votes-${id}`);
  //             voteCountElement.textContent = data.votes;
  //           } else {
  //             alert("Failed to update votes. Please try again.");
  //           }
  //         })
  //         .catch(err => {
  //           console.error("Error updating vote: ", err);
  //           alert("An error occurred. Please try again.");
  //         });
  //     });
  //   });
  // });

 // DOM Elements
const searchBar = document.getElementById('search-bar');
const resultsContainer = document.getElementById('results-container');

// Prevent form submission on Enter
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission
});

// Debounce function to delay API calls
let debounceTimeout;
searchBar.addEventListener('input', function () {
    clearTimeout(debounceTimeout); // Clear previous timeout
    debounceTimeout = setTimeout(() => {
        fetchSearchResults(searchBar.value.trim()); // Fetch results after delay
    }, 300); // 300ms delay
});

// Fetch search results from the backend
async function fetchSearchResults(query) {
    if (query === '') {
        // If search is empty, reset to show default nominations
        const response = await fetch(`/search?query=`);
        const results = await response.json();
        updateResults(results);
        return;
    }

    try {
        const response = await fetch(`/search?query=${query}`);
        const results = await response.json();

        // Update the results container with fetched results
        updateResults(results);
    } catch (error) {
        console.error('Error fetching search results:', error);
        resultsContainer.innerHTML = '<p>Error fetching results.</p>';
    }
}

// Function to update the results container
function updateResults(results) {
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    resultsContainer.innerHTML = results.map((nom) => `
        <div class="card">
            <div class="header">
                <h2>${nom.fullName}</h2>
                <div class="badges">
                    <span class="badge">${nom.nominationType}</span>
                </div>
            </div>
            <p class="subtitle">${nom.jobTitle}</p>
            <div class="status">
                <span class="status-badge">${nom.category}</span> <br><br>
                <span class="votes">
                    <b id="votes-${nom._id}">${nom.votes}</b> <i class="icon">👍</i> votes
                </span>
                <span class="jury">Jury Score: <b>0</b></span>
            </div>
            <div class="buttons">
                <button class="profile-btn">
                    <span class="badge linkedin">
                        <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" alt="LinkedIn" />
                    </span>
                    <a class="linkedin-link" target="_blank" href="${nom.linkedIn}">LinkedIn Profile</a>
                </button>
                <button class="vote-btn" data-id="${nom._id}">👍 Vote</button>
            </div>
            <hr>
            <p class="nomination">Nominated by ${nom.peerFullName}</p>
        </div>
    `).join('');
}


//-------------------------------leaderboard js-----------------------------
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