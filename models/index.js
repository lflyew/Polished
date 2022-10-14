const User = require('./User'); 
const Service = require('./Service'); 
const Appointment = require('./Appointment'); 
const Booking = require('./Booking'); 

//One appointment belongsTo One customer 
Appointment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
// Customer hasMany (book) many appointments
User.hasMany(Appointment, {
    foreignKey: 'user_id',
});

// Many-to-many relationship between Appointment and Service
Appointment.belongsToMany(Service, { through: Booking, foreignKey: 'appointment_id', onDelete: 'SET NULL'});
Service.belongsToMany(Appointment, { through: Booking, foreignKey: 'service_id', onDelete: 'SET NULL'});

// Technician hasMany bookings
User.hasMany(Booking, {
    foreignKey: "user_id",
    onDelete: "SET NULL",
});

module.exports = { 
    User, 
    Service, 
    Appointment, 
    Booking
}; 

