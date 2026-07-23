// ЗАГЛУШКА: страница имитирует переход после отправки формы поиска на index.html.

const summaryEl = document.getElementById('searchSummary');
const resultsEl = document.getElementById('busListResults');

// Читаем параметры, переданные из index.html через ?ключ=значение (см. script.js, submit формы)
const params = new URLSearchParams(window.location.search);

const searchData = {
    tripType: params.get('trip_type'),
    from: params.get('city_departure'),
    to: params.get('city_arrival'),
    peopleCount: params.get('people_cnt'),
    dateDepart: params.get('date_depart'),
    dateBack: params.get('date_back'),
};

// Подписи полей для вывода сводки поиска
const fieldLabels = {
    tripType: 'Trip type',
    from: 'From',
    to: 'To',
    peopleCount: 'Passengers',
    dateDepart: 'Depart',
    dateBack: 'Return',
};

function renderSearchSummary(data) {
    summaryEl.innerHTML = '';

    const hasAnyParam = Object.values(data).some(value => value);

    if (!hasAnyParam) {
        summaryEl.innerHTML = '<div class="search-summary__item">No search parameters received — open this page via the search form on the home page.</div>';
        return;
    }

    Object.entries(data).forEach(([key, value]) => {
        if (!value) return;
        const item = document.createElement('div');
        item.className = 'search-summary__item';
        item.innerHTML = `<span>${fieldLabels[key]}:</span> ${value}`;
        summaryEl.append(item);
    });
}

renderSearchSummary(searchData);
