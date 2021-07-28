# Introducción

Esta plantilla de NEXT genérica fue creada por el equipo de Cleverit Labs.

Dentro de esta plantilla se utiliza las siguientes libererías:

- Tailwindscss
- React Suite
- Style Components

## Instalación

Para utilizar esta plantilla, primero debemos tener instalado Yarn.

```shell
npm install --global yarn
yarn
yarn dev
```

## Estructura del Templates

```shell
├── README.md
├── custom.d.ts
├── dockerfile
├── generate-styles.config.js
├── i18n.json
├── locales
│   ├── en
│   │   └── common.json
│   └── es
│       └── common.json
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── images
│   │   ├── icon
│   │   └── logo
│   └── themes
│       ├── theme-dark.css
│       └── theme-light.css
├── src
│   ├── components
│   │   ├── Drawer
│   │   ├── Header
│   │   ├── Layout
│   │   ├── Modal
│   │   ├── NavBar
│   │   ├── NoResult
│   │   ├── PasswordInput
│   │   ├── PrivateRoute
│   │   ├── SideMenu
│   │   ├── SiteLoader
│   │   ├── Styles
│   │   ├── Table
│   │   ├── Tailwind
│   │   ├── Theme
│   │   ├── ToggleLang
│   │   ├── ToggleTheme
│   │   └── ToggleVendor
│   ├── context
│   │   ├── auth.tsx
│   │   ├── drawer
│   │   ├── modal
│   │   ├── notification
│   │   └── profile
│   ├── gql
│   │   ├── Example
│   │   ├── User
│   │   └── index.tsx
│   ├── less
│   │   ├── index.less
│   │   └── themes
│   ├── pages
│   │   ├── 404.tsx
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── app
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── public-page.tsx
│   │   └── recover.tsx
│   ├── routes
│   │   ├── index.tsx
│   │   ├── routes.tsx
│   │   └── types.tsx
│   ├── settings
│   │   ├── apollo.ts
│   │   └── constants.ts
│   ├── styles
│   │   ├── global.scss
│   │   └── overwrite-rsuite.scss
│   ├── types
│   │   ├── User.types.ts
│   │   └── Vendor.types.ts
│   └── utils
│       ├── files.ts
│       ├── guards.ts
│       ├── helpers.ts
│       ├── hooks
│       ├── lottie
│       └── string.ts
├── tailwind.config.js
├── themes.config.js
├── tsconfig.eslint.json
├── tsconfig.json
└── yarn.lock

```

## Rutas Privadas

@Esteban explicar como funcionan las rutas privadas dentro del template.

### Guards

@Esteban explicar como funcionan los guards

### Drawers

### Custom hooks

@So many details

## Variables de Entorno

Esta plantilla NEXT funciona con variables de entorno en tiempo de compilación, para facilitar el trabajo local con la plantilla estamos usando actualmente el package .dotenv, el cual permite leer las variables de entorno de un archivo .env, el cual no debe ser versionado y permitirá modificar las variables que han sido definidas como NEXT_PUBLIC.

```shell
NEXT_PUBLIC_DEFAULT_THEME=light
NEXT_PUBLIC_ENABLE_MULTILANGUAGE=true
NEXT_PUBLIC_BASE_COLOR=#98f8bb
NEXT_PUBLIC_APP_API_URL="<url-de-tu-backend>"
```

### Personalizar colores de la plantilla

Para personalizar los colores de la plantilla.
