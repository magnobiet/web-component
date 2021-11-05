const template = document.createElement('template');
template.innerHTML = `
  <style>

    .loader-wrapper {
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-radius: 10px;
      text-align: center;
    }

    .loader {
      width: 60px;
      height: 60px;
      border: 5px solid #f1f1f1;
      border-top: 5px solid #8c85fe;
      margin: 0;
      animation: spin 2s linear infinite;
      border-radius: 50%;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .card {
      position: relative;
      width: 250px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .15);
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .card-body {
      height: 150px;
      padding: 20px;
      background: linear-gradient(180deg, #8c85fe 0%, #72c0e2 100%);
      border-radius: 10px;
    }

    .city-name {
      margin: 0;
      font-size: 16px;
      text-align: center;
    }

    .image {
      width: 100px;
      height: 100px;
    }

    .current-weather {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 10px 0;
    }

    .temp {
      margin: 0;
      font-size: 48px;
    }

    .description {
      margin: 0;
      font-size: 14px;
      font-weight: lighter;
    }

  </style>

  <div class="card">

    <div id="loader" class="loader-wrapper">
      <span class="loader"></span>
    </div>

    <div class="card-body">

      <h1 class="city-name"></h1>

      <div class="current-weather">

        <img class="image" />

        <div>

          <p class="temp"></p>
          <p class="description"></p>

        </div>

      </div>

    </div>

  </div>
`;

class WeatherForecast extends HTMLElement {
  #apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?appid=API_KEY&units=metric&lang=pt_br&q=`;

  constructor() {
    super();

    this.init();
  }

  async #getForecast() {
    const endpoint = `${this.#apiEndpoint}${this.getAttribute('city')}`.replace('API_KEY', this.getAttribute('apiKey'));
    const response = await fetch(endpoint);
    const { name, weather, main } = await response.json();

    return { name, weather, main };
  }


  async init() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const data = await this.#getForecast();
    const weather = data.weather[0];
    const main = data.main;

    const $ = (selector) => this.shadowRoot.querySelector(selector);

    $('img').src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    $('img').alt = weather.description;
    $('.city-name').innerHTML = data.name;
    $('.temp').innerHTML = `${Math.round(main.temp)}°`;
    $('.description').innerHTML = weather.description;

    $('#loader').remove();
  }
}

window.customElements.define('weather-forecast', WeatherForecast);
