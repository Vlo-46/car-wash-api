const constants = require('../utils/constants')
const uuid = require("uuid");

const users = [
    {
        username: 'admin',
        password: '$2a$10$wNwggIDxVkR8ty4OnWO01ukJqfdzqTSdaOCIye8pGGXJGStyXeIqm',
        email: "vlo.galstyan.2013@mail.ru",
        role: constants.userTypes.ADMIN,
        token: null,
        active: true,
        firstLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        username: 'user',
        password: '$2a$10$wNwggIDxVkR8ty4OnWO01ukJqfdzqTSdaOCIye8pGGXJGStyXeIqm',
        email: null,
        role: constants.userTypes.USER,
        token: null,
        active: true,
        firstLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        username: 'technician',
        password: '$2a$10$wNwggIDxVkR8ty4OnWO01ukJqfdzqTSdaOCIye8pGGXJGStyXeIqm',
        role: constants.userTypes.TECHNICIAN,
        email: null,
        token: null,
        active: true,
        firstLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        username: 'user_2',
        password: '$2a$10$wNwggIDxVkR8ty4OnWO01ukJqfdzqTSdaOCIye8pGGXJGStyXeIqm',
        role: constants.userTypes.USER,
        email: null,
        token: null,
        active: true,
        firstLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

const carWashPoints = [
    {
        user_id: 2,
        technician_id: 3,
        car_wash_point_name: null,
        token: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        user_id: 2,
        technician_id: 3,
        car_wash_point_name: 'car wash 2',
        token: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        user_id: 4,
        technician_id: 3,
        car_wash_point_name: null,
        token: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

const carWashDevices = [
    {
        technician_id: 3,
        car_wash_point_id: 1,
        name: 'device_1',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        technician_id: 3,
        car_wash_point_id: 1,
        name: 'device_2',
        disabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        technician_id: 3,
        car_wash_point_id: 2,
        name: 'device_3',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

const deviceSettings = [
    {
        device_id: 1,
        coinNominal: 100,
        billNominal: 100,
        mode: constants.deviceSettings.mode.Cash,
        bypass: constants.deviceSettings.bypass.Disabled,
        bypassChann: JSON.stringify([1]),
        bpTime: 100,
        bonusPct: 50,
        bonusVal: 1000,
        tBonusPct: 50,
        tBonusVal: 1000,
        bonusSchStart: "00:00 - 10:00",
        bonusSchEnd: "10:00 - 20:00",
        tariffPct: "[1,2,3,4]",
        tariffSchStart: "00:00 - 10:00",
        tariffSchEnd: "10:00 - 20:00",
        flowPulse1: 4000,
        flowTimeout1: 5000,
        flowPulse2: 4000,
        flowTimeout2: 5000,
        hpt: constants.deviceSettings.hpt.Enabled,
        service: 2000,
        component: JSON.stringify([1, 2, 3]),
        relayOutput: JSON.stringify([[1, 2], [3, 4]]),
        bingoThr: 10000,
        bingoVal: 20000,
        hopper: constants.deviceSettings.hopper.Enabled,
        hopperNominal: 2500,
        hopperThreshold: 3000,
        language: constants.deviceSettings.language.Armenian,
        currency: constants.deviceSettings.currency.AMD,
        digColor: constants.deviceSettings.digColor.YELLOW,
        channels: 100,
        colors: JSON.stringify([1, 2, 3]),
        screen: JSON.stringify([100, 200]),
        devID: 1,
        valveP: 100,
        ValveD: 200,
        ValveC: 300,
        bonusMode: constants.deviceSettings.bonusMode.Always,
        pauseMode: constants.deviceSettings.pauseMode.Unlimited,
        dateTime: "20220429T10:33:23.073Z",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        device_id: 2,
        coinNominal: 100,
        billNominal: 100,
        mode: constants.deviceSettings.mode.Cash,
        bypass: constants.deviceSettings.bypass.Disabled,
        bypassChann: JSON.stringify([0]),
        bpTime: 100,
        bonusPct: 50,
        bonusVal: 1000,
        tBonusPct: 50,
        tBonusVal: 1000,
        bonusSchStart: "00:00 - 10:00",
        bonusSchEnd: "10:00 - 20:00",
        tariffPct: "[1,2,3,4]",
        tariffSchStart: "00:00 - 10:00",
        tariffSchEnd: "10:00 - 20:00",
        flowPulse1: 4000,
        flowTimeout1: 5000,
        flowPulse2: 4000,
        flowTimeout2: 5000,
        hpt: constants.deviceSettings.hpt.Enabled,
        service: 2000,
        component: JSON.stringify([2, 3, 4]),
        relayOutput: JSON.stringify([[1, 2], [3, 4]]),
        bingoThr: 10000,
        bingoVal: 20000,
        hopper: constants.deviceSettings.hopper.Enabled,
        hopperNominal: 2500,
        hopperThreshold: 3000,
        language: constants.deviceSettings.language.Armenian,
        currency: constants.deviceSettings.currency.AMD,
        digColor: constants.deviceSettings.digColor.YELLOW,
        channels: 100,
        colors: JSON.stringify([1, 2]),
        screen: JSON.stringify([150, 250]),
        devID: 1,
        valveP: 100,
        ValveD: 200,
        ValveC: 300,
        bonusMode: constants.deviceSettings.bonusMode.Always,
        pauseMode: constants.deviceSettings.pauseMode.Unlimited,
        dateTime: "20220429T10:33:23.073Z",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        device_id: 3,
        coinNominal: 100,
        billNominal: 100,
        mode: constants.deviceSettings.mode.Cash,
        bypass: constants.deviceSettings.bypass.Disabled,
        bypassChann: JSON.stringify([1]),
        bpTime: 100,
        bonusPct: 50,
        bonusVal: 1000,
        tBonusPct: 50,
        tBonusVal: 1000,
        bonusSchStart: "00:00 - 10:00",
        bonusSchEnd: "10:00 - 20:00",
        tariffPct: "[1,2,3,4]",
        tariffSchStart: "00:00 - 10:00",
        tariffSchEnd: "10:00 - 20:00",
        flowPulse1: 4000,
        flowTimeout1: 5000,
        flowPulse2: 4000,
        flowTimeout2: 5000,
        hpt: constants.deviceSettings.hpt.Enabled,
        service: 2000,
        component: JSON.stringify([5, 6, 7]),
        relayOutput: JSON.stringify([[1, 2], [3, 4]]),
        bingoThr: 10000,
        bingoVal: 20000,
        hopper: constants.deviceSettings.hopper.Enabled,
        hopperNominal: 2500,
        hopperThreshold: 3000,
        language: constants.deviceSettings.language.Armenian,
        currency: constants.deviceSettings.currency.AMD,
        digColor: constants.deviceSettings.digColor.YELLOW,
        channels: 100,
        colors: JSON.stringify([1, 3]),
        screen: JSON.stringify([100, 200]),
        devID: 1,
        valveP: 100,
        ValveD: 200,
        ValveC: 300,
        bonusMode: constants.deviceSettings.bonusMode.Always,
        pauseMode: constants.deviceSettings.pauseMode.Unlimited,
        dateTime: "20220429T10:33:23.073Z",
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

const counters = [
    {
        device_id: 1,
        coinT: 0,
        coinD: 0,
        billT: 0,
        billD: 0,
        cashlessT: 0,
        cashlessD: 0,
        bonusT: 0,
        bonusD: 0,
        serviceT: 0,
        serviceD: 0,
        chSpent: "{t: 0, d: 0}",
        chTimePaidMode: "{t: 0, d: 0}",
        chTimeFreeMode: "{t: 0, d: 0}",
        powerOnTime: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        device_id: 2,
        coinT: 0,
        coinD: 0,
        billT: 0,
        billD: 0,
        cashlessT: 0,
        cashlessD: 0,
        bonusT: 0,
        bonusD: 0,
        serviceT: 0,
        serviceD: 0,
        chSpent: "{t: 0, d: 0}",
        chTimePaidMode: "{t: 0, d: 0}",
        chTimeFreeMode: "{t: 0, d: 0}",
        powerOnTime: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        device_id: 3,
        coinT: 0,
        coinD: 0,
        billT: 0,
        billD: 0,
        cashlessT: 0,
        cashlessD: 0,
        bonusT: 0,
        bonusD: 0,
        serviceT: 0,
        serviceD: 0,
        chSpent: "{t: 0, d: 0}",
        chTimePaidMode: "{t: 0, d: 0}",
        chTimeFreeMode: "{t: 0, d: 0}",
        powerOnTime: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

const technic_users = [
    {
        technician_id: 3,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        technician_id: 3,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

const components = [
    {
        device_id: 1,
        name_am: 'Ջուր',
        name_ru: 'Вода',
        name_en: 'Water',
        value: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        device_id: 1,
        name_am: 'Փրփուր',
        name_ru: 'Мыло',
        name_en: 'Foam',
        value: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        device_id: 2,
        name_am: 'Ջուր',
        name_ru: 'Вода',
        name_en: 'Water',
        value: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        device_id: 2,
        name_am: 'Փրփուր',
        name_ru: 'Мыло',
        name_en: 'Foam',
        value: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        device_id: 3,
        name_am: 'Ջուր',
        name_ru: 'Вода',
        name_en: 'Water',
        value: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

const totalComponents = [
    {
        name_am: "Դադար",
        name_ru: 'Пауза',
        name_en: 'Pause',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Ջուր',
        name_ru: 'Вода',
        name_en: 'Water',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Փրփուր',
        name_ru: 'Пена',
        name_en: 'Foam',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Մոմ',
        name_ru: 'Воск',
        name_en: 'Wax',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Փոշեկուլ',
        name_ru: 'Пылесос',
        name_en: 'Vacuum cleaner',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Տաք ջուր',
        name_ru: 'Горячая вода',
        name_en: 'Hot water',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Գոլ ջուր',
        name_ru: 'Теплая вода',
        name_en: 'Warm water',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Ջուր առանց ճնշման',
        name_ru: 'Вода без давления',
        name_en: 'Water without pressure',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Թորած ջուր',
        name_ru: 'Дистиллированная вода',
        name_en: 'Distilled water',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Թալինի ջուր',
        name_ru: 'Вода талина',
        name_en: 'Talin water',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Ճնշված փրփուր',
        name_ru: 'Пена под давлением',
        name_en: 'Pressurized foam',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Տուրբո փրփուր',
        name_ru: 'Турбо пена',
        name_en: 'Turbo foam',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Օդ',
        name_ru: 'Воздух',
        name_en: 'Air',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Օսմոզ',
        name_ru: 'Осмос',
        name_en: 'Osmosis',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Անվադողերի փայլ',
        name_ru: 'Блеск шин',
        name_en: 'Tire Shine',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Անվադողերի ինֆլյացիա',
        name_ru: 'Подкачка шин',
        name_en: 'Tire inflation',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Շարժիչի հեղուկ',
        name_ru: 'Жидкость двигателя',
        name_en: 'Engine fluid',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Խոզանակ',
        name_ru: 'Щетка',
        name_en: 'Brush',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Ողողում',
        name_ru: 'Ополаскивание',
        name_en: 'Rinsing',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Սրահի խնամք',
        name_ru: 'Уход салона',
        name_en: 'Salon Care',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Ապակու հեղուկ',
        name_ru: 'Жидкость стекол',
        name_en: 'Glass liquid',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Լուսավորություն',
        name_ru: 'Освещение',
        name_en: 'Lighting',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Հոպպեր',
        name_ru: 'Хоппер',
        name_en: 'Hopper',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Փական',
        name_ru: 'Клапан',
        name_en: 'Valve',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Ապակու խնամք',
        name_ru: 'Уход стекол',
        name_en: 'Glass care',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Օմիվայկա',
        name_ru: 'Омывайка',
        name_en: 'Omyvayka',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Տուրբո չորացում',
        name_ru: 'Турбо сушка',
        name_en: 'Turbo drying',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Օզոն',
        name_ru: 'Озон',
        name_en: 'Ozone',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Կոժի քիմիա',
        name_ru: 'Химия кожа',
        name_en: 'Chemistry skin',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Քիմիայի կտոր',
        name_ru: 'Химия ткань',
        name_en: 'Chemistry fabric',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Steam plus փոշեկուլ',
        name_ru: 'Пар плюс пылесос',
        name_en: 'Steam plus vacuum cleaner',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Անտիմոշկա',
        name_ru: 'Антимошка',
        name_en: 'Antimoshka',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Ումկա',
        name_ru: 'Умка',
        name_en: 'Umka',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Ակտիվ SPA',
        name_ru: 'Актив SPA',
        name_en: 'Active SPA',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Շամպուն',
        name_ru: 'Шампунь',
        name_en: 'Shampoo',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Չոր մաքրում',
        name_ru: 'Химчистка',
        name_en: 'Dry cleaning',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'փչում',
        name_ru: 'Обдув',
        name_en: 'blowing',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Անվադողերի սևացում',
        name_ru: 'Чернение шин',
        name_en: 'Tire blackening',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Փոլիշ',
        name_ru: 'Полироль',
        name_en: 'polish',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Տորնադո',
        name_ru: 'Торнадо',
        name_en: 'Tornado',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name_am: 'Ջուր ձեռքերի համար',
        name_ru: 'Вода для рук',
        name_en: 'Water for hands',
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

module.exports = {
    users,
    carWashPoints,
    carWashDevices,
    deviceSettings,
    counters,
    technic_users,
    components,
    totalComponents
}


let natsResponseData = {
    "token": "Very-Very-Long-Token",
    "counters": [
        {
            "id": 1,
            "coin": {
                "t": 155000,
                "d": 2100
            },
            "bill": {
                "t": 501000,
                "d": 15000
            },
            "cashless": {
                "t": 0,
                "d": 0
            },
            "bonus": {
                "t": 0,
                "d": 0
            },
            "service": {
                "t": 0,
                "d": 0
            },
            "chSpent": [
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                }
            ],
            "chTimePaidMode": [
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                }
            ],
            "chTimeFreeMode": [
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                }
            ],
            "powerOnTime": 0
        },
        {
            "id": 2,
            "coin": {
                "t": 5000,
                "d": 100
            },
            "bill": {
                "t": 845000,
                "d": 3000
            },
            "cashless": {
                "t": 0,
                "d": 0
            },
            "bonus": {
                "t": 0,
                "d": 0
            },
            "service": {
                "t": 0,
                "d": 0
            },
            "chSpent": [
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                }
            ],
            "chTimePaidMode": [
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                }
            ],
            "chTimeFreeMode": [
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                }
            ],
            "powerOnTime": 0
        },
        {
            "id": 3,
            "coin": {
                "t": 0,
                "d": 0
            },
            "bill": {
                "t": 0,
                "d": 0
            },
            "cashless": {
                "t": 0,
                "d": 0
            },
            "bonus": {
                "t": 0,
                "d": 0
            },
            "service": {
                "t": 0,
                "d": 0
            },
            "chSpent": [
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                }
            ],
            "chTimePaidMode": [
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                }
            ],
            "chTimeFreeMode": [
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                },
                {
                    "t": 0,
                    "d": 0
                }
            ],
            "powerOnTime": 0
        }
    ]
}