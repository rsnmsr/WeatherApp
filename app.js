///// Functionality for temp Toggler Start
const togglerOFTemp = (x,y) => {

  x.addEventListener('click', () => {
    if (x.innerText === '°C') {
      const tempCel = $(`#${y}`)[0].innerText
      const tempFer = Math.round(((tempCel * 9 / 5) + 32) * 100) / 100
      $(`#${y}`)[0].innerText = tempFer
      x.innerText = '°F'
    } else {
      const tempFer = $(`#${y}`)[0].innerText
      const tempCel = Math.round(((tempFer - 32) * 5 / 9) * 100) / 100
      $(`#${y}`)[0].innerText = tempCel
      x.innerText = '°C'
    }

  })
}
///// Functionality for toggling of temperature Ends
///Div element where everything is appended
const parentDiv=document.querySelector('#parent')

/// Function for sunrise and sunset calculation
const timeCal=(timestamp)=>{
  let unix_timestamp = timestamp
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  if(hours>12){
    hours=hours-12;
  }
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime
  }


////Don't change For the input of Temp toggler fn

const btnFeel = $('.unit')[1];idFT = 'feelTemp';const acttemp=$('.unit')[0];idRT='acttemp'

//// Starting Geolocation 

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  var accuracy = position.coords.accuracy;

  const url1 = "https://api.openweathermap.org/data/2.5/weather/?lat=" + lat + "&lon=" + long + "&appid=0dbd13c3030ff73fad847624b1cc4fbe&units=metric";
  const url2 = "https://api.openweathermap.org/data/2.5/forecast/?lat=" + lat + "&lon=" + long + "&appid=0dbd13c3030ff73fad847624b1cc4fbe&units=metric";

  // const url="https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;

  fetch(url1)
    .then((response) => response.json())
    .then((data) => {

      $('#city')[0].innerText = data.name;
      $('#country')[0].innerText = data.sys.country;
      $("#acttemp")[0].innerText = data.main.temp
      togglerOFTemp(acttemp,idRT)
      $("#feelTemp")[0].innerText = data.main.feels_like
      togglerOFTemp(btnFeel,idFT)
      $("#presure")[0].innerText = data.main.pressure/10+' K-Pa'
      $("#wind")[0].innerText=data.wind.speed+' mph '+data.wind.deg+'degree'
      $('#sunrise')[0].innerText='Sunrise '+timeCal(data.sys.sunrise)+' AM'
      $('#sunset')[0].innerText='SunSet '+timeCal(data.sys.sunset)+' PM'


    });

    let count=1;
    fetch(url2)
      .then((response) => response.json())
      .then((data) => {

       
        for (let timeValue of data.list) {
          // Input all the elements after creating 
          if(count<10){
            const childDiv = document.createElement('div')
            //Max temp
            const maxTemp = document.createElement('p')
            maxTemp.innerHTML = `Max/Min temp ${timeValue.main.temp_max}°C  ${timeValue.main.temp_min}°C;`
            //Humidity
            const humidity = document.createElement('p')
            humidity.innerHTML = `Humidity ${timeValue.main.humidity}%`;

            //Feels like
            const tempFeels = document.createElement('p')
            tempFeels.innerHTML = `Feels Like ${timeValue.main.feels_like}°C`;

            //Images
            const img = document.createElement('img')
            img.src = 'http://openweathermap.org/img/wn/'+timeValue.weather[0].icon+'@2x.png';

            const newDate = document.createElement('p')
            newDate.innerHTML = timeValue.dt_txt;

            childDiv.append(img,maxTemp,humidity,tempFeels,newDate)
            childDiv.classList.add('newParent','col','col-md-3')
            parentDiv.append(childDiv)
            count++;

        }else{
          break
        }
      }
     
      });

});

////Time and date Settings
const d=new Date()
const toDay=`${d.getDate()}-${(d.getMonth())+1}-${d.getFullYear()}`
const time=$('#time')[0];
time.innerHTML=`${toDay} ${new Date().toLocaleTimeString()}`




