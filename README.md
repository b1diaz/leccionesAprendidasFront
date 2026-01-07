# Sistema de Lecciones Aprendidas

Sistema de búsqueda y gestión de lecciones aprendidas con diseño Material Design minimalista.

## Requisitos

- Node.js & npm - [instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

## Instalación

```sh
# Paso 1: Clonar el repositorio
git clone <YOUR_GIT_URL>

# Paso 2: Navegar al directorio del proyecto
cd <YOUR_PROJECT_NAME>

# Paso 3: Instalar las dependencias necesarias
npm i

# Paso 4: Configurar variables de entorno
# Crea un archivo .env en la raíz del proyecto con tus valores

# Paso 5: Iniciar el servidor de desarrollo
npm run dev
```

## Configuración de Variables de Entorno

El proyecto requiere variables de entorno para conectarse a la API. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_URL=https://lecciones-aprendidas-func.azurewebsites.net/api
VITE_API_KEY=tu-codigo-de-api-aqui
VITE_ENV=qa
VITE_APP_TITLE=Lecciones Aprendidas
```

**Importante:** El archivo `.env` está en `.gitignore` y no se commitea al repositorio.

## Tecnologías utilizadas

Este proyecto está construido con:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter
