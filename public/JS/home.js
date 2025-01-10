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
  document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("search-bar");
    const cards = document.querySelectorAll(".card");

    // Event listener for search bar
    searchBar.addEventListener("input", () => {
      const query = searchBar.value.toLowerCase();

      cards.forEach(card => {
        const name = card.getAttribute("data-name");

        if (name.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });

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
