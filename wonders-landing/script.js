const menuIcon = document.querySelector('.menu_icon');
const navMenu = document.querySelector('.header nav');

const counterMinus = document.getElementById('decrease-btn');
const counterPlus = document.getElementById('increase-btn');
const counterValue = document.getElementById('input');

const ticketsForm = document.querySelector('#tickets form');

const departureInput = document.getElementById('departure');
const returnInput = document.getElementById('returnDate');

const departureCityInput = document.getElementById('departureCity');
const arrivalCityInput = document.getElementById('arrivalCity');
const departureCityList = document.getElementById('departureCityList');
const arrivalCityList = document.getElementById('arrivalCityList');



                            // ОТКРЫТИЕ-ЗАКРЫТИЕ ВЫПАДАЮЩЕГО МЕНЮ

menuIcon.addEventListener('click', () => {
  navMenu.classList.toggle('menu_active')
})

                                // СЧЕТЧИК

let cntValue = 1;
counterValue.value = cntValue;

counterMinus.addEventListener('click', () => {
    if(cntValue > 1){
        --cntValue;
        counterValue.value = cntValue;
    }
});

counterPlus.addEventListener('click', () => {
    if(cntValue < 12){
        ++cntValue;
        counterValue.value = cntValue;
    }
});

                         // ФОРМА

ticketsForm.addEventListener('submit', event => {
  event.preventDefault();
  let formData = new FormData(ticketsForm);
  const data = {
                  ...Object.fromEntries(formData), 
                  people_cnt: cntValue,
                  date_depart: departureInput.value,
                  date_back: returnInput.value,
               }
  console.log(data);
})

// const newTrip = {
//   trip_type: 'round',
//   people_cnt: 4,
//   city_departure: "Berlin",
//   city_arrival: "Madrid",
//   date_depart: "",
//   date_back: ""
// }

// Список станций для фильтрации при вводе в поля Departure/Arrival
const Stations = [
    // Switzerland
    "Zermatt Bus Terminal",
    "Interlaken Ost Bus Station",
    "Grindelwald Bus Terminal",
    "Lauterbrunnen Bahnhof",
    "Lucerne Bahnhofquai",
    "Chamonix-Mont-Blanc Sud (France, near Swiss border)",
    "Geneva Bus Station",
    "Bern PostAuto Terminal",
    "Gstaad Bus Station",
    "St. Moritz Bahnhof PostAuto",
    "Verbier Village",
    "Davos Platz Postautohaltestelle",
    "Andermatt Gotthardpass",
    "Täsch Bahnhof (Shuttle to Zermatt)",
    "Flims Dorf Post",

    // France
    "Chamonix Sud Bus Station",
    "Annecy Gare Routière",
    "Grenoble Gare Routière",
    "Nice Airport (Bus to Alps)",
    "Bourg-Saint-Maurice Gare Routière",
    "Morzine Gare Routière",
    "Les Gets Gare Routière",
    "Val d'Isère Centre",
    "Courchevel 1850",
    "Megève Place du Village",

    // Italy
    "Aosta Autostazione",
    "Bolzano Autostazione",
    "Trento Autostazione",
    "Cortina d'Ampezzo Autostazione",
    "Bormio Bus Station",
    "Livigno Centro",
    "Merano Autostazione",
    "Sestriere Bus Stop",
    "Ortisei (St. Ulrich) Autostazione",
    "Canazei Piazza Marconi",

    // Austria
    "Innsbruck Hauptbahnhof Bus Terminal",
    "Salzburg Süd Busbahnhof",
    "Mayrhofen Bahnhof",
    "Lech am Arlberg Postamt",
    "Kitzbühel Hahnenkammbahn",
    "Ischgl Seilbahn",
    "Zell am See Postplatz",
    "Bad Gastein Bahnhof",
    "St. Anton am Arlberg Bahnhof",
    "Sölden Postamt",

    // Germany
    "Garmisch-Partenkirchen Bahnhof (Bus Station)",
    "Berchtesgaden Busbahnhof",
    "Oberstdorf Busbahnhof",
    "Füssen Bahnhof (Bus Station)",
    "Mittenwald Bahnhof (Bus Station)",

    // Slovenia
    "Bled Bus Station",
    "Bohinj Jezero",
    "Kranjska Gora Avtobusna Postaja"
];

// инициализируем автодополнение для одного инпута:
function initAutocomplete(input, listEl) { 
    input.addEventListener('input', () => { //слушаем ввод текста, чтобы фильтровать список на лету
        const query = input.value.trim().toLowerCase() //нормализуем регистр для сравнения
        listEl.innerHTML = ''; //очищаем предыдущие варианты перед новым рендером

        if (!query) {
            listEl.classList.remove('is-open'); //пустой инпут - список скрыт
            return;
        }

        //фильтруем станции по подстрокам
        const matches = Stations.filter(station => 
            station.toLowerCase().includes(query)).slice(0, 8); //ограничиваем список, чтобы не растягивать страницу

        if (matches.length === 0) {
            listEl.classList.remove('is-open'); //совпадений нет - список скрыт
            return;
        }

        //рендерим каждый вариант как <li> с обработчиком выбора
        matches.forEach(station => {
            const li = document.createElement('li');
            li.textContent = station;
            li.addEventListener('click', () => {
                input.value = station; //подставляем выбранную станцию в поле
                listEl.innerHTML = '';
                listEl.classList.remove('is-open');
                clearFieldError(input); //убираем ошибку валидации при выборе станции
            });
            listEl.append(li);
        });
        listEl.classList.add('is-open'); //показываем список подсказок
    });

    //закрываем список при клике вне поля/списка
    document.addEventListener('click', (event) => {
        if (event.target !== input && event.target !== listEl) {
            listEl.classList.remove('is-open');
        }
    });
}

//подключаем автодополнение к обоим полям формы
initAutocomplete(departureCityInput, departureCityList);
initAutocomplete(arrivalCityInput, arrivalCityList);



                        // DATE PICKER
const picker = flatpickr(departureInput, {
    mode: "range",
    showMonths: 2,
    // locale: "eu",
    dateFormat: "d.m.Y",
    closeOnSelect: false,   // не закрываем сразу — закрытие по кнопке Apply
    minDate: "today",

    onOpen: function () {
      departureInput.classList.add('active');
      returnInput.classList.add('active');
    },
    onClose: function () {
      departureInput.classList.remove('active');
      returnInput.classList.remove('active');
    },

    // Главное: при любом изменении выбора — раскладываем даты по двум полям
    onChange: function (selectedDates, dateStr, instance) {
      departureInput.value = selectedDates[0]
        ? instance.formatDate(selectedDates[0], "d.m.Y")
        : "";
      returnInput.value = selectedDates[1]
        ? instance.formatDate(selectedDates[1], "d.m.Y")
        : "";

        departureInput.style.backgroundImage = selectedDates[0] ? 'none' : '';
        returnInput.style.backgroundImage = selectedDates[1] ? 'none' : '';
    },

    onReady: function (selectedDates, dateStr, instance) {
      addFooter(instance);
    }
});

// Клик по "Return" открывает тот же календарь, что и "Departure"
returnInput.addEventListener("click", () => picker.open());

function addFooter(instance) {
    const footer = document.createElement("div");
    footer.className = "fp-footer";

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "fp-reset";
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      instance.clear();
      departureInput.value = "";
      returnInput.value = "";

      departureInput.style.backgroundImage = '';
        returnInput.style.backgroundImage = '';
    });

    const applyBtn = document.createElement("button");
    applyBtn.type = "button";
    applyBtn.className = "fp-apply";
    applyBtn.textContent = "Apply";
    applyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      instance.close();
    });

    // footer.appendChild(resetBtn);
    // footer.appendChild(applyBtn);
    instance.calendarContainer.appendChild(footer);
}






// FAQs

// Представим, что мы получили данные с сервера...

const faqs = [
    {
        question: "Alpine Bus Journeys?",
        answer: "Forget crowded cities! Alpine Bus Journeys are your comfy seat with panoramic windows to breathtaking mountain vistas, charming villages, and air so fresh it might make you yodel (please don't, unless you're outside). It's transportation with a side of unparalleled scenery (and maybe a hairpin turn)."
    },
        {
        question: "What about seating options?",
        answer: "Generally, you'll find comfy standard seats (great views, great value, maybe great new friends) and perhaps slightly better seats with extra legroom. All offer a front-row seat to the greatest show on Earth – the Alps!"
    },
    {
        question: "What is the Alpine Wallet?",
        answer: "It's your digital stash of cash that makes booking bus tickets smoother than a perfectly paved mountain road. Load it up and watch your travel dreams become reality faster than a bus goes downhill."
    },
    {
        question: "My Altitude Score?",
        answer: "Your loyalty points for cruising the mountain roads! Higher scores might get you priority boarding (less elbowing for the best window seat!) or maybe just bragging rights among fellow peak-passengers who prefer four wheels."
    },
    {
        question: "Why a Bus Station Fee?",
        answer: "A small contribution to ensure the station is clean, has reasonably fresh mountain air (filtered from bus fumes), and enough signs pointing you towards your bus, not away from it. Sometimes covers the cost of moving rogue bicycles."
    },
    {
        question: "Why are buses late?",
        answer: "Sometimes it's the weather (snow happens!), sometimes a sudden flock of particularly slow-moving sheep on the road, and sometimes the driver just had to stop for a photo of that view. Or maybe they got stuck behind a tractor. Welcome to \"Mountain Road Time\"!"
    },
     {
        question: "Peak Season Surcharge?",
        answer: "SIt's the little extra you pay to enjoy the authentic experience of sharing breathtaking views with a lot of your closest friends (who you haven't met yet) while strategically placing your bag in the overhead compartment. Guarantees a vibrant, energetic journey!"
    },
]

const faqsContainer = document.querySelector('.faqs_container');

faqs.forEach(({ question, answer }) => {
    const detailsElem = document.createElement('details');
    const summaryElem = document.createElement('summary');
    const pElem = document.createElement('p');

    summaryElem.innerText = question;
    pElem.innerText = answer;

    detailsElem.append(summaryElem, pElem);
    faqsContainer.append(detailsElem);
})

const allDetailsItems = document.querySelectorAll('.faqs_container details');

allDetailsItems.forEach(item => {
    item.addEventListener('toggle', () => {
        if(item.open) {
            allDetailsItems.forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.open = false
                }
            })
        }
    })
});
