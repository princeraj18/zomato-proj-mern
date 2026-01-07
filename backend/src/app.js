// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();
const allowedOrigins = [
    'http://localhost:5173',
   
];
app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin like mobile apps or curl
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            return callback(new Error('CORS policy: Origin not allowed'));
        }
    },
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;