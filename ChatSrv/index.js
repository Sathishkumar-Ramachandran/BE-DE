const express = require('express');
const cors = require('cors');
const app = express();

const users = [
  {
    "id": 1,
    "name": "Alice",
    "avatarUrl": "https://i.pravatar.cc/40?img=1",
    "group": "Development",
    "designation": "Software Engineer"
  },
  {
    "id": 2,
    "name": "Bob",
    "designation": "Software Engineer",
    "avatarUrl": "https://i.pravatar.cc/40?img=2",
    "group": "Development"
  },
  {
    "id": 3,
    "name": "Praveen",
    "avatarUrl": "https://i.pravatar.cc/40?img=3",
    "group": "HR",
    "designation": "HR Manager"
  },
  {
    "id": 4,
    "name": "Prakash",
    "avatarUrl": "https://i.pravatar.cc/40?img=4",
    "group": "HR"
  },
  {
    "id": 5,
    "name": "Emma",
    "avatarUrl": "https://i.pravatar.cc/40?img=5",
    "group": "Operations"
  },
  {
    'id': 6,
    "name": 'Sathish',
    'avatarUrl': "https://i.pravatar.cc/40?img=5",
    "group": "Development"
  }
];  

app.use(cors());

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
