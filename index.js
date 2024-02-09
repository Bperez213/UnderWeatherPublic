const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const api = ""; //API GOES HERE

weatherForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const city = cityInput.value;

	if (city) {
		try {
			const weatherData = await getWeatherData(city);
			displayWeatherInfo(weatherData);
		} catch (error) {
			console.error(error);
			displayError(`Please Enter a valid City or State`);
		}
	} else {
		displayError("Please enter a city");
	}
});

async function getWeatherData(city) {
	const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

	const response = await fetch(apiURL);
	if (!response.ok) {
		throw new error("Could not fetch weather data");
	}

	return await response.json();
}

function displayWeatherInfo(data) {
	const {
		name: city,
		main: { temp, humidity },
		weather: [{ description, id }],
	} = data;

	card.textContent = "";
	card.style.display = "flex";

	const cityDisplay = document.createElement("h1");
	const tempDisplay = document.createElement("p");
	const humidityDisplay = document.createElement("p");
	const descDisplay = document.createElement("p");
	const weatherSymbol = document.createElement("div");

	cityDisplay.textContent = city;
	tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
	humidityDisplay.textContent = `Humidity: ${humidity}`;
	descDisplay.textContent = description;
	weatherSymbol.innerHTML = "";
	weatherSymbol.appendChild(getWeatherSymbol(id));

	cityDisplay.classList.add("cityDisplay");
	tempDisplay.classList.add("temp");
	humidityDisplay.classList.add("humidity");
	descDisplay.classList.add("weatherDesc");
	weatherSymbol.classList.add("weatherSymbol");

	card.appendChild(cityDisplay);
	card.appendChild(tempDisplay);
	card.appendChild(humidityDisplay);
	card.appendChild(descDisplay);
	card.appendChild(weatherSymbol);
}

function getWeatherSymbol(weatherID) {
	const img = document.createElement("img");
	img.width = 85;
	img.height = 85;

	switch (true) {
		case weatherID >= 200 && weatherID < 300:
			img.src = "Assets/storm.png";
			break;
		case weatherID >= 300 && weatherID < 400:
			img.src = "Assets/rain.png";
			break;
		case weatherID >= 500 && weatherID < 600:
			img.src = "Assets/rain.png";
			break;
		case weatherID >= 600 && weatherID < 700:
			img.src = "Assets/snowflakes.png";
			break;
		case weatherID >= 700 && weatherID < 800:
			img.src = "Assets/fog.png";
			break;
		case weatherID === 800:
			img.src = "Assets/sun.png";
			break;
		case weatherID >= 801 && weatherID < 810:
			img.src = "Assets/cloudy.png";
			break;
		default:
			img.src = ""; // default image or leave it empty
	}

	return img;
}

function displayError(message) {
	const errorDisplay = document.createElement("p");
	errorDisplay.textContent = message;
	errorDisplay.classList.add("error");

	card.textContent = "";
	card.style.display = "flex";
	card.appendChild(errorDisplay);
}
