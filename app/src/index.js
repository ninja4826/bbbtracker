// import b from 'octalbonescript';
// import http from 'http';
// import fs from 'fs';
// import { GPRS } from './gprs';
// import { GPS } from './gps';

// // let gprs = new GPRS({
// // 	apn: "vzwinternet",
// // 	username: "",
// // 	password: ""
// // });

// let gps = new GPS();
import { execSync } from 'child_process';
console.log('Getting UName -r');
console.log(execSync('uname -r', { encoding: 'utf8' }));