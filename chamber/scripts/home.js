const apiKey = "d345dd02dab5816725926dadab12d275";
const lat = "10.4322";
const lon = "-64.1833";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=10.4322&lon=-64.1833&units=imperial&appid=d345dd02dab5816725926dadab12d275`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=10.4322&lon=-64.1833&units=imperial&appid=d345dd02dab5816725926dadab12d275`;
const membersUrl = "data/members.json";

async function fetchWeather() {
    try {
        const currentResponse = await fetch(currentWeatherUrl);
        if (currentResponse.ok) {
            const currentData = await currentResponse.json();
            displayCurrentWeather(currentData);
        }

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.error("Error fetching weather details:", error);
    }
}

function displayCurrentWeather(data) {
    const container = document.getElementById("current-weather");
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

    const formattedDesc = desc.replace(/\b\w/g, char => char.toUpperCase());

    container.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${iconUrl}" alt="${formattedDesc}" width="64" height="64">
            <div>
                <p style="font-size: 1.5rem; font-weight: bold; margin: 0;">${temp}°F</p>
                <p style="margin: 0; color: #555;">${formattedDesc}</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const container = document.getElementById("forecast-container");
    container.innerHTML = "";

    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(day.main.temp);
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        const desc = day.weather[0].description;

        const forecastItem = document.createElement("div");
        forecastItem.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee;";
        forecastItem.innerHTML = `
            <span style="font-weight: bold; width: 50px;">${dayName}</span>
            <img src="${iconUrl}" alt="${desc}" width="40" height="40">
            <span style="font-weight: bold; color: #003fa3;">${temp}°F</span>
        `;
        container.appendChild(forecastItem);
    });
}

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.error("Error fetching spotlight data:", error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    const eligibleMembers = members.filter(member =>
        member.membershipLevel === 2 || member.membershipLevel === 3 ||
        member.membershipLevel.toString().toLowerCase() === "silver" ||
        member.membershipLevel.toString().toLowerCase() === "gold"
    );

    const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());

    const selectedSpotlights = shuffledMembers.slice(0, 3);

    const spotlightGrid = document.createElement("div");
    spotlightGrid.style.cssText = "display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 10px;";

    selectedSpotlights.forEach(member => {
        const card = document.createElement("section");
        card.style.cssText = "border: 1px solid #ccc; padding: 15px; text-align: center; background: #fff; border-radius: 6px;";

        const badgeClass = member.membershipLevel === 3 || member.membershipLevel.toString().toLowerCase() === "gold" ? "level-3" : "level-2";
        const badgeName = member.membershipLevel === 3 || member.membershipLevel.toString().toLowerCase() === "gold" ? "Gold" : "Silver";

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h4 style="margin: 5px 0; color: #1a1a1a;">${member.name}</h4>
            <p style="margin: 3px 0; font-size: 0.9rem; color: #555;">${member.phone}</p>
            <p style="margin: 3px 0; font-size: 0.85rem; color: #777;">${member.address}</p>
            <a href="${member.website}" target="_blank" rel="noopener" style="display: inline-block; margin: 8px 0; color: #003fa3; text-decoration: none; font-weight: bold;">Visit Website</a>
            <span class="member-level ${badgeClass}" style="display: block; margin-top: 10px; padding: 4px; font-size: 0.75rem; font-weight: bold; border-radius: 4px;">${badgeName} Member</span>
        `;
        spotlightGrid.appendChild(card);
    });

    container.appendChild(spotlightGrid);
}

fetchWeather();
fetchSpotlights();