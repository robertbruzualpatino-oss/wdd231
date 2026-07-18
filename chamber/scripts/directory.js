const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const directoryContainer = document.querySelector("#directory-container");

if (gridBtn && listBtn && directoryContainer) {
    gridBtn.addEventListener("click", () => {
        directoryContainer.classList.add("grid-view");
        directoryContainer.classList.remove("list-view");
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        directoryContainer.classList.add("list-view");
        directoryContainer.classList.remove("grid-view");
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
}

document.getElementById("lastModified").textContent = document.lastModified;

async function getMembers() {
    try {
        const response = await fetch(dataUrl);
        if (!response.ok) throw new Error("Failed to fetch member data");
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = "";

    members.forEach((member, index) => {
        const card = document.createElement("section");
        const levels = { 1: "Member", 2: "Silver", 3: "Gold" };

        const isAboveFold = index < 2;

        card.innerHTML = `
            <img src="images/${member.image}" 
                alt="${member.name} Logo" 
                ${isAboveFold ? 'fetchpriority="high"' : 'loading="lazy"'}>
                width="200"
                height="200">
            <h3>${member.name}</h3>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <span class="member-level level-${member.membershipLevel}">
                ${levels[member.membershipLevel]}
            </span>
        `;
        container.appendChild(card);
    });
}

const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");
const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
const displayContainer = document.querySelector("#directory-container");

if (gridButton && listButton && displayContainer) {
    gridButton.addEventListener("click", () => {
        displayContainer.classList.add("grid-view");
        displayContainer.classList.remove("list-view");
    });

    listButton.addEventListener("click", () => {
        displayContainer.classList.add("grid-view");
        displayContainer.classList.remove("list-view");
    });
}

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        menuButton.textContent = navMenu.classList.contains("show") ? "❌" : "☰";
    });
}