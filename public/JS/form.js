// Multi-Step Form Logic
const steps = document.querySelectorAll('.form-step');
const nextStep1 = document.getElementById('nextStep1');
const prevStep2 = document.getElementById('prevStep2');
const submitButton = document.querySelector('#step2 button[type="submit"]');
let currentStep = 0;

// Function to show the active step
const showStep = (stepIndex) => {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === stepIndex);
  });
};

// Function to save Step 1 details to Local Storage
const saveStep1Details = () => {
  const formData = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    linkedIn: document.getElementById('linkedIn').value,
    phone: document.getElementById('phone').value,
    company: document.getElementById('company').value,
    jobTitle: document.getElementById('jobTitle').value,
    category: document.getElementById('category').value,
  };
  localStorage.setItem('step1Data', JSON.stringify(formData)); 
};

// Show custom alert if fields are not filled
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-container');
  alertContainer.innerHTML = `
    <span>${message}</span>
    <button class="close-btn">&times;</button>
  `;
  document.body.appendChild(alertContainer);
  alertContainer.classList.add('show');

  // Close button logic
  alertContainer.querySelector('.close-btn').addEventListener('click', () => {
    alertContainer.classList.remove('show');
    setTimeout(() => alertContainer.remove(), 300);
  });

  // Automatically remove alert after 4 seconds
  setTimeout(() => {
    alertContainer.classList.remove('show');
    setTimeout(() => alertContainer.remove(), 300);
  }, 4000);
};

// Function to validate form step
const validateFormStep = (step) => {
  const inputs = step.querySelectorAll('input, select');
  return [...inputs].every(input => input.value.trim() !== '');
};

// Handle Next button click for Step 1
nextStep1.addEventListener('click', () => {
  const step1 = document.getElementById('step1');
  if (validateFormStep(step1)) {
    saveStep1Details();
    currentStep = 1;
    showStep(currentStep);
  } else {
    showAlert("Please fill in all the fields before proceeding.");
  }
});

// Handle Previous button click for Step 2
prevStep2.addEventListener('click', () => {
  currentStep = 0;
  showStep(currentStep);
});

// Handle Submit button click for Step 2
submitButton.addEventListener('click', (event) => {
  event.preventDefault();

  const step2 = document.getElementById('step2');
  if (validateFormStep(step2)) {
    document.getElementById('nominateForm').submit(); // Submit the form programmatically
  } else {
    showAlert("Please fill in all required fields before submitting.");
  }
});
