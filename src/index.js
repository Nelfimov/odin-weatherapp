import '/src/style.css';

const button = document.getElementById('search');
const API_KEY = 'a2ac823da8e43b3e2f997faf173488b8';
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&limit=5&units=metric&q=`;

function loadInfo() {
  const loader = document.getElementById('loader');
  loader.classList.remove('hidden');
  const output = document.querySelector('#result>p');
  const input = document.getElementById('city');
  const response = fetch(URL + input.value, {
    mode: 'cors',
  });
  response.then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    if (data.cod === '404') {
      output.textContent = data.message
    } else {
      const { name, main: temp, weather, wind } = data;
      output.textContent = `Location: ${name}\r\n`;
      output.textContent += `Current temperature: ${Math.round(temp.temp)}\r\n`;
      output.textContent += `Temperature feels like: ${Math.round(temp.feels_like)}\r\n`;
      output.textContent += `Temperature feels like: ${Math.round(temp.feels_like)}\r\n`;
      output.textContent += `Humidity: ${Math.round(temp.humidity)}\r\n`;
    };

    document.querySelectorAll('#result *').forEach((item) => item.classList.remove('hidden'));
    loader.classList.add('hidden');
  }).catch((err) => console.log(err));
};

button.addEventListener('click', loadInfo);
document.getElementById('city').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    loadInfo();
  }
});
