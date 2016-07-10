'use strict';

var mongoose = require("mongoose");
if(mongoose.connection.readyState!==1) {
    mongoose.connect("mongodb://feedback_db_1:27017/test");
}

mongoose.connection.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once("open", function() {
    console.log("Connection succeeded.");
});

module.exports = mongoose.connection;