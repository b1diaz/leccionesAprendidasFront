/**
 * Configuración de variables de entorno
 * Vite expone las variables de entorno con el prefijo VITE_
 */

interface EnvConfig {
  apiBaseUrl: string;
  apiCode: string;
  env: string;
  appTitle: string;
}

/**
 * Obtiene la configuración del ambiente actual
 */
export const getEnvConfig = (): EnvConfig => {
  // Usar las mismas keys que busquedaConIA para compatibilidad con el despliegue
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const apiCode = import.meta.env.VITE_API_KEY;
  const env = import.meta.env.VITE_ENV || import.meta.env.MODE || 'development';
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Lecciones Aprendidas';

  // Validar que las variables de entorno estén configuradas
  // En desarrollo local pueden ser opcionales (se usan datos mock), pero en QA/producción son requeridas
  const isLocal = isLocalEnv();
  
  if (!isLocal) {
    // En QA y producción, las variables son requeridas
    if (!apiBaseUrl) {
      throw new Error('VITE_API_URL no está definida en las variables de entorno. Revisa tu archivo .env');
    }

    if (!apiCode) {
      throw new Error('VITE_API_KEY no está definida en las variables de entorno. Revisa tu archivo .env');
    }
  }

  return {
    apiBaseUrl: apiBaseUrl || '', // Valor por defecto para local
    apiCode: apiCode || '', // Valor por defecto para local
    env,
    appTitle,
  };
};

/**
 * Verifica si estamos en desarrollo local
 */
export const isLocalEnv = (): boolean => {
  return import.meta.env.VITE_ENV === 'dev' || import.meta.env.MODE === 'dev' || import.meta.env.MODE === 'development';
};

/**
 * Verifica si estamos en QA
 */
export const isQAEnv = (): boolean => {
  return import.meta.env.VITE_ENV === 'qa';
};

/**
 * Verifica si estamos en producción
 */
export const isProductionEnv = (): boolean => {
  return import.meta.env.VITE_ENV === 'production' || import.meta.env.MODE === 'production';
};

