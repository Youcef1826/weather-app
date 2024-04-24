"use strict"; // Strict mode activated
let axios = window.axios;

const city = document.getElementById("city");
const search = document.getElementById("search-btn");
const weather = document.getElementById("display-weather");
const errorMessage = document.getElementById("error-message");


const searchEvent = async () => { // Function

    try {

        if (city.value == "") {

            errorMessage.innerHTML = `
            <p class="flex items-center border-[1px] border-red-400 bg-red-200 text-red-500 rounded-md p-2 mt-3 text-sm">
            <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" style="fill: rgb(239 68 68);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path></svg>You must add a city</p>
            `;

        } else {

            errorMessage.innerHTML = "";

            const weatherApiKey = "c088c4c7048d386cfdd070a7940ff917"; // API key
            const cityValue = city.value; // Stock input value
            const tempCelsius = "&units=metric"; // Add celsius

            const apiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}${tempCelsius}&524901&appid=${weatherApiKey}`); // OpenWeatherMap API
            
            const iconurl = `https://openweathermap.org/img/wn/${apiResponse.data.weather[0].icon}@2x.png`; // Icon weather URL

            // Add HTML elements
            weather.innerHTML = `
            <div class="flex justify-between gap-10 items-center shadow-lg p-6 rounded-lg mb-10">
                <div class="flex flex-col justify-center">
                    <img src="${iconurl}" alt="Weather icon">
                    <p class="font-medium text-lg text-center">${apiResponse.data.weather[0].description}</p>
                </div>

                <div>
                    <div class="flex flex-col gap-4">
                        <p class="text-6xl font-bold">${apiResponse.data.main.temp}<span class="text-sm font-medium"> °C</span></p>

                        <div class="flex justify-center gap-3">
                            <span class="flex items-center"><svg class=" mr-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" style="fill: rgb(0,191,255);transform: ;msFilter:;"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg> ${apiResponse.data.main.temp_min} °C</span>
                            <span class="flex items-center"><svg class=" mr-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" style="fill: rgb(255, 165, 0, 1);transform: ;msFilter:;"><path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path></svg> ${apiResponse.data.main.temp_max} °C</span>        
                        </div>
                    </div>
                    <p class=" flex items-center text-xl font-bold"><svg class=" mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: rgb(139,0,0);transform: ;msFilter:;"><path d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path><path d="M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.005.021 4.438-4.388 8.423-6 9.73-1.611-1.308-6.021-5.294-6-9.735 0-3.309 2.691-6 6-6z"></path></svg>${apiResponse.data.name}, ${apiResponse.data.sys.country}</p>
                </div>
            </div>
            `;
        };
        
    } catch (error) {

        alert("Error !");
    };

};


city.onkeydown = (event) => {
    
    if (event.keyCode == 13) {
        searchEvent();
    };
};

search.onclick = searchEvent;