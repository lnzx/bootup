#!/bin/bash
hostnamectl set-hostname aws-XXXX
echo "127.0.0.1 aws-XXXX" >> /etc/hosts

echo root:LgUtmVqReyY5epV |chpasswd
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin yes/' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config.d/60-cloudimg-settings.conf 
systemctl restart ssh
