export const config = {
  development: {
    username: "avnadmin",
    password: process.env.DB_PASSWORD,
    database: "icliniq",
    host: "icliniq-sachingirish101-81fa.j.aivencloud.com",
    port: 25660,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
