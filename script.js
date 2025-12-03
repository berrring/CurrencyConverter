const BASE_URL = 'https://open.er-api.com/v6/latest/';

// 1. ПОЛНЫЙ СЛОВАРЬ НАЗВАНИЙ (ВКЛЮЧАЯ РЕДКИЕ И КРИПТУ)
const currencyNames = {
    // Основные
    'USD': 'United States Dollar', 'EUR': 'Euro', 'RUB': 'Russian Ruble',
    'GBP': 'British Pound', 'JPY': 'Japanese Yen', 'CNY': 'Chinese Yuan',
    'KZT': 'Kazakhstani Tenge', 'KGS': 'Kyrgyzstani Som', 'UAH': 'Ukrainian Hryvnia',
    'BYN': 'Belarusian Ruble', 'TRY': 'Turkish Lira', 'KRW': 'South Korean Won',
    
    // Те, что были на скринах
    'CDF': 'Congolese Franc',
    'CLF': 'Chilean Unit of Account (UF)',
    'CNH': 'Chinese Yuan (Offshore)',
    'WST': 'Samoan Tala',
    'XAF': 'Central African CFA Franc',
    'XCD': 'East Caribbean Dollar',
    'XOF': 'West African CFA Franc',
    'XPF': 'CFP Franc',
    'XDR': 'Special Drawing Rights', // МВФ
    
    // Остальной мир
    'AED': 'UAE Dirham', 'AFN': 'Afghan Afghani', 'ALL': 'Albanian Lek',
    'AMD': 'Armenian Dram', 'ANG': 'Neth. Antillean Guilder', 'AOA': 'Angolan Kwanza',
    'ARS': 'Argentine Peso', 'AUD': 'Australian Dollar', 'AWG': 'Aruban Florin',
    'AZN': 'Azerbaijani Manat', 'BAM': 'Bosnia-Herz. Mark', 'BBD': 'Barbadian Dollar',
    'BDT': 'Bangladeshi Taka', 'BGN': 'Bulgarian Lev', 'BHD': 'Bahraini Dinar',
    'BIF': 'Burundian Franc', 'BMD': 'Bermudian Dollar', 'BND': 'Brunei Dollar',
    'BOB': 'Bolivian Boliviano', 'BRL': 'Brazilian Real', 'BSD': 'Bahamian Dollar',
    'BTN': 'Bhutanese Ngultrum', 'BWP': 'Botswana Pula', 'BZD': 'Belize Dollar',
    'CAD': 'Canadian Dollar', 'CHE': 'WIR Euro', 'CHF': 'Swiss Franc', 'CHW': 'WIR Franc',
    'CLP': 'Chilean Peso', 'COP': 'Colombian Peso', 'CRC': 'Costa Rican Colon',
    'CUC': 'Cuban Convertible Peso', 'CUP': 'Cuban Peso', 'CVE': 'Cape Verdean Escudo',
    'CZK': 'Czech Koruna', 'DJF': 'Djiboutian Franc', 'DKK': 'Danish Krone',
    'DOP': 'Dominican Peso', 'DZD': 'Algerian Dinar', 'EGP': 'Egyptian Pound',
    'ERN': 'Eritrean Nakfa', 'ETB': 'Ethiopian Birr', 'FJD': 'Fijian Dollar',
    'FKP': 'Falkland Islands Pound', 'GEL': 'Georgian Lari', 'GGP': 'Guernsey Pound',
    'GHS': 'Ghanaian Cedi', 'GIP': 'Gibraltar Pound', 'GMD': 'Gambian Dalasi',
    'GNF': 'Guinean Franc', 'GTQ': 'Guatemalan Quetzal', 'GYD': 'Guyanese Dollar',
    'HKD': 'Hong Kong Dollar', 'HNL': 'Honduran Lempira', 'HRK': 'Croatian Kuna',
    'HTG': 'Haitian Gourde', 'HUF': 'Hungarian Forint', 'IDR': 'Indonesian Rupiah',
    'ILS': 'Israeli New Shekel', 'IMP': 'Isle of Man Pound', 'INR': 'Indian Rupee',
    'IQD': 'Iraqi Dinar', 'IRR': 'Iranian Rial', 'ISK': 'Icelandic Krona',
    'JEP': 'Jersey Pound', 'JMD': 'Jamaican Dollar', 'JOD': 'Jordanian Dinar',
    'KES': 'Kenyan Shilling', 'KHR': 'Cambodian Riel', 'KMF': 'Comorian Franc',
    'KWD': 'Kuwaiti Dinar', 'KYD': 'Cayman Islands Dollar', 'LAK': 'Lao Kip',
    'LBP': 'Lebanese Pound', 'LKR': 'Sri Lankan Rupee', 'LRD': 'Liberian Dollar',
    'LSL': 'Lesotho Loti', 'LYD': 'Libyan Dinar', 'MAD': 'Moroccan Dirham',
    'MDL': 'Moldovan Leu', 'MGA': 'Malagasy Ariary', 'MKD': 'Macedonian Denar',
    'MMK': 'Burmese Kyat', 'MNT': 'Mongolian Tughrik', 'MOP': 'Macanese Pataca',
    'MRU': 'Mauritanian Ouguiya', 'MUR': 'Mauritian Rupee', 'MVR': 'Maldivian Rufiyaa',
    'MWK': 'Malawian Kwacha', 'MXN': 'Mexican Peso', 'MYR': 'Malaysian Ringgit',
    'MZN': 'Mozambican Metical', 'NAD': 'Namibian Dollar', 'NGN': 'Nigerian Naira',
    'NIO': 'Nicaraguan Cordoba', 'NOK': 'Norwegian Krone', 'NPR': 'Nepalese Rupee',
    'NZD': 'New Zealand Dollar', 'OMR': 'Omani Rial', 'PAB': 'Panamanian Balboa',
    'PEN': 'Peruvian Sol', 'PGK': 'Papua New Guinean Kina', 'PHP': 'Philippine Peso',
    'PKR': 'Pakistani Rupee', 'PLN': 'Polish Zloty', 'PYG': 'Paraguayan Guarani',
    'QAR': 'Qatari Rial', 'RON': 'Romanian Leu', 'RSD': 'Serbian Dinar',
    'RWF': 'Rwandan Franc', 'SAR': 'Saudi Riyal', 'SBD': 'Solomon Islands Dollar',
    'SCR': 'Seychellois Rupee', 'SDG': 'Sudanese Pound', 'SEK': 'Swedish Krona',
    'SGD': 'Singapore Dollar', 'SHP': 'Saint Helena Pound', 'SLL': 'Sierra Leonean Leone',
    'SOS': 'Somali Shilling', 'SRD': 'Surinamese Dollar', 'SSP': 'South Sudanese Pound',
    'STN': 'Sao Tome Dobra', 'SVC': 'Salvadoran Colon', 'SYP': 'Syrian Pound',
    'SZL': 'Swazi Lilangeni', 'THB': 'Thai Baht', 'TJS': 'Tajikistani Somoni',
    'TMT': 'Turkmenistani Manat', 'TND': 'Tunisian Dinar', 'TOP': 'Tongan Paʻanga',
    'TTD': 'Trinidad & Tobago Dollar', 'TWD': 'New Taiwan Dollar', 'TZS': 'Tanzanian Shilling',
    'UGX': 'Ugandan Shilling', 'UYU': 'Uruguayan Peso', 'UZS': 'Uzbekistani Som',
    'VES': 'Venezuelan Bolívar', 'VND': 'Vietnamese Dong', 'VUV': 'Vanuatu Vatu',
    'WST': 'Samoan Tala', 'XAG': 'Silver (troy ounce)', 'XAU': 'Gold (troy ounce)',
    'YER': 'Yemeni Rial', 'ZAR': 'South African Rand', 'ZMW': 'Zambian Kwacha',
    'ZWL': 'Zimbabwean Dollar'
};

// 2. ИСПРАВЛЕНИЕ ФЛАГОВ (Карта спец. символов)
const customFlagMap = {
    'EUR': 'https://flagcdn.com/w40/eu.png', // Евросоюз
    'USD': 'https://flagcdn.com/w40/us.png',
    'GBP': 'https://flagcdn.com/w40/gb.png',
    'CNH': 'https://flagcdn.com/w40/cn.png', // Офшорный юань -> Китай
    
    // Африканские и Карибские союзы (нет своих флагов в ISO, берем представителя или глобус)
    'XAF': 'https://flagcdn.com/w40/cm.png', // Центральная Африка -> используем Камерун
    'XOF': 'https://flagcdn.com/w40/sn.png', // Западная Африка -> Сенегал
    'XCD': 'https://flagcdn.com/w40/ag.png', // Карибы -> Антигуа
    'ANG': 'https://flagcdn.com/w40/cw.png', // Кюрасао
    'WST': 'https://flagcdn.com/w40/ws.png', // Самоа
    
    // Крипта и металлы (иконка монетки/глобуса)
    'BTC': 'https://cdn-icons-png.flaticon.com/512/5968/5968260.png',
    'ETH': 'https://cdn-icons-png.flaticon.com/512/6001/6001368.png',
    'XAU': 'https://cdn-icons-png.flaticon.com/512/261/261374.png', // Золото
    'XAG': 'https://cdn-icons-png.flaticon.com/512/261/261374.png', // Серебро
};

// Заглушка (Глобус), если совсем ничего не нашлось
const GENERIC_FLAG = 'https://cdn-icons-png.flaticon.com/512/921/921490.png';

let state = {
    one: 'USD',
    two: 'EUR',
    rates: {},
    lastUpdated: null
};

let currencyList = [];

const els = {
    amountOne: document.getElementById('amount-one'),
    amountTwo: document.getElementById('amount-two'),
    swapBtn: document.getElementById('swap'),
    convertBtn: document.getElementById('convert-btn'),
    rateDisplay: document.getElementById('rate-display'),
    wrappers: { one: document.getElementById('wrapper-one'), two: document.getElementById('wrapper-two') },
    flags: { one: document.getElementById('flag-one'), two: document.getElementById('flag-two') },
    codes: { one: document.getElementById('code-one'), two: document.getElementById('code-two') }
};

// --- ФУНКЦИИ ---

function getFlagUrl(code) {
    // 1. Сначала проверяем ручной список (для сложных случаев типа XAF, EUR, CNH)
    if (customFlagMap[code]) {
        return customFlagMap[code];
    }
    
    // 2. Если валюта начинается на X (и ее нет в ручном списке), скорее всего это тех. код или металл
    // Возвращаем заглушку сразу, чтобы не плодить битые картинки
    if (code.startsWith('X') && code !== 'XOF' && code !== 'XAF' && code !== 'XCD') {
        return GENERIC_FLAG;
    }

    // 3. Стандартная логика: берем первые 2 буквы как код страны
    const countryCode = code.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/w40/${countryCode}.png`;
}

function getCurrencyName(code) {
    return currencyNames[code] || code; // Если названия нет, просто код
}

// Обработчик ошибки загрузки (последний рубеж)
function handleImageError(img) {
    if (img.src !== GENERIC_FLAG) {
        img.src = GENERIC_FLAG;
        img.style.opacity = '0.5';
    }
}

async function fetchRates(baseCurrency) {
    try {
        els.convertBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Loading...';
        const res = await fetch(`${BASE_URL}${baseCurrency}`);
        const data = await res.json();
        
        if (data.result === "success") {
            state.rates = data.rates;
            
            // Сортировка
            const allCodes = Object.keys(data.rates);
            const popular = allCodes.filter(code => currencyNames[code]); // Те, что знаем
            const others = allCodes.filter(code => !currencyNames[code]); // Неизвестные
            
            currencyList = [...popular, ...others];
            
            if (document.getElementById('list-one').children.length === 0) {
                initSelects();
            }
            
            recalculate('one');
            updateRateDisplay();
        }
    } catch (err) {
        console.error(err);
        els.rateDisplay.innerText = "Error connecting to API";
    } finally {
        els.convertBtn.innerHTML = 'Refresh Rates <i class="fas fa-sync-alt"></i>';
    }
}

function recalculate(source) {
    const rate = state.rates[state.two];
    if (!rate) return;

    if (source === 'one') {
        const val = parseFloat(els.amountOne.value);
        els.amountTwo.value = isNaN(val) ? '' : (val * rate).toFixed(2);
    } else {
        const val = parseFloat(els.amountTwo.value);
        els.amountOne.value = isNaN(val) ? '' : (val / rate).toFixed(2);
    }
}

function updateUI() {
    els.flags.one.src = getFlagUrl(state.one);
    els.flags.one.onerror = function() { handleImageError(this) };
    
    els.flags.two.src = getFlagUrl(state.two);
    els.flags.two.onerror = function() { handleImageError(this) };

    els.codes.one.textContent = state.one;
    els.codes.two.textContent = state.two;
    
    updateRateDisplay();
}

function updateRateDisplay() {
    const rate = state.rates[state.two];
    if (rate) {
        els.rateDisplay.innerText = `1 ${state.one} = ${rate.toFixed(4)} ${state.two}`;
    }
}

function initSelects() {
    setupSelect('one');
    setupSelect('two');
}

function setupSelect(id) {
    const list = document.getElementById(`list-${id}`);
    const search = document.getElementById(`search-${id}`);
    const wrapper = els.wrappers[id];
    const trigger = document.getElementById(`trigger-${id}`);
    const options = document.getElementById(`options-${id}`);

    function renderList(filter = '') {
        list.innerHTML = '';
        const f = filter.toLowerCase();
        
        const filtered = currencyList.filter(code => {
            const name = getCurrencyName(code).toLowerCase();
            return code.toLowerCase().includes(f) || name.includes(f);
        });
        
        if (filtered.length === 0) {
            list.innerHTML = `<li class="option-item" style="color:#888;">No results</li>`;
            return;
        }
        
        // Оптимизация: рендерим только первые 100 элементов, если фильтра нет (чтобы не лагало)
        const itemsToShow = filter ? filtered : filtered.slice(0, 100);
        
        itemsToShow.forEach(code => {
            const li = document.createElement('li');
            li.className = 'option-item';
            
            li.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${getFlagUrl(code)}" 
                         class="flag-img" 
                         style="width:24px; height:16px; object-fit:cover; border-radius:2px;"
                         onerror="this.onerror=null; this.src='${GENERIC_FLAG}'; this.style.opacity='0.5';">
                    <div style="display:flex; flex-direction:column; line-height:1.2;">
                        <span style="font-weight:600;">${code}</span>
                        <small style="font-size:11px; color:#888;">${getCurrencyName(code)}</small>
                    </div>
                </div>
            `;
            
            li.onclick = () => {
                selectCurrency(id, code);
                closeAll();
            };
            list.appendChild(li);
        });
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = options.classList.contains('open');
        closeAll();
        if (!isOpen) {
            options.classList.add('open');
            wrapper.classList.add('active');
            renderList(); 
            search.value = '';
            search.focus();
        }
    });

    search.addEventListener('input', (e) => renderList(e.target.value));
    search.addEventListener('click', (e) => e.stopPropagation());
}

function selectCurrency(id, code) {
    if (state[id] === code) return;
    state[id] = code;
    updateUI();
    if (id === 'one') fetchRates(state.one);
    else recalculate('one');
}

function closeAll() {
    document.querySelectorAll('.custom-options').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('.custom-select-wrapper').forEach(el => el.classList.remove('active'));
}

window.addEventListener('click', closeAll);
els.amountOne.addEventListener('input', () => recalculate('one'));
els.amountTwo.addEventListener('input', () => recalculate('two'));

els.swapBtn.addEventListener('click', () => {
    const tempCode = state.one;
    state.one = state.two;
    state.two = tempCode;
    const tempAmt = els.amountOne.value;
    els.amountOne.value = els.amountTwo.value;
    els.amountTwo.value = tempAmt;
    updateUI();
    fetchRates(state.one);
});

els.convertBtn.addEventListener('click', () => fetchRates(state.one));

updateUI();
fetchRates(state.one);