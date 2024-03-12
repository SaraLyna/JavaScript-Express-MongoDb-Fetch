const mongoose = require('mongoose');

// Schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    login : {
              type : String,
              required : true,
              unique : true
            },
    password : {
                type : String,
                required : true
               },
    admin : {
              type : Boolean,
              default: false
            },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }]
});

// Schéma pour les spectacles
const showSchema = new mongoose.Schema({
    description: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    // Les réservations pour ce spectacle
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }]
});

// Schéma pour les tickets (réservations)
const ticketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true }
});

const User = mongoose.model('User', userSchema);
const Show = mongoose.model('Show', showSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { User, Show, Ticket };

const dbConnection = require('../controllers/db.controller');
const User1 = dbConnection.model('User',userSchema,'users');

module.exports.model = User;


