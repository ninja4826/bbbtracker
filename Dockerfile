FROM resin/beaglebone-node:4.3.2-wheezy

RUN apt-get update && apt-get install -yq \
		cowsay && \
		apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN DEBIAN_FRONTEND=noninteractive JOBS=MAX npm install --unsafe-perm --loglevel error

COPY . /usr/src/app

CMD [ "npm", "start", "-s" ]