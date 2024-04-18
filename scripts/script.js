const cityName = document.querySelector('#city-name')

document.querySelector('#search').addEventListener('click', async function (event) {
    event.preventDefault()

    if(!cityName.value) return showAlert('O campo está vazio')

    const apiKey = '50b72801b1ab29e4a54023c8122b9f66'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName.value)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl)
    const json = await results.json()

    if(json.cod === 200) {
        console.log('Correto')
        forecastWorking(json)
    } else {
        showAlert('Não foi possível localizar')
    }
})

const showAlert = (value) => {
    Toastify({
        text: value,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#ef4444",
        },
    }).showToast()

    return
}

const forecastWorking = (json) => {
    const infos = document.querySelector('#infos')
    const cityNameInfo = document.querySelector('#city-name-info')
    const tempImg = document.querySelector('#temp-img')
    const temp = document.querySelector('#temp')
    const description = document.querySelector('#description')
    const tempMin = document.querySelector('#temp-min')
    const tempMax = document.querySelector('#temp-max')
    const humidity = document.querySelector('#humidity')
    const wind = document.querySelector('#wind')

    infos.classList.remove('hidden')

    cityNameInfo.innerHTML = `${json.name}, ${json.sys.country}`
    tempImg.setAttribute('src', `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)
    temp.innerHTML = `${json.main.temp.toFixed(1).toString().replace('.', ',')} <sup class="text-2xl absolute top-4 right-5">C°</sup>`
    description.innerHTML = `${capitalizeFirstLetter((json.weather[0].description))}`
    tempMin.innerHTML = `${json.main.temp_min.toFixed(1).toString().replace('.', ',')}<sup>°C</sup>`
    tempMax.innerHTML = `${json.main.temp_max.toFixed(1).toString().replace('.', ',')}<sup>°C</sup>`
    humidity.innerHTML = `${json.main.humidity}%`
    wind.innerHTML = `${json.wind.speed.toFixed(1).toString().replace('.', ',')} Km/h`
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}