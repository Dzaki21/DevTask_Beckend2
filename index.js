const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Server Berhasil dijalankan');
});

app.listen(PORT, () =>{
    console.log(`Server siap! buka di hhtp://localhost:${PORT}`);
});
