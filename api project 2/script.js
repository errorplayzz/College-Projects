const API_KEY = "ac4703d8a7f14989b79164444242011";

async function fetchWeather() {
    const location = document.getElementById("location").value;
    const weatherInfoDiv = document.getElementById("weather-info");
    
    if (!location) {
        alert("Please enter a location!");
        alert("Then you will contiune.....")
        return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Unable to fetch weather data.");
        }
        
        const data = await response.json();
        displayWeather(data);
        weatherInfoDiv.style.display = "block";
    } catch (error) {
        alert("Error: " + error.message);
        weatherInfoDiv.style.display = "none";
    }
}

function displayWeather(data) {
    document.getElementById("location-name").innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById("temperature").innerText = data.current.temp_c;
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("humidity").innerText = data.current.humidity;

    updateBackground(data.current.condition.text);
}

function updateBackground(condition) {
    const body = document.body;

    const lowerCondition = condition.toLowerCase();

    if (lowerCondition.includes("snow")) {
        body.style.backgroundImage = "url('https://images.wallpapersden.com/image/download/forest-house-covered-in-snow-4k_bGdnaGuUmZqaraWkpJRpZW5qrWdoZWg.jpg')";
    } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
        body.style.backgroundImage = "url('https://wallpapers.com/images/hd/rain-4k-a2id6opqg50o1dc1.jpg')";
    } else if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
        body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmLZt9KxMo2xsoyRpyzx6mZmjdKvD5AMz4w&s')";
    } else if (lowerCondition.includes("mist") || lowerCondition.includes("fog")) {
        body.style.backgroundImage = "url('https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?cs=srgb&dl=pexels-eberhardgross-1367192.jpg&fm=jpg')";
    } else if (lowerCondition.includes("clear")) {
        body.style.backgroundImage = "url('https://c1.wallpaperflare.com/preview/998/702/367/clouds-cumulus-cumulus-clouds-summer-day.jpg')";
    } else if (lowerCondition.includes("cloud")) {
        if (lowerCondition.includes("partly")) {
            body.style.backgroundImage = "url('https://img.freepik.com/premium-photo/partly-cloudy-sky-background_670382-197669.jpg')";
        } else {
            body.style.backgroundImage = "url('https://images.pexels.com/photos/314726/pexels-photo-314726.jpeg?cs=srgb&dl=pexels-pixabay-314726.jpg&fm=jpg')";
        }
    } else if (lowerCondition.includes("haze")) {
        body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuKaDyiKuWMP8owxGCRWE2os67SiWSgujTYQ&s')";
    } else if (lowerCondition.includes("smoke")) {
        body.style.backgroundImage = "url('https://img.freepik.com/free-photo/storm-clouds_1122-2749.jpg')";
    } else if (lowerCondition.includes("wind") || lowerCondition.includes("breeze")) {
        body.style.backgroundImage = "url('https://c0.wallpaperflare.com/preview/556/693/130/trees-path-palm-trees-wind.jpg')";
    } else if (lowerCondition.includes("sand") || lowerCondition.includes("dust")) {
        body.style.backgroundImage = "url('https://www.shutterstock.com/shutterstock/videos/1111908793/thumb/1.jpg?ip=x480')";
    } else if (lowerCondition.includes("sunny") || lowerCondition.includes("sun")) {
            body.style.backgroundImage = "url('https://wallpapercave.com/wp/wp4077228.jpg')";
    } else if (lowerCondition.includes("overcast")) {
        body.style.backgroundImage = "url('https://c0.wallpaperflare.com/preview/273/564/913/storm-sky-cloud-lightning.jpg')";
    } else {
        body.style.backgroundImage = "none";
        body.style.backgroundColor = "#000000";
    }

    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
}
