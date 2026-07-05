# daifoll.notes

Простой проект для заметок: FastAPI + PostgreSQL на backend, Vue 3 + Vite на frontend. Будет расширяться по мере изучения Python.

## Требования

- **Python** 3.12+
- **Node.js** 20+
- **PostgreSQL** 14+

## Backend

### 1. База данных

Создай базу и пользователя в PostgreSQL (пример):

```sql
CREATE USER daifoll WITH PASSWORD 'your_password';
CREATE DATABASE daifollnotes OWNER daifoll;
```

Скопируй `backend/.env.example` в `backend/.env` и укажи строку подключения в `DATABASE_URL`.

При первом запуске таблицы создаются автоматически через SQLAlchemy (`Base.metadata.create_all`).

### 2. Установка зависимостей

Из корня проекта:

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r backend/requirements.txt
```

### 3. Запуск

```bash
source .venv/bin/activate
cd backend
uvicorn main:app --reload --port 8000
```

API будет доступен на [http://localhost:8000](http://localhost:8000).  
Документация Swagger: [http://localhost:8000/docs](http://localhost:8000/docs).

## Frontend

### 1. Установка зависимостей

```bash
cd frontend
npm install
```

### 2. Запуск

```bash
npm run dev
```

Приложение откроется на [http://localhost:5173](http://localhost:5173).

Frontend обращается к API по адресу `http://localhost:8000` — backend должен быть запущен параллельно.

## Запуск всего проекта

В двух терминалах:

```bash
# Терминал 1 — backend
source .venv/bin/activate
cd backend && uvicorn main:app --reload --port 8000

# Терминал 2 — frontend
cd frontend && npm run dev
```