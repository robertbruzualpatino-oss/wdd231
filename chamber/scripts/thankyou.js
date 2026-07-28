document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuButton.classList.toggle("open");
        });
    }

    const currentYearSpan = document.getElementById("currentyear");
    const lastModifiedPara = document.getElementById("lastModified");

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    if (lastModifiedPara) {
        lastModifiedPara.textContent = `Last Modified: ${document.lastModified}`;
    }

    const formData = new URLSearchParams(window.location.search);
    const resultsContainer = document.getElementById("results");

    if (formData.has("fname") && resultsContainer) {
        const rawTimestamp = formData.get("timestamp");
        const formattedDate = rawTimestamp
            ? new Date(rawTimestamp).toLocaleString()
            : "N/A";
        
        resultsContainer.innerHTML = `
            <h2>Application Details</h2>
            <ul>
                <li><strong>First Name:</strong> ${formData.get("fname")}</li>
                <li><strong>Last Name:</strong> ${formData.get("lname")}</li>
                <li><strong>Email Address:</strong> ${formData.get("email")}</li>
                <li><strong>Phone Number:</strong> ${formData.get("phone")}</li>
                <li><strong>Business / Organization:</strong> ${formData.get("organization")}</li>
                <li><strong>Submission Timestamp:</strong> ${formattedDate}</li>
            </ul>
        `;
    } else if (resultsContainer) {
        resultsContainer.innerHTML = `<p>No submission details were found in the request URL.</p>`;
    }
});