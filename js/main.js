
const apiKey = 'f084638a380a426e9e750756232209';
const days = 10;
const locationInput = document.getElementById('search_input');
console.log(locationInput.value);
var xValues = [];

document.getElementById('search_btn').onclick = () => {
  const location = locationInput.value;
  const tempC_Ar = [];
  fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status code: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const date = data.location.localtime;
      const tempC = data.current.temp_c;
      const windKph = data.current.wind_kph;
      const humidity = data.current.humidity;
      const location_value = data.location.name;
      const prespictation = data.current.precip_mm;

      console.log(date);
      var tempreture = document.getElementById('temperature');
      var wind_speed = document.getElementById('wind_speed');
      var humidity_element = document.getElementById('humidity');
      var location = document.getElementById('location');
      var precipictation_element = document.getElementById('precipitation');
      var date_element =  document.getElementById('time');


      tempreture.innerHTML = `${Math.trunc( tempC )}`;
      wind_speed.innerHTML = `${Math.trunc( windKph )}`;
      humidity_element.innerHTML = `${Math.trunc( humidity )}`;
      location.innerHTML = `${location_value}`;
      precipictation_element.innerHTML = `${Math.trunc( prespictation )}`
      date_element.innerHTML = `${date.substring(10)}`;

      

      data.forecast.forecastday[0].hour.forEach(hourData =>{
        tempC_Ar.push(hourData.temp_c);
      });
      console.log(tempC_Ar);
       xValues=tempC_Ar;
    })
    .catch(error => {
      console.error(`Error: ${error.message}`);
    })
    .then(()=>{

      
      console.log(xValues);
      const yValues = [-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16.17,18,19,20,21,22,23,24];
      
      new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
          }]
        },
        options: {
          legend: {display: false},
          scales: {
            xAxes: [{
              display: false, // Hide x-axis
            }],
            yAxes: [{
              display: false, // Hide y-axis
            }]
          },
          tooltips: {
            enabled: true,
            mode: 'nearest', 
            intersect: false, 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            titleFontColor: 'white', 
            bodyFontColor: 'white', 
            titleFontSize: 14, 
            bodyFontSize: 12, 
            titleAlign: 'center', 
            bodyAlign: 'center', 
            displayColors: false,
            callbacks: {
              title: function(tooltipItem, data) {
                return  tooltipItem[0].xLabel+'°C';
              },
              label: function(tooltipItem, data) {
                return ;
              },
            },
          },
        }
      }
      )});
      
      
      
      
    }

var suggession_list = document.getElementById('location_suggessions');
locationInput.addEventListener("input", () => {
  console.log(locationInput.value);
  const location = locationInput.value;
  console.log(location);
  fetch(`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${location}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status code: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      var list;
      data.forEach(name => {
        list = `<option value="${name}">${name}</option>`;
      });
      suggession_list.innerHTML = list;
    })
    .catch(error => {
      console.error(`Error: ${error.message}`);
    });
});

