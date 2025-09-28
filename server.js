require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT;
// Start server


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see available endpoints`);
});

