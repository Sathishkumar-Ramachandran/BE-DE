const cassandra = require("cassandra-driver");

const client = new cassandra.Client({
  contactPoints: ["localhost"], // replace with your Cassandra cluster's contact points
  localDataCenter: "datacenter1", // replace with your Cassandra cluster's local data center
  keyspace: "mykeyspace", // replace with your Cassandra keyspace
});

const UserSchemaCrud = {
  checkIsUserSchemaDefiend: async (companyId) => {
    try {
      client.connect((err) => {
        if (err) {
          console.log(`Error connecting to Cassandra: ${err}`);
          return 0;
        } else {
          const query = "SELECT * FROM userSchema WHERE company_id = ?";
          const params = [companyId];

          client
            .execute(query, params, { prepare: true })
            .then((result) => {
              return 1;
            })
            .catch(() => {
              return 0;
            });
          console.log("Connected to Cassandra");
        }
      });
    } catch (e) {
      return 0;
    }
  },

  InsertSchema: async (obj) => {
    try {
      client.connect((err) => {
        if (err) {
          console.log(`Error connecting to Cassandra: ${err}`);
          return 0;
        } else {
          const query =
            "INSERT INTO userSchema (company_id, schemajson) VALUES (?, ?)";
          const params = [obj.companyId, obj.schema];

          client
            .execute(query, params, { prepare: true })
            .then((result) => {
              return 1;
            })
            .catch((error) => {
              return 0;
            });
          console.log("Connected to Cassandra");
        }
      });
    } catch (e) {
      return 0;
    }
  },
  UpdateSchema: async (companyId, obj) => {
    try {
      client.connect((err) => {
        if (err) {
          console.log(`Error connecting to Cassandra: ${err}`);
          return 0;
        } else {
          console.log("Connected to Cassandra");
          const query =
            "UPDATE userSchema SET schemajson = ? WHERE company_id = ?";
          const params = [obj, companyId];

          client
            .execute(query, params, { prepare: true })
            .then((result) => {
              return 1;
            })
            .catch((error) => {
              return 0;
            });
        }
      });
    } catch (e) {
      return 0;
    }
  },
  DeleteSchema: async (companyId) => {
  try{

  
    client.connect((err) => {
      if (err) {
        console.log(`Error connecting to Cassandra: ${err}`);
        return 0
      } else {
        const query = "DELETE FROM userSchema WHERE company_id = ?";
        const params = [companyId];

        client
          .execute(query, params, { prepare: true })
          .then((result) => {return 1})
          .catch((error) => {return 0});
        console.log("Connected to Cassandra");
      }
    });
  }
  catch(e){
    return 0
  }
  },
};

module.exports = UserSchemaCrud;
