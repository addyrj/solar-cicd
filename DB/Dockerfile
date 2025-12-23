FROM mysql:8.0

# Only init SQL (no ENV here)
COPY iot_solar.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
