# Configuración de Variables de Entorno

Este proyecto utiliza un único archivo `.env` para la configuración.

## Variables de Entorno

El proyecto usa un archivo `.env` en la raíz del proyecto.

### Variables Requeridas

Todas las variables deben tener el prefijo `VITE_` para que Vite las exponga al código:

- `VITE_API_URL` - URL base de la API
- `VITE_API_KEY` - Código de autenticación de la API
- `VITE_ENV` - Identificador del ambiente (dev, qa, production)
- `VITE_APP_TITLE` - Título de la aplicación

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto
2. Agrega las variables necesarias:

```env
VITE_API_URL=https://lecciones-aprendidas-func.azurewebsites.net/api
VITE_API_KEY=tu-codigo-de-api-aqui
VITE_ENV=qa
VITE_APP_TITLE=Lecciones Aprendidas
```

## Uso

### Desarrollo

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Configuración de la API

El servicio `lesson.service.ts` utiliza las variables de entorno configuradas en el archivo `.env` para conectarse a la API.

La configuración se obtiene a través del módulo `src/config/env.ts`.

### Ejemplo de uso en código

```typescript
import { getEnvConfig, isLocalEnv, isQAEnv } from '@/config/env';

// Obtener configuración completa
const config = getEnvConfig();
console.log(config.apiBaseUrl);

// Verificar el ambiente actual
if (isLocalEnv()) {
  console.log('Estamos en desarrollo local');
}

if (isQAEnv()) {
  console.log('Estamos en QA');
}
```

## Notas Importantes

1. **Seguridad**: El archivo `.env` está en `.gitignore` y no se sube al repositorio.

2. **Variables de Entorno**: Vite solo expone variables que comienzan con `VITE_`. Asegúrate de usar este prefijo.

3. **Reinicio del Servidor**: Después de crear o modificar el archivo `.env`, reinicia el servidor de desarrollo para que los cambios surtan efecto.

## Solución de Problemas

### Error: "VITE_API_URL no está definida"

- Verifica que el archivo `.env` existe en la raíz del proyecto
- Asegúrate de que las variables tienen el prefijo `VITE_`
- Reinicia el servidor de desarrollo después de crear o modificar el archivo `.env`
