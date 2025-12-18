FROM mysql:8.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=your_root_password
ENV MYSQL_DATABASE=iot_solar

# Copy SQL dump into MySQL initialization directory
COPY iot_solar.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306