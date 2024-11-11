const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use('/Styles', express.static(path.join(__dirname, 'public', 'Styles')));
app.use('/Scripts', express.static(path.join(__dirname, 'public', 'Scripts')));
app.use('/Views', express.static(path.join(__dirname, 'public', 'Views')));
app.use('/Images', express.static(path.join(__dirname, 'public', 'Images')));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/public/Views/login.html');
}); 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
