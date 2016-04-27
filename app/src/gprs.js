import b from 'octalbonescript';

export class GPRS {
	constructor(apnConfig) {
		this.apnConfig = apnConfig;
		this.port = null;
		this.canTransmit = false;
		b.serial.open("/dev/tty02", { baudRate: 9600 }, this.handler, (err, port) => {
			if (err) {
				console.error(err);
				throw err;
			} else {
				this.port = port;
				this.portOpened();
			}
		});
		this.cmdQueue = [];
		this.cmdInterval = setInterval(() => {
			if (!this.port) return;
			let cmd = this.cmdQueue.shift();
			if (cmd) {
				this.port.write(new Buffer(cmd), (err, bWritten) => {
					if (err) {
						console.error(err);
						throw err;
					}
				});
			}
		}, 1000);
	}

	handler(data) {
		// TODO: Handle data.
	}

	portOpened() {
		var tcpipTask = `AT+QIREGAPP="${this.apnConfig.apn}","${this.apnConfig.username}","${this.apnConfig.password}"`;
		if ('rate' in this.apnConfig) {
			tcpipTask += `,"${this.apnConfig.rate}"`;
		}
		tcpipTask += "\n";
		var dataArr = [
			tcpipTask,
			"AT+QIACT\n"
		];
		this.cmdQueue.push(...dataArr);
	}

	sendData(data, host, port) {
		this.cmdQueue.push(...[
			`AT+QIOPEN="TCP","${host}","${port}"\n`,
			`AT+QISEND=${(new Buffer(data)).length}\n`,
			data,
			"AT+QICLOSE\n"
		]);
	}
}