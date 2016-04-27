import b from 'octalbonescript';
import nmea from 'node-nmea';

export class GPS {
	constructor() {
		this.port = null;
		b.serial.open("/dev/tty05", { baudRate: 4800 }, this.handler, (err, port) => {
			if (err) {
				console.error(err);
				throw err;
			} else {
				this.port = port;
			}
		});
	}

	handler(data) {
		let data = nmea.parse(data);
		// let regex = /\$GPGGA,([0-2][0-9][0-6][0-9][0-6][0-9]\.?\d{0,}),(\d{1,}\.?\d{0,}),([NS]),(\d{1,}\.?\d{0,}),([EW]),([0-2]),([0-9]{2}),([0-9]{0,}\.?[0-9]{0,}),(\d{1,}\.?\d{0,}),(\w),(\-?\d{1,}\.?\d{0,}),(\w),(\d{1,}\.?\d{0,}),(\d{4})/g;
		// TODO: Handle data.
	}
}