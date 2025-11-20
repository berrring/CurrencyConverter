// Элементы управления
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const swapBtn = document.getElementById('swap');
const convertBtn = document.getElementById('convert-btn');
const rateDisplay = document.getElementById('rate-display');

// Переменные для хранения выбранных валют
let currentCurrency1 = 'USD';
let currentCurrency2 = 'EUR';

// Данные для отображения
let allCurrencies = [];

// Функция флагов
function getFlagEmoji(currencyCode) {
    if(currencyCode === 'EUR') return '🇪🇺';
    if(currencyCode === 'USD') return '🇺🇸';
    // Если нет кода, возвращаем глобус
    if(!currencyCode) return '🌐'; 
    
    const codePoints = currencyCode
      .toUpperCase()
      .slice(0, 2)
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

// Функция загрузки валют
async function loadCurrencies() {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        // Получаем список кодов валют
        allCurrencies = Object.keys(data.rates);
        
        // Инициализируем списки
        initDropdown('one', allCurrencies);
        initDropdown('two', allCurrencies);

    } catch (err) {
        console.error(err);
        rateDisplay.innerText = "Error loading list";
    }
}

// Логика кастомного выпадающего списка
function initDropdown(idSuffix, currencies) {
    const trigger = document.getElementById(`trigger-${idSuffix}`);
    const optionsMenu = document.getElementById(`options-${idSuffix}`);
    const list = document.getElementById(`list-${idSuffix}`);
    const searchInput = document.getElementById(`search-${idSuffix}`);
    const flagSpan = document.getElementById(`flag-${idSuffix}`);
    const codeSpan = document.getElementById(`code-${idSuffix}`);

    // 1. Заполняем список (ul)
    function renderList(filterText = '') {
        list.innerHTML = ''; // Очистить
        const filter = filterText.toUpperCase();

        currencies.forEach(code => {
            // Простая проверка для поиска
            if (code.includes(filter)) {
                const li = document.createElement('li');
                li.className = 'option-item';
                li.innerHTML = `<span class="flag">${getFlagEmoji(code)}</span> ${code}`;
                
                // Клик по элементу списка
                li.addEventListener('click', () => {
                    // Обновляем выбранное значение
                    if (idSuffix === 'one') currentCurrency1 = code;
                    else currentCurrency2 = code;

                    // Обновляем визуальную часть (заголовок)
                    flagSpan.textContent = getFlagEmoji(code);
                    codeSpan.textContent = code;

                    // Закрываем меню
                    optionsMenu.classList.remove('open');
                    searchInput.value = ''; // Очистить поиск
                    renderList(); // Сбросить фильтр
                });

                list.appendChild(li);
            }
        });
    }

    // Первый рендер
    renderList();

    // 2. Открытие/закрытие по клику
    trigger.addEventListener('click', (e) => {
        // Закрываем другой список если открыт
        const otherId = idSuffix === 'one' ? 'two' : 'one';
        document.getElementById(`options-${otherId}`).classList.remove('open');
        
        optionsMenu.classList.toggle('open');
        // Фокус на поиск сразу
        if(optionsMenu.classList.contains('open')) {
            searchInput.focus();
        }
        e.stopPropagation();
    });

    // 3. Поиск (фильтрация)
    searchInput.addEventListener('input', (e) => {
        renderList(e.target.value);
    });

    // Закрытие при клике вне элемента
    document.addEventListener('click', (e) => {
        if (!trigger.contains(e.target) && !optionsMenu.contains(e.target)) {
            optionsMenu.classList.remove('open');
        }
    });
}

// Логика конвертации (по кнопке)
async function calculate() {
    const amount = amountOne.value;

    if(amount === '' || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Converting...';
    convertBtn.disabled = true;

    try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${currentCurrency1}`);
        const data = await res.json();
        const rate = data.rates[currentCurrency2];

        const result = (amount * rate).toFixed(2);
        amountTwo.value = result;

        rateDisplay.innerText = `1 ${currentCurrency1} = ${rate.toFixed(4)} ${currentCurrency2}`;

    } catch (err) {
        rateDisplay.innerText = "Error fetching rates";
    } finally {
        convertBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Convert Currency';
        convertBtn.disabled = false;
    }
}

// Событие клика кнопки "Конвертировать"
convertBtn.addEventListener('click', calculate);

// Кнопка смены мест (Swap)
swapBtn.addEventListener('click', () => {
    // Меняем значения переменных
    const tempCode = currentCurrency1;
    currentCurrency1 = currentCurrency2;
    currentCurrency2 = tempCode;

    // Меняем визуальное отображение
    document.getElementById('flag-one').textContent = getFlagEmoji(currentCurrency1);
    document.getElementById('code-one').textContent = currentCurrency1;
    
    document.getElementById('flag-two').textContent = getFlagEmoji(currentCurrency2);
    document.getElementById('code-two').textContent = currentCurrency2;
});

// Запуск
loadCurrencies();