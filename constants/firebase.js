var firebase = require('firebase');

config = {
    apiKey: "AIzaSyDwabSpFEzuR7sK63DxjAu259_mqkJir3w",
    authDomain: "mcoco-7f74c.firebaseapp.com",
    databaseURL: "https://mcoco-7f74c.firebaseio.com"
};

firebase.initializeApp(config);
var db = firebase.database();

module.exports=db