"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // return queryInterface.bulkInsert("Users", [
    //   {
    //     fullName: "Ezekiel Ekunola",
    //     email: "ekunolaeasybuoy@gmail.com",
    //     phone: "2348039751569",
    //     phoneVerificationCode: 12334,
    //     password: "1sdaas",
    //     isActive: true,
    //     userType: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
