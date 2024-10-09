const input = document.getElementById("search-input");
const description = document.getElementById("description-text");
const img = document.getElementById("description-img");
const locBtn = document.getElementById("loc-btn");
const section = document.querySelector("section");
const form = document.querySelector("form");

function getDate(e){
    e.preventDefault();
    if(!input.value){
        alert("Please Enter a City Name");
        return;
    }else{
        fetch( `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=ca695dcbc66c5fa3d0cb955033fd918f`)
            .then((res) => res.json())
            .then((data) => {
                displayWeather(data);
                document.getElementById("city").style.display = "block";
            });

    }
}

function getLocationData(){
    if(!navigator.geolocation){
        alert("geolocation is not supported!");
        return;
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch( `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=ca695dcbc66c5fa3d0cb955033fd918f`)
                .then((res) => res.json())
                .then((data) => {
                    displayWeather(data);
                    document.querySelector("header h5").style.display = "none";
                    document.getElementById("city").textContent = "current location";
                });
        });
    }
}

addEventListener("load", () => {
    const date = document.getElementById("date");
    const d = new Date();
    let currentDate = d.toString().slice(4, 15);
    date.innerHTML = currentDate;
});

function displayWeather(data){
    document.querySelector("header h5").style.display = "block";
    const temp = (data.min.temp - 273.15).toFixed(1);
    console.log(temp);
    document.getElementById("temperature-degree").textContent = temp + "Â°"; document.getElementById("city").textContent = input.value;
    document.getElementById("humidity-degree").textContent = data.main.humidity + " %";
    document.getElementById("feelslike-degree").textContent = (data.main.feels_like - 273.15).toFixed(1) + " Â°";
    description.textContent = data.weather[0].description;
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    section.style.display = "block";
    section.classList.add("test");
    document.getElementById("city").style.display = "block";
    locBtn.style.display = "none";
}

form.addEventListener("submit", getData);


///Practice Code