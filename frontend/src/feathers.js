//import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import axios from 'axios'

const rest = feathers.rest;
const host = "http://45.63.123.96:3030"

const client = feathers();

// client.configure(feathers.socketio(socket));
client.configure(rest(host).axios(axios))

client.configure(feathers.authentication({
  storage: window.localStorage
}));

export default client;