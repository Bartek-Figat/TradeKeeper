#!/bin/bash

# Define your domain and email
DOMAIN="your_domain.com"
EMAIL="your_email@example.com"

# Log file for certbot operations
LOG_FILE="/var/log/certbot.log"

# Function to log messages
log_message() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
}

# Check if the certificate already exists
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  log_message "Certificate not found for $DOMAIN. Requesting a new certificate..."
  certbot certonly --webroot -w /data/letsencrypt -d $DOMAIN --non-interactive --agree-tos --email $EMAIL >> $LOG_FILE 2>&1
  if [ $? -eq 0 ]; then
    log_message "Certificate successfully obtained for $DOMAIN."
  else
    log_message "Failed to obtain certificate for $DOMAIN."
    exit 1
  fi
else
  log_message "Certificate already exists for $DOMAIN. Skipping certificate request."
fi

# Start the renewal loop
log_message "Starting certificate renewal loop."
trap exit TERM
while :; do
  # Check if the certificate is due for renewal
  certbot renew --dry-run >> $LOG_FILE 2>&1
  if [ $? -eq 0 ]; then
    log_message "Certificate is due for renewal. Proceeding with renewal..."
    certbot renew >> $LOG_FILE 2>&1
    if [ $? -eq 0 ]; then
      log_message "Certificate renewal successful."
    else
      log_message "Certificate renewal failed."
    fi
  else
    log_message "Certificate is not due for renewal. Waiting for the next check."
  fi
  sleep 12h & wait $${!}
done