# Spaceso backend project
Финальный проект новостей и статей

## Технологии backend
- Django
- Sqlite
- Docker
- Docker Compose
- Nginx
- Gunicorn
- Django Rest Framework
- Django Rest Framework Simple JWT
- Spectacular

<!-- ## Технологии frontend
- React
- React Router
- Axios
- Material UI
- React Hook Form
- React Toastify
- React Select -->

## Требования к системе

- Python >= 3.11

## Установка без Docker compose

1. Клонируйте этот репозиторий
2. Установите Python для вашей ОС [download link](https://www.python.org/downloads/).
3. Создайте virtual enviroument (виртуальное окруже) для Python. На примере ниже, где .venv директория для пакетови и бибилотек.
```
python -m venv .venv
```
4. Активируйте virtual enviroument (виртуальное окружение).

    Windows
    ```
    .venv\Scripts\activate
    ```
    Linux
    ```
    source .venv/bin/activate
    ```
5. Установите необходимые библиотеки Python из файла requirements.txt
```
pip install -r requirements.txt
```

## База данных

### Первая инициализация
Для начала нужно создать структуру.
```
python manage.py migrate
```
### Загрузка данных

Загразить данные можно с помощью команды, где projects файл с данныхми в формате json.
```
python manage.py loaddata projects
```
## Запуск сервера разработки

```
python manage.py runserver
```
Теперь вы можете открыть сайт по адресу — [http://127.0.0.1:8000/]() в своем любимом браузере.

## Как получить доступ к административной панели

Если у вас нет доступа, вы можете создать пользователя командой ниже.
```
python manage.py createsuperuser admin
```
Теперь можно авторизоваться по адресу — [http://127.0.0.1:8000/admin/]()

## Переменные среды

Данные хранятся в файлике .env для передачи доступов к базе данных и других параметров через данные переменной среды. Пример содержимого файла .env:
```
APP_PRODUCTION=True
APP_DEBUG=False
APP_DJANGO_LOGGING=False
APP_ALLOWED_HOSTS="localhost, 127.0.0.1, *"
APP_DB_ENGINE="sqlite" #postgresql
APP_DB_NAME="/app/db/db.sqlite3"
APP_DB_USER=""
APP_DB_PASSWD=""
APP_DB_PORT="5432"
APP_DB_HOST="172.17.0.1"
APP_MEDIA_ROOT="/app/files"
APP_MEDIA_URL='/files/'
```

## API URL Schemes
- [http://127.0.0.1:8000/api/schema/]() OpenAPI
- [http://127.0.0.1:8000/api/schema/swagger/]() swagger-ui
- [http://127.0.0.1:8000/api/schema/redoc/]() redoc

## Docker Compose

## Использование Docker
```bash
docker compose down
docker compose up --build
```

## 🔐 CSRF Trusted Origins
⚠️ Важно:
Начиная с Django 4.0, в CSRF_TRUSTED_ORIGINS обязательно должен быть протокол (http://), иначе Django не примет значение.

Для корректной работы админки:

```python
CSRF_TRUSTED_ORIGINS = [
    'http://127.0.0.1:8111',
    'http://localhost:8111',
    'http://127.0.0.1:8333',
    'http://localhost:8333',
]
```

## Создание суперпользователя в docker контейнере
```bash
sudo docker compose exec spaceso_web python manage.py createsuperuser
```

## 🗄️ Бэкап базы данных PostgreSQL


### Создать дамп:

```bash
docker compose exec spaceso_db pg_dump -U spaceso -d spaceso > backup.sql
```

### Восстановить:

```bash
docker compose exec -T spaceso_db psql -U spaceso -d spaceso < backup.sql
```

---

## 🧹 Полная остановка и очистка

```bash
docker compose down
docker system prune -f
```

---

## Демо версия приложения

- [Сайт Spaceso](https://spaceso.maxano.com/)
- [Админка Spaceso](https://spaceso.maxano.com/admin/)
- Пользователь: **test**, пароль: **test**