/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "68f0cad30eb13e1b8ea705f3836991c1";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear();

//Add event listener to click event on button with id 'generate'
document.getElementById("generate").addEventListener("click", performAction);

async function performAction() {
  const zipCode = document.getElementById("zip").value;
  if (!zipCode) {
    alert("Please Enter Zip Code.");
  } else {
    try {
      getWeatherData(baseUrl, zipCode, apiKey)
        .then((weatherData) => {
          return postData("data", {
            temperature: weatherData.main.temp,
            date: newDate,
            userResponse: document.getElementById("feelings").value,
          });
        })
        .then(() => {
          updateUI();
        });
    } catch (error) {
      console.log("performAction error", error);
    }
  }
}

// Async GET Weather data based on ZipCode
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
  const url = `${baseUrl}?zip=${zipCode}&appid=${apiKey}&units=imperial`;
  const request = await fetch(url);

  try {
    return await request.json();
  } catch (error) {
    console.log("getWeatherData error", error);
  }
};

// Async POST To Server
const postData = async (path, data) => {
  const url = `http://localhost:3000/${path}`;
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (error) {
    console.log("postData error", error);
  }
};

//Update UI Dynamically
const updateUI = async () => {
  const url = `http://localhost:3000/data`;
  const response = await fetch(url);

  try {
    const projectData = await response.json();
    document.getElementById(
      "date"
    ).innerHTML = `Today is : ${projectData.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temprature : ${projectData.temperature} F`;
    document.getElementById(
      "content"
    ).innerHTML = `Your Feelings : ${projectData.userResponse}`;
  } catch (error) {
    console.log("updateUI error : ", error);
  }
};
