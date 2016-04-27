FROM resin/beaglebone-node:4.3.2-wheezy

RUN apt-get update && apt-get install -yq \
		cowsay && \
		apt-get clean && rm -rf /var/lib/apt/lists/*

# Node.js project setup.

WORKDIR /usr/src/app
COPY app/package.json /usr/src/app/package.json
RUN DEBIAN_FRONTEND=noninteractive JOBS=MAX npm install --unsafe-perm --loglevel error

COPY app/. /usr/src/app

# WVDial setup.

ENV INITSYSTEM on
RUN echo "resolvconf resolvconf/linkify-resolvconf boolean false" | debconf-set-selections
RUN apt-get update && apt-get install -y wvdial ifupdown resolvconf
COPY wvdial/init.sh /init.sh
COPY wvdial/wvdial.conf /etc/wvdial.conf
COPY wvdial/wvdial_auto_reconnect.sh /wvdial_auto_reconnect.sh

CMD /init.sh
# CMD [ "npm", "start", "-s" ]