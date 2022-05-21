'use strict';

const constants = require('../utils/constants')
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('DeviceSettings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            device_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            coinNominal: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 1,
                validate: {
                    min: 1,
                    max: 10000,
                }
            },
            billNominal: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 1,
                validate: {
                    min: 1,
                    max: 10000,
                }
            },
            mode: {
                // type: Sequelize.ENUM,
                // values: [constants.deviceSettings.mode.Cash, constants.deviceSettings.mode.Time],
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 1,
                }
            },
            bypass: {
                // type: Sequelize.ENUM,
                // values: [constants.deviceSettings.bypass.Disabled, constants.deviceSettings.bypass.Enabled],
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 1,
                }
            },
            bypassChann: {
                // type: Sequelize.ENUM,
                // values: [constants.deviceSettings.bypassChann.Disabled, constants.deviceSettings.bypassChann.Enabled],
                type: Sequelize.STRING,
                defaultValue: 0,
                allowNull: true,
                // validate: {
                //     min: 0,
                //     max: 1,
                // }
            },
            bpTime: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 200,
                }
            },
            bonusPct: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 100,
                }
            },
            bonusVal: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 9999,
                }
            },
            tBonusPct: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 100,
                }
            },
            tBonusVal: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 9999,
                }
            },
            bonusSchStart: {
                type: Sequelize.STRING, // 00:00 - 23:59
                defaultValue: "00:00 - 23:59",
                allowNull: true,
            },
            bonusSchEnd: {
                type: Sequelize.STRING, // 00:00 - 23:59
                defaultValue: "00:00 - 23:59",
                allowNull: true,
            },
            tariffPct: {
                type: Sequelize.STRING,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 100,
                }
            },
            tariffSchStart: {
                type: Sequelize.STRING, // 00:00 - 23:59
                allowNull: true,
                defaultValue: "00:00 - 23:59",
            },
            tariffSchEnd: {
                type: Sequelize.STRING, // 00:00 - 23:59
                defaultValue: "00:00 - 23:59",
                allowNull: true,
            },
            flowPulse1: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 65535,
                }
            },
            flowTimeout1: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 1,
                validate: {
                    min: 1,
                    max: 65535,
                }
            },
            flowPulse2: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 65535,
                }
            },
            flowTimeout2: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 1,
                validate: {
                    min: 1,
                    max: 65535,
                }
            },
            hpt: {
                // type: Sequelize.ENUM,
                // values: [constants.deviceSettings.hpt.Disabled, constants.deviceSettings.hpt.Enabled],
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1,
                }
            },
            service: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 1,
                validate: {
                    min: 1,
                    max: 9999,
                }
            },
            component: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            relayOutput: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            bingoThr: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 65535,
                }
            },
            bingoVal: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 65535,
                }
            },
            hopper: {
                // type: Sequelize.ENUM,
                // values: [constants.deviceSettings.hopper.Disabled, constants.deviceSettings.hopper.Enabled],
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 1,
                }
            },
            hopperNominal: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: true,
                validate: {
                    min: 1,
                    max: 10000,
                }
            },
            hopperThreshold: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 10000,
                }
            },
            language: {
                // type: Sequelize.ENUM,
                // values: [constants.deviceSettings.language.English, constants.deviceSettings.language.Russian, constants.deviceSettings.language.Armenian, constants.deviceSettings.language.Georgian],
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 3,
                }
            },
            currency: {
                // type: Sequelize.ENUM,
                // values: [
                //     constants.deviceSettings.currency.USD, constants.deviceSettings.currency.RUR,
                //     constants.deviceSettings.currency.AMD, constants.deviceSettings.currency.LARI,
                //     constants.deviceSettings.currency.TETRI, constants.deviceSettings.currency.TENGE,
                //     constants.deviceSettings.currency.LEY
                // ],
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 6,
                }
            },
            digColor: {
                // type: Sequelize.ENUM,
                // values: [
                //     constants.deviceSettings.digColor.RED,
                //     constants.deviceSettings.digColor.GREEN,
                //     constants.deviceSettings.digColor.YELLOW,
                //     constants.deviceSettings.digColor.BLUE,
                //     constants.deviceSettings.digColor.MAGENTA,
                //     constants.deviceSettings.digColor.CYAN,
                //     constants.deviceSettings.digColor.WHITE,
                // ],
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 7,
                }
            },
            channels: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1000,
                }
            },
            colors: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 1,
                // validate: {
                //     min: 1,
                //     max: 7,
                // }
            },
            screen: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 0,
                // validate: {
                //     min: 0,
                //     max: 1000,
                // }
            },
            devID: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 255,
                }
            },
            valveP: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1000,
                }
            },
            ValveD: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1000,
                }
            },
            ValveC: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1000,
                }
            },
            bonusMode: {
                // type: Sequelize.ENUM,
                // values: [constants.deviceSettings.bonusMode.CardOnly, constants.deviceSettings.bonusMode.Always],
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 1,
                }
            },
            pauseMode: {
                // type: Sequelize.ENUM,
                // values: [constants.deviceSettings.pauseMode.Limited, constants.deviceSettings.pauseMode.Unlimited],
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 1,
                }
            },
            dateTime: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('DeviceSettings');
    }
};