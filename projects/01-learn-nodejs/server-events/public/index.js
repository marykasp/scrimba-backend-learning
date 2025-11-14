const eventSource = new EventSource("/temp/live");

// where is data updating in html
const tempDisplay = document.getElementById("temp-display");

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const temperature = data.temp;

  tempDisplay.textContent = temperature;
};
eventSource.onerror = () => {
  console.log("Connection failed");
};
