# SISTEM - Paypal IPN Aplicación 

El proyecto consisten en una app de gestion de ventas que conecta con la api de paypal para hacer un seguimiento de las compras y clientes cuenta con roles de usuario y un panel de publicacion 

Este repositorio contiene una aplicación con dos partes principales: la API (backend) y el frontend (cliente) desarrollados con Node.js, Express y Vite + React.
Para ejecutar en la web ir a https://web-ten-pi-26.vercel.app/ con las credenciales de prueba

user: test
passsword: 12345678

**Estructura del proyecto**
- **`api/`**: Servidor Express (entrada: `app.js`). Conexión a base de datos MySQL y autenticación por token.
- **`front/`**: Aplicación cliente construida con Vite + React (entrada: `src/main.jsx`).

**Prerequisitos**
- **Node.js** (recomendado >= 18) y **npm** instalados.
- **MySQL** (o compatible) si vas a usar la base de datos localmente.
- Variables de entorno para la API (ver sección correspondiente).

**Ejecutar en desarrollo (Windows PowerShell)**

Backend (API)
```powershell
cd api
npm install
# Crear un archivo `.env` en `api/` con las variables mínimas (ver abajo)
npm run start
```

Frontend (cliente)
```powershell
cd front
npm install
npm run dev
```
Notas rápidas:
- El backend escucha por defecto en el puerto `3000` (ver `api/app.js`).
- Vite suele arrancar en `http://localhost:5173`.

**Variables de entorno (API)**
En `api/` crea un archivo `.env` con al menos las siguientes variables:

- `DB_HOST` : host de la base de datos (ej. `localhost`)
- `DB_USER` : usuario de la base de datos
- `DB_PASSWORD` : contraseña de la base de datos
- `DB_NAME` : nombre de la base de datos
- `SECRET` : clave secreta para firmar/verificar JWT

Ejemplo mínimo de `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mi_contraseña
DB_NAME=sistem_db
SECRET=una_clave_secreta
```

**Scripts útiles**
- Backend: `npm run start` (usa `node --watch app.js` según `api/package.json`).
- Frontend: `npm run dev`, `npm run build`, `npm run preview` (según `front/package.json`).

**Configuración CORS y cookies**
- El archivo `api/config.js` define orígenes permitidos e intenta verificar cookies para establecer `req.session`.
- Si trabajas desde `localhost`, asegúrate de que la URL del frontend (`http://localhost:5173`) esté permitida en `allowedOrigins`.

**Problemas comunes & soluciones**
- Conexión a la base de datos: verifica que MySQL esté en ejecución y que las credenciales en `.env` sean correctas.
- CORS: si el navegador bloquea peticiones, revisa `api/config.js` y los orígenes permitidos.
- Cookies y credenciales: el backend está configurado para aceptar cookies (`credentials: true`); en el frontend asegúrate de enviar peticiones con `credentials` cuando sea necesario.

Contacto: abre un issue o responde en este hilo para que haga los ajustes que necesites.
