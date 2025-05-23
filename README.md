# Sistema de Estacionamiento - Backend

Este proyecto es el backend del sistema de administración de estancias de vehículos en un estacionamiento, desarrollado con Node.js, TypeScript, Express y Sequelize.

## 🚀 Requisitos

- Node.js 18+
- MySQL 8+
- (opcional) Postman para probar endpoints

## 📦 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crea un archivo `.env` basado en `.env.example`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=estacionamiento
PORT=3000
```

## 🛠 Base de datos

1. Crea la base de datos en tu servidor MySQL.
2. Ejecuta el script `database.sql` incluido:

```bash
mysql -u root -p estacionamiento < database.sql
```

## ▶️ Ejecución

```bash
tsc

y despues

npm run dev
```

Compila y corre en modo desarrollo con `ts-node-dev`.

---

## 📌 Endpoints principales

- `POST /api/vehiculos`
- `GET /api/vehiculos`
- `POST /api/estancias`
- `GET /api/estancias`
- `POST /api/estancias/salida`

## 🧠 Extras

- Patrón MVC
- Validaciones con Sequelize
- Preparado para futura autenticación
