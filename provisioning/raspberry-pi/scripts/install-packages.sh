curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
apt-get update
apt-get upgrade -y
apt-get install -y vim supervisor vim xvfb libasound2-dev nodejs
npm install -g electron-prebuilt@0.34.0
