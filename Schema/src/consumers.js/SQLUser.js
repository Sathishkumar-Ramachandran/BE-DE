const kafka = require('./kafkaConfig');
const { Client } = require('pg');

const client = new Client({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

client.connect();

const consumer = kafka.consumer({ groupId: 'sql-consumer-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-created-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const user = JSON.parse(message.value.toString());
      // Insert the user data into the SQL table
      const query = {
        text: 'INSERT INTO users (first_name, last_name, email, phone_number, companies, role, license, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [user.firstName, user.lastName, user.email, user.phoneNumber, user.companies, user.role, user.license, user.status],
      };

      try {
        await client.query(query);
        console.log(`User data inserted into SQL table: ${user.email}`);
      } catch (error) {
        console.error(`Error inserting user data into SQL table: ${error}`);
      }
    },
  });
};

run().catch(console.error);
