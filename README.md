# Introducción

Esta plantilla de NEXT genérica fue creada por el equipo de Cleverit Labs.

## Instalación

Para utilizar esta plantilla, primero debemos tener instalado Yarn.

```shell
npm install --global yarn
yarn
yarn generate-styles
yarn dev
```

## Módulos

@Esteban por favor explicar como es la estructura de carpetas de esta solución.

## Rutas Privadas

@Esteban explicar como funcionan las rutas privadas dentro del template.

### Guards

@Esteban explicar como funcionan los guards

## Variables de Entorno

Esta plantilla NEXT funciona con variables de entorno en tiempo de compilación, para facilitar el trabajo local con la plantilla estamos usando actualmente el package .dotenv, el cual permite leer las variables de entorno de un archivo .env, el cual no debe ser versionado y permitirá modificar las variables que han sido definidas como NEXT_PUBLIC.

```shell
NEXT_PUBLIC_DEFAULT_THEME=light
NEXT_PUBLIC_ENABLE_MULTILANGUAGE=true
NEXT_PUBLIC_BASE_COLOR=#98f8bb
NEXT_PUBLIC_APP_API_URL=<<url-de-tu-backend>>
```
