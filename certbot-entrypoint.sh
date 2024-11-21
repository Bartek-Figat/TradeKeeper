#!/bin/bash
# This line specifies the script interpreter to be bash.

# Define your domain and email
DOMAIN="your_domain.com"
# Sets the domain name for which the certificate is to be obtained.
EMAIL="your_email@example.com"
# Sets the email address for notifications and registration with Let's Encrypt.

# Log file for certbot operations
LOG_FILE="/var/log/certbot.log"
# Specifies the file where log messages will be appended.

# Function to log messages
log_message() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
  # Logs a message with a timestamp to both the console and the log file.
}

# Check if the certificate already exists
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  # Checks if the certificate file does not exist for the specified domain.
  log_message "Certificate not found for $DOMAIN. Requesting a new certificate..."
  # Logs a message indicating that a certificate is being requested.
  certbot certonly --webroot -w /data/letsencrypt -d $DOMAIN --non-interactive --agree-tos --email $EMAIL >> $LOG_FILE 2>&1
  # Runs certbot to obtain a new certificate using the webroot method, logging output and errors.
  if [ $? -eq 0 ]; then
    # Checks if the previous command was successful.
    log_message "Certificate successfully obtained for $DOMAIN."
    # Logs a success message.
  else
    log_message "Failed to obtain certificate for $DOMAIN."
    # Logs a failure message.
    exit 1
    # Exits the script with an error code.
  fi
else
  log_message "Certificate already exists for $DOMAIN. Skipping certificate request."
  # Logs a message indicating that the certificate already exists.
fi

# Start the renewal loop
log_message "Starting certificate renewal loop."
# Logs a message indicating the start of the renewal loop.
trap exit TERM
# Sets up a trap to exit the loop when a TERM signal is received.
while :; do
  # Infinite loop to periodically check for certificate renewal.
  # Check if the certificate is due for renewal
  certbot renew --dry-run >> $LOG_FILE 2>&1
  # Performs a dry run of the renewal process to check if renewal is needed.
  if [ $? -eq 0 ]; then
    # Checks if the dry run was successful, indicating renewal is needed.
    log_message "Certificate is due for renewal. Proceeding with renewal..."
    # Logs a message indicating that renewal will proceed.
    certbot renew >> $LOG_FILE 2>&1
    # Renews the certificate, logging output and errors.
    if [ $? -eq 0 ]; then
      log_message "Certificate renewal successful."
      # Logs a success message for renewal.
    else
      log_message "Certificate renewal failed."
      # Logs a failure message for renewal.
    fi
  else
    log_message "Certificate is not due for renewal. Waiting for the next check."
    # Logs a message indicating that renewal is not needed.
  fi
  sleep 12h & wait $${!}
  # Waits for 12 hours before the next renewal check.
done