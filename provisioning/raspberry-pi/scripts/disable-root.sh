sed -i 's/PermitRootLogin yes/PermitRootLogin no/g' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin without-password/PermitRootLogin no/g' /etc/ssh/sshd_config
