#!/bin/bash
#Assign existing hostname to $hostn
OLD_HOSTNAME=$(cat /etc/hostname)
NEW_HOSTNAME="$1"

if [ -z "$NEW_HOSTNAME" ]; then
 echo -n "Please enter new hostname: "
 read NEW_HOSTNAME < /dev/tty
fi

if [ -z "$NEW_HOSTNAME" ]; then
 echo "Error: no hostname entered. Exiting."
 exit 1
fi

#Display existing hostname
echo "Existing hostname is $OLD_HOSTNAME"

#change hostname in /etc/hosts & /etc/hostname
sudo sed -i "s/$OLD_HOSTNAME/$NEW_HOSTNAME/g" /etc/hosts
sudo sed -i "s/$OLD_HOSTNAME/$NEW_HOSTNAME/g" /etc/hostname

#display new hostname
echo "Your new hostname is $NEW_HOSTNAME"
