const config = require('./config')
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USERNAME,
    config.DB_PASSWORD,
    {
        host: config.DB_HOST,
        port: config.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
)

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected to the database')
    } catch (error) {
        console.log('Failed to connect to the database')
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDatabase, sequelize }