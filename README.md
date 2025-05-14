## Primeros Pasos (En Español)

Sigue estos pasos para poner en marcha el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (se recomienda la versión LTS o superior).
Este proyecto utiliza `npm` como gestor de paquetes preferido.

### Instalación de Dependencias

1.  Clona el repositorio (si aún no lo has hecho):

    ```bash
    git clone https://github.com/mmerlo-coding/Inetum-test.git
    cd <Nombre que le hayas colocado a tu carpeta al clonar el repositorio>
    ```

2.  Instala las dependencias del proyecto. Elige el comando según tu gestor de paquetes:

    Con `npm`(recomendado):

    ```bash
    npm install
    ```

    Con `pnpm`:

    ```bash
    pnpm install
    ```

    Con `yarn`:

    ```bash
    yarn install
    ```

### Ejecutar el Servidor de Desarrollo

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo:

Con `pnpm`:

```bash
pnpm dev
```

Con `npm`:

```bash
npm run dev o npm run start
```

Con `yarn`:

```bash
yarn dev
```

Esto iniciará la aplicación en modo de desarrollo. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

La página se actualizará automáticamente a medida que edites los archivos. El archivo principal de la página de inicio se encuentra en `app/page.tsx`.

---

## Arquitectura del proyecto

El proyecto se basa en Next.js 15, TypeScript, React, Tanstack Query, Zustand, Lucide, Sass. Las carpetas estan organizadas dentro del directorio `src` y estan las siguientes:

- `app`: Carpeta para las páginas y rutas de la aplicación.
- `components`: Carpeta para los componentes reutilizables.
- `constants`: Carpeta para las constantes y configuraciones del proyecto.
- `server`: Carpeta para las funciones del servidor y para la configuracion de Tanstack Query.
- `stores`: Carpeta para el contexto global usando Zustand.
- `styles`: Carpeta para los estilos y hojas de estilo del proyecto con Sass.
- `types`: Carpeta para los tipos de datos del proyecto.

Al tener las carpetas separadas y organizadas, es mas facil de mantener el proyecto y agregar nuevas funcionalidades.

## Estructura de carpetas

La estructura de carpetas del proyecto es la siguiente:

```bash
src/
├── app/
├── components/
├── constants/
├── server/
├── stores/
├── styles/
├── types/
```

## Thinking process y decisiones tomadas

Las decisiones de arquitectura y diseño se tomaron basandome en las necesidades del proyecto y las caracteristicas de el test dado, trate de cumplir con las reglas los mas cerca posible y evitar usar tecnologias que no fueran necesarias.

La mayoria de los components estan completamente customizados y creados desde cero, exceptuando los componentes de UI que estan basados en componentes de `lucide-react` para iconos.

### Como correr los tests

Una vez instaladas las dependencias, puedes correr los tests que estan en el directorio `__tests__` con el siguiente comando:

Con `pnpm`:

```bash
pnpm test
```

Con `npm`:

```bash
npm run test
```

Con `yarn`:

```bash
yarn test
```
