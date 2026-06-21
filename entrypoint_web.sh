#!/bin/sh
set -e

# echo "📌 Waiting for PostgreSQL..."
# until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
#   echo "⏳ PostgreSQL is starting..."
#   sleep 1
# done
# echo "✅ PostgreSQL is available"

echo "📌 Applying migrations..."
python manage.py migrate --noinput

echo "📌 Collecting static files..."
python manage.py collectstatic --noinput

# Копируем кастомную статику поверх Django-статик
cp -rT /app/static_nginx /app/static
# cp -r /app/static_nginx/* /app/static/
chmod -R a+r /app/static
chmod -R a+r /app/files

echo "🚀 Starting Gunicorn..."
exec gunicorn config.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --threads 2 \
    --timeout 6000
