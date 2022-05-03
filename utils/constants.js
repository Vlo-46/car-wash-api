const userTypes = {
    ADMIN: 'admin',
    TECHNICIAN: 'technician',
    USER: 'user'
}

const deviceSettings = {
    mode: {
        Cash: 0,
        Time: 1
    },
    bypass: {
        Disabled: 0,
        Enabled: 1
    },
    bypassChann: {
        Disabled: 0,
        Enabled: 1
    },
    hpt: {
        Disabled: 0,
        Enabled: 1
    },
    hopper: {
        Disabled: 0,
        Enabled: 1
    },
    language: {
        English: 0,
        Russian: 1,
        Armenian: 2,
        Georgian: 3
    },
    currency: {
        USD: 0,
        RUR: 1,
        AMD: 2,
        LARI: 3,
        TETRI: 4,
        TENGE: 5,
        LEY: 6
    },
    digColor: {
        RED: 1,
        GREEN: 2,
        YELLOW: 3,
        BLUE: 4,
        MAGENTA: 5,
        CYAN: 6,
        WHITE: 7
    },
    bonusMode: {
        CardOnly: 0,
        Always: 1,
    },
    pauseMode: {
        Limited: 0,
        Unlimited: 1
    },
}

module.exports = {
    userTypes,
    deviceSettings
}