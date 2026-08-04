import { items } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    renderCards(items);

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

function displayVisitMessage() {
    const messageEl = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisitDate');
    const now = Date.now();

    if (!lastVisit) {
        messageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const msInDay = 86400000;
        const timeDiff = now - parseInt(lastVisit, 10);
        const dayBetween = Math.floor(timeDiff / msInDay);

        if (timeDiff < msInDay) {
            messageEl.textContent = "Back so soon! Awesome!";
        } else {
            const dayWord = dayBetween === 1 ? "day" : "days";
            messageEl.textContent = `You last visited ${dayBetween} ${dayWord} ago.`;
        }
    }

    localStorage.setItem('lastVisitDate', now.toString());
}

function renderCards(dataList) {
    const container = document.getElementById('discover-grid');
    container.innerHTML = '';

    dataList.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('discover-card', `card-${index + 1}`);

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button">Learn More</button>
        `;

        container.appendChild(card);
    });
}