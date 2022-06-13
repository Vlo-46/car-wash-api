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

const listOfSubjects = {
    COUNTERS_AND_FLAGS: 'api.data.counters_and_flags',
    COUNTERS_RESET: 'api.response.counters.reset',
    SERVICE_RESET: 'api.response.service.reset',
    FREE_MODE_ON: 'api.response.freemode.on',
    FREE_MODE_OFF: 'api.response.freemode.off',
    DEVICE_DISABLE: 'api.response.device.disable',
    DEVICE_ENABLE: 'api.response.device.enable',
    SETTINGS_BASIC: 'api.data.settings.basic',
    SETTINGS_BASIC_WRITE: 'api.response.settings.basic.write',
    SETTINGS_EXTENDED: 'api.data.settings.extended',
    SETTINGS_EXTENDED_WRITE: 'api.response.settings.extended.write',
    DATETIME_SET: 'api.response.datetime.set'
}

const listOfCommands = {
    COUNTERS_AND_FLAGS_UPDATE: 'api.command.counters_and_flags.update.',
    COUNTERS_RESET: 'api.command.counters.reset.',
    SERVICE_RESET: 'api.command.service.reset.',
    FREE_MODE_ON: 'api.command.freemode.on.',
    FREE_MODE_OFF: 'api.command.freemode.off.',
    DEVICE_DISABLE: 'api.command.device.disable.',
    DEVICE_ENABLE: 'api.command.device.enable.',
    SETTINGS_BASIC_READ: 'api.command.settings.basic.read.',
    SETTINGS_BASIC_WRITE: 'api.command.settings.basic.write.',
    SETTINGS_EXTENDED_READ: 'api.command.settings.extended.read.',
    SETTINGS_EXTENDED_WRITE: 'api.command.settings.extended.write.',
    DATETIME_SET: 'api.command.datetime.set.'
}

module.exports = {
    userTypes,
    deviceSettings,
    listOfSubjects,
    listOfCommands
}