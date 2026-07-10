const dataUrl = "data/members.json";
const container = document.querySelector("#directory-container");

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

gridButton.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
});

listButton.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
});

menuButton.addEventListener("click", () => {
    document.querySelector("#nav-menu").classList.toggle("show");
});

getMembers();