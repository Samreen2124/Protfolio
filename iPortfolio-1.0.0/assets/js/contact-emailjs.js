/**
 * EmailJS Contact Form Integration
 * Service ID: service_2873eb3
 * Template ID: template_trkcjep
 * Public Key: NqnyZ-KjIm4aRhu5X
 */

(function () {
  "use strict";

  const EMAILJS_CONFIG = {
    SERVICE_ID: "service_2873eb3",
    TEMPLATE_ID: "template_y4ga5hl",
    PUBLIC_KEY: "NqnyZ-KjIm4aRhu5X"
  };

  function initContactForm() {
    // Initialize EmailJS with Public Key
    if (typeof emailjs !== "undefined") {
      emailjs.init({
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY
      });
    }

    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const submitBtn = document.getElementById("contact-submit-btn");
    const btnText = document.getElementById("btn-text");
    const btnSpinner = document.getElementById("btn-spinner");
    const btnLoadingText = document.getElementById("btn-loading-text");
    const statusDiv = document.getElementById("contact-status");

    const nameInput = document.getElementById("from_name");
    const emailInput = document.getElementById("from_email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    function showStatus(type, message) {
      if (!statusDiv) return;
      statusDiv.style.display = "block";
      if (type === "success") {
        statusDiv.className = "alert alert-success d-flex align-items-center mb-3 shadow-sm";
        statusDiv.innerHTML = `<i class="bi bi-check-circle-fill fs-5 me-2 text-success"></i><div><strong>Success!</strong> ${message}</div>`;
      } else {
        statusDiv.className = "alert alert-danger d-flex align-items-center mb-3 shadow-sm";
        statusDiv.innerHTML = `<i class="bi bi-exclamation-triangle-fill fs-5 me-2 text-danger"></i><div><strong>Error:</strong> ${message}</div>`;
      }
    }

    function clearStatus() {
      if (!statusDiv) return;
      statusDiv.style.display = "none";
      statusDiv.innerHTML = "";
      statusDiv.className = "mb-3";
    }

    function setLoading(isLoading) {
      if (!submitBtn) return;
      if (isLoading) {
        submitBtn.disabled = true;
        if (btnText) btnText.classList.add("d-none");
        if (btnSpinner) btnSpinner.classList.remove("d-none");
        if (btnLoadingText) btnLoadingText.classList.remove("d-none");
      } else {
        submitBtn.disabled = false;
        if (btnText) btnText.classList.remove("d-none");
        if (btnSpinner) btnSpinner.classList.add("d-none");
        if (btnLoadingText) btnLoadingText.classList.add("d-none");
      }
    }

    function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
      return emailRegex.test(String(email).trim());
    }

    // Input event listeners to clear error styling upon typing
    [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
      if (input) {
        input.addEventListener("input", function () {
          if (this.classList.contains("is-invalid")) {
            this.classList.remove("is-invalid");
          }
        });
      }
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      clearStatus();

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const subject = subjectInput ? subjectInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      let hasError = false;

      // Validate Name
      if (!name || name.length < 2) {
        if (nameInput) nameInput.classList.add("is-invalid");
        hasError = true;
      } else {
        if (nameInput) nameInput.classList.remove("is-invalid");
      }

      // Validate Email
      if (!email || !isValidEmail(email)) {
        if (emailInput) emailInput.classList.add("is-invalid");
        hasError = true;
      } else {
        if (emailInput) emailInput.classList.remove("is-invalid");
      }

      // Validate Subject
      if (!subject || subject.length < 3) {
        if (subjectInput) subjectInput.classList.add("is-invalid");
        hasError = true;
      } else {
        if (subjectInput) subjectInput.classList.remove("is-invalid");
      }

      // Validate Message
      if (!message || message.length < 10) {
        if (messageInput) messageInput.classList.add("is-invalid");
        hasError = true;
      } else {
        if (messageInput) messageInput.classList.remove("is-invalid");
      }

      if (hasError) {
        showStatus("error", "Please fill in all required fields correctly before submitting.");
        return;
      }

      if (typeof emailjs === "undefined") {
        showStatus("error", "EmailJS service is not loaded. Please check your internet connection or email directly.");
        return;
      }

      setLoading(true);

      // Template parameters matching: from_name, from_email, subject, message
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
      };

      // Use emailjs.sendForm or emailjs.send
      emailjs
        .send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        )
        .then(function (response) {
          setLoading(false);
          showStatus("success", "Message sent successfully!");
          contactForm.reset();
          [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
            if (input) input.classList.remove("is-invalid");
          });
        })
        .catch(function (error) {
          setLoading(false);
          console.error("EmailJS submission error:", error);
          const errorMsg = (error && error.text) 
            ? error.text 
            : "Failed to send message. Please try again or reach out directly.";
          showStatus("error", errorMsg);
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForm);
  } else {
    initContactForm();
  }
})();
