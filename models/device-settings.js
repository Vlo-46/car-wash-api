'use strict';
const {Model} = require('sequelize');
const constants = require('../utils/constants')

module.exports = (sequelize, DataTypes) => {
    class DeviceSettings extends Model {
        static associate(models) {
        }
    }

    DeviceSettings.init({
        device_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        coinNominal: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 10000,
            }
        },
        billNominal: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 10000,
            }
        },
        mode: {
            // type: DataTypes.ENUM,
            // values: [constants.deviceSettings.mode.Cash, constants.deviceSettings.mode.Time],
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
            validate: {
                min: 0,
                max: 1,
            }
        },
        bypass: {
            // type: DataTypes.ENUM,
            // values: [constants.deviceSettings.bypass.Disabled, constants.deviceSettings.bypass.Enabled],
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
            validate: {
                min: 0,
                max: 1,
            }
        },
        bypassChann: {
            // type: DataTypes.ENUM,
            // values: [constants.deviceSettings.bypassChann.Disabled, constants.deviceSettings.bypassChann.Enabled],
            type: DataTypes.STRING,
            defaultValue: 0,
            allowNull: true,
            // validate: {
            //     min: 0,
            //     max: 1,
            // }
        },
        bpTime: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 200,
            }
        },
        bonusPct: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 100,
            }
        },
        bonusVal: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 9999,
            }
        },
        tBonusPct: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 100,
            }
        },
        tBonusVal: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 9999,
            }
        },
        bonusSchStart: {
            type: DataTypes.STRING, // 00:00 - 23:59
            defaultValue: "00:00 - 23:59",
            allowNull: true,
        },
        bonusSchEnd: {
            type: DataTypes.STRING, // 00:00 - 23:59
            defaultValue: "00:00 - 23:59",
            allowNull: true,
        },
        tariffPct: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 100,
            }
        },
        tariffSchStart: {
            type: DataTypes.STRING, // 00:00 - 23:59
            defaultValue: "00:00 - 23:59",
            allowNull: true,
        },
        tariffSchEnd: {
            type: DataTypes.STRING, // 00:00 - 23:59
            defaultValue: "00:00 - 23:59",
            allowNull: true,
        },
        flowPulse1: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 65535,
            }
        },
        flowTimeout1: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 65535,
            }
        },
        flowPulse2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 65535,
            }
        },
        flowTimeout2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 65535,
            }
        },
        hpt: {
            // type: DataTypes.ENUM,
            // values: [constants.deviceSettings.hpt.Disabled, constants.deviceSettings.hpt.Enabled],
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
            validate: {
                min: 0,
                max: 1,
            }
        },
        service: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 9999,
            }
        },
        component: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        relayOutput: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bingoThr: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 65535,
            }
        },
        bingoVal: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 65535,
            }
        },
        hopper: {
            // type: DataTypes.ENUM,
            // values: [constants.deviceSettings.hopper.Disabled, constants.deviceSettings.hopper.Enabled],
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
            validate: {
                min: 0,
                max: 1,
            }
        },
        hopperNominal: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 10000,
            }
        },
        hopperThreshold: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 10000,
            }
        },
        language: {
            // type: DataTypes.ENUM,
            // values: [constants.deviceSettings.language.English, constants.deviceSettings.language.Russian, constants.deviceSettings.language.Armenian, constants.deviceSettings.language.Georgian],
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
            validate: {
                min: 0,
                max: 3,
            }
        },
        currency: {
            // type: DataTypes.ENUM,
            // values: [
            //     constants.deviceSettings.currency.USD, constants.deviceSettings.currency.RUR,
            //     constants.deviceSettings.currency.AMD, constants.deviceSettings.currency.LARI,
            //     constants.deviceSettings.currency.TETRI, constants.deviceSettings.currency.TENGE,
            //     constants.deviceSettings.currency.LEY
            // ],
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
            validate: {
                min: 0,
                max: 6,
            }
        },
        digColor: {
            // type: DataTypes.ENUM,
            // values: [
            //     constants.deviceSettings.digColor.RED,
            //     constants.deviceSettings.digColor.GREEN,
            //     constants.deviceSettings.digColor.YELLOW,
            //     constants.deviceSettings.digColor.BLUE,
            //     constants.deviceSettings.digColor.MAGENTA,
            //     constants.deviceSettings.digColor.CYAN,
            //     constants.deviceSettings.digColor.WHITE,
            // ],
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 7,
            }
        },
        channels: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 1000,
            }
        },
        colors: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 1,
            // validate: {
            //     min: 1,
            //     max: 7,
            // }
        },
        screen: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0,
            // validate: {
            //     min: 0,
            //     max: 1000,
            // }
        },
        devID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
                max: 255,
            }
        },
        valveP: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 1000,
            }
        },
        ValveD: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 1000,
            }
        },
        ValveC: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 1000,
            }
        },
        bonusMode: {
            // type: DataTypes.ENUM,
            // values: [constants.deviceSettings.bonusMode.CardOnly, constants.deviceSettings.bonusMode.Always],
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
            validate: {
                min: 0,
                max: 1,
            }
        },
        pauseMode: {
            // type: DataTypes.ENUM,
            // values: [constants.deviceSettings.pauseMode.Limited, constants.deviceSettings.pauseMode.Unlimited],
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
            validate: {
                min: 0,
                max: 1,
            }
        },
        dateTime: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'DeviceSettings',
    });

    const CarWashDevices = sequelize.define('CarWashDevices')
    DeviceSettings.belongsTo(CarWashDevices, {
        foreignKey: 'id',
        onDelete: 'cascade',
        hooks: true,
    })

    const Counter = sequelize.define('Counter')
    DeviceSettings.hasOne(Counter, {
        foreignKey: 'device_id',
    })

    return DeviceSettings;
};