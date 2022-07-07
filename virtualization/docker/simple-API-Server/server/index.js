const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use((req, res) => {
    res.send('Hello, Docker')
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port') + " ready...")
});