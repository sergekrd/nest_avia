'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('airlines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      founded: {
        allowNull: true,
        type: Sequelize.STRING
      },
      flights_code: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
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

    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      departureDateTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      flightDurationMinutes: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      departureLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      arrivalLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      totalSeats: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      airlineId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'airlines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticketNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      flightId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'flights',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('flights');
    await queryInterface.dropTable('airlines');
    await queryInterface.dropTable('tickets');
  }
};
