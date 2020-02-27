//import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import axios from 'axios'

const rest = feathers.rest;
const host = "http://18.144.126.232:3031"

const client = feathers();

// client.configure(feathers.socketio(socket));
client.configure(rest(host).axios(axios))

client.configure(feathers.authentication({
  storage: window.localStorage
}));

export default client;