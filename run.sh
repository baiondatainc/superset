#!/bin/bash

cd /root/superset_backup
source venv/bin/activate

export FLASK_APP=superset
export SUPERSET_SECRET_KEY=$(openssl rand -base64 42)
export SUPERSET_CONFIG_PATH=/root/superset_backup/superset_config.py

# Step 1: Upgrade DB
superset db upgrade

# Step 2: Init roles & permissions
superset init

# Step 3: Run server
superset run -p 30000 -h 0.0.0.0 --with-threads --no-reload