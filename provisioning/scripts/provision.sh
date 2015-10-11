echo "Running raspi-config"
sudo raspi-config

echo "Please change the pi account password"
./change-password.sh

echo "Configuring host"
sudo ./set-hostname.sh $1
sudo ./overlay-config.sh
sudo ./disable-root.sh

echo "Installing packages"
sudo ./install-packages.sh

echo "Installing application"
./install-app.sh
sudo ./supervise.sh

echo "Rebooting"
sudo reboot
