/* Global Variables */
// ex.URL : api.openweathermap.org/data/2.5/weather?zip={zipCode},us&appid={{apiKey}}
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "68f0cad30eb13e1b8ea705f3836991c1";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//Add event listener to click event on button with id 'generate'
document.getElementById("generate").addEventListener("click", performAction);

async function performAction() {
  try {
    // #region using async and await

    //call getWeatherData
    /*
    const weatherData = await getWeatherData(
      baseUrl,
      document.getElementById("zip").value,
      apiKey
    );
    */

    //prepare response
    /*
    const postedData = {
      temperature: weatherData.main.temp,
      date: newDate,
      userResponse: document.getElementById("feelings").value,
    };
    */

    //call postData to server
    /*
    const postDataResult = await postData("/data", postedData);
    */

    //update UI
    /*
    await updateUI();
    */

    //#endregion

    // #region using promise chaining

    getWeatherData(baseUrl, document.getElementById("zip").value, apiKey)
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

    // #endregion
  
} catch (error) {
    console.log("performAction error", error);
  }
}

// Async GET Weather data based on ZipCode
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
  const url = `${baseUrl}?zip=${zipCode}&appid=${apiKey}`;
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
    document.getElementById("date").innerHTML = `Today is : ${projectData.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temprature : ${projectData.temperature} K`;
    document.getElementById(
      "content"
    ).innerHTML = `Your Feelings : ${projectData.userResponse}`;
  } catch (error) {
    console.log("updateUI error : ", error);
  }
};
