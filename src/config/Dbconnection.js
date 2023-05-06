const cassandra = require('cassandra-driver');
const connectDB= async()=>{

const client = new cassandra.Client({
  contactPoints: ['localhost'], // replace with your Cassandra cluster's contact points
  localDataCenter: 'datacenter1', // replace with your Cassandra cluster's local data center
  keyspace: 'mykeyspace' // replace with your Cassandra keyspace
});

client.connect((err) => {
  if (err) {
    console.log(`Error connecting to Cassandra: ${err}`);
  } else {
    console.log('Connected to Cassandra');
  }
});
}
module.exports=connectDB;
