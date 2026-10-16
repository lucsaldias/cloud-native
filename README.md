# AssetMania - Cloud Native App

AssetMania es una plataforma full-stack para la gestión y catalogación de recursos de videojuegos (Modelos 3D, Texturas, VFX, Audio y Scripts). Este proyecto implementa una arquitectura orientada a la nube, integrando seguridad avanzada con Microsoft Entra ID y mensajería asíncrona mediante RabbitMQ.

## Arquitectura y Tecnologías

### Frontend (Angular)
- Framework: Angular (Standalone Components).
- Autenticación: @azure/msal-angular y @azure/msal-browser para integración nativa con flujos OAuth2.
- Ruteo Seguro: Implementación de MsalGuard e Interceptores HTTP para inyección de tokens JWT.
- Diseño: Interfaz orientada a la estética gamer/developer.

### Backend (Spring Boot)
- Framework: Java 17 + Spring Boot 3.x.
- Seguridad: Spring Security con OAuth2 Resource Server para validar tokens JWT.
- Mensajería Asíncrona (RabbitMQ): Productores y consumidores de eventos del inventario[cite: 16].
- Persistencia: Spring Data JPA (repositorios para entidades Recurso y Usuario)[cite: 16].

## Requisitos Previos

- Java 17 o superior y Maven.
- Node.js (v18+) y Angular CLI.
- RabbitMQ (Instalado localmente o mediante Docker en el puerto 5672).
- Cuenta de Microsoft Azure con App Registration configurado (Tenant ID y Client ID).

## Instalación y Ejecución

### 1. Configuración del Backend (Spring Boot)
1. Navega a la carpeta del backend en la terminal: `cd backend`
2. Configura el archivo `src/main/resources/application.properties` con los datos de tu base de datos, las credenciales de RabbitMQ y los identificadores de Azure[cite: 16].
3. Compila y ejecuta el proyecto: `mvn spring-boot:run`
El servidor iniciará en http://localhost:8080.

### 2. Configuración del Frontend (Angular)
1. Navega a la carpeta del frontend: `cd frontend`
2. Instala las dependencias necesarias: `npm install`
3. Configura tu Tenant ID y Client ID en el archivo `src/app/auth-config.ts`[cite: 16].
4. Levanta el servidor de desarrollo: `ng serve`
La aplicación estará disponible en http://localhost:4200.

## Evaluación técnica (Modo Invitado)

La aplicación cuenta con un flujo completo de seguridad utilizando Microsoft Entra ID. 

IMPORTANTE: Si durante la demostración existen bloqueos de red, restricciones estrictas del navegador (como Navegación Privada que bloquea popups/redirecciones) o problemas de caché, la vista principal cuenta con un botón de "Entrar al Catálogo (Modo Invitado)". 

Este acceso de contingencia evade temporalmente el MsalGuard en el frontend, permitiendo evaluar el renderizado del catálogo, el diseño de la interfaz y la respuesta base de los controladores del backend sin depender de la conectividad externa con los servidores de Azure.

## Flujo de RabbitMQ

La integración de mensajería asíncrona se puede observar al interactuar con los recursos del sistema. El RabbitAdminController y los servicios asociados (AssetEventPublisher y AssetEventConsumer) gestionan el envío y recepción de notificaciones desvinculadas del hilo principal de la aplicación[cite: 16].
