echo "Installing packages"
sudo ./install-packages.sh

echo "Configuring host"
sudo ./overlay-config.sh
sudo ./set-hostname $1
sudo ./disable-root.sh

echo "Installing application"
./install-app.sh
sudo ./supervise.sh

echo "Rebooting"
sudo reboot
