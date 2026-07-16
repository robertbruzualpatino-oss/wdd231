const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const lat = "49.75";
const lon = "6.64";
const apiKey = "d345dd02dab5816725926dadab12d275";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=d345dd02dab5816725926dadab12d275`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;

    const iconCode = data.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/w/${iconCode}.png`;

    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    captionDesc.textContent = capitalizeWords(desc);
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

apiFetch();