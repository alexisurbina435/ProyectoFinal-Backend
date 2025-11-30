<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <b>Sistema de Gestión de Gimnasios</b> construido con <a href="http://nodejs.org" target="_blank">Node.js</a> y <a href="http://nestjs.com/" target="_blank">NestJS</a>.
</p>

---

## 📋 Descripción del proyecto

Este backend provee la API para un **sistema de gestión de gimnasios**.  
Las principales funcionalidades incluyen:

- Registro de usuarios con **contraseñas hasheadas** mediante `bcrypt`.
- Autenticación con **JWT**, almacenado en cookies para mayor seguridad.
- Encriptación de datos personales al iniciar sesión.
- Gestión de **ejercicios, rutinas y usuarios**.
- Envío y recepción de formularios.
- Integración con **Mercado Pago** para métodos de pago.
- Configuración mediante **variables de entorno** para base de datos, JWT y aplicación.

---
## 📦 Dependencias

Este proyecto utiliza las siguientes librerías principales:

- **NestJS**  
  - @nestjs/common, @nestjs/core, @nestjs/config, @nestjs/jwt, @nestjs/passport, @nestjs/typeorm  
- **Autenticación y seguridad**  
  - bcrypt, bcryptjs, passport, passport-jwt, jsonwebtoken  
- **Validación y transformación**  
  - class-validator, class-transformer  
- **Base de datos**  
  - typeorm, mysql2  
- **Utilidades**  
  - cors, cookie-parser, date-fns, reflect-metadata, rxjs  
- **Pagos**  
  - mercadopago

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/alexisurbina435/ProyectoFinal-Backend.git
  
2. Moverse dentro de la carpeta del proyecto:
   ```bash
   cd ProyectoFinal-Backend

3. Instalar dependencias:
    ```bash
   npm install

4. Ejecución del proyecto:
    ```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
---

## Variables de entorno necesarias (.env)
  ```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=nombreDatabase

# JWT
JWT_SECRET=palabrasecreta
JWT_EXPIRES_IN=1h

# App
PORT=3000
NODE_ENV=development

# Mercado Pago
MP_ACCESS_TOKEN=token_de_mercadopago
```
---

## 📡 Endpoints de la API
Aquí se documentan los principales endpoints disponibles en el sistema.

### 🔐 Autenticación

#### POST http://localhost:3000/api/auth/login
- **Descripción:** Inicia sesión y devuelve un JWT en cookie.

- **Body de la request (ejemplo válido):**
```json
{
  "email": "usuario@example.com",
  "password": "123456"
}
Response exitoso(200 OK)
{
  "message": "Login exitoso",
  "usuario": {
    "id_usuario": 1,
    "nombre": "ale",
    "apellido": "urbi",
    "email": "usuario@gmail.com",
    "telefono": "228454487",
    "rol": "usuario",
    "estado_pago": false,
    "aceptarEmails": false,
    "aceptarWpp": false,
    "aceptarTerminos": false
  }
}
Body de la request(ejemplo inválido)
{
  "email": "dasdasd@gmail.com",
  "password": "123456"
}
Response de error (400 Bad request):
{
  "message": "El usuario no existe",
  "error": "Bad Request",
  "statusCode": 400
}
 ```
  #### POST http://localhost:3000/api/auth/logout
- **Descripción:** - Cierra la sesión del usuario eliminando el token de la cookie.
- **Body de la request: No requiere body**
 ```json
    Response exitoso(200 OK)
    {
      "message": "Logout exitoso"
    }
 ```
  ### 👤 Endpoints de Usuario
   #### POST http://localhost:3000/api/usuario/registro
- **Descripción:** - Registra un nuevo usuario con su password hasheada
 ```json
- Body de la request: (ejemplo válido)
  { 
    "nombre": "nombre",			
    "apellido": "apellido",
    "email": "testeo@gmail.com",
    "telefono": 228454487,
    "password": "123456",
    "aceptarTerminos": true
  }
    Response exitoso(201 Created)
  {
    "id_usuario": 12,
    "nombre": "nombre",
    "apellido": "apellido",
    "email": "testeo@gmail.com",
    "telefono": 228454487,
    "password": "$2b$10$bRXwhW//uiloGmQRwuQ95.ePRBL9zeboB7J9/LKsCxvUIuQO7SbxO",
    "rol": "usuario",
    "estado_pago": false,
    "aceptarEmails": false,
    "aceptarWpp": false,
    "aceptarTerminos": true
  }

    Body de la request(ejemplo inválido)
{ 
    "nombre": "nombre",			
    "apellido": "apellido",
    "email": "testeo@gmail.com",
    "telefono": 228454487,
    "password": "123456",
    "aceptarTerminos": true
  }
    Response de error (409 Conflict):
  {
  "message": "El email ya está registrado",
  "error": "Conflict",
  "statusCode": 409
}
    Body de la request(ejemplo 2 invalido, falta de la password)
    { 
    "nombre": "nombre",			
    "apellido": "nombre",
    "email": "testeo1@gmail.com",
    "telefono": 228454487,
    "aceptarTerminos": true
  }
    Response de error(400 Bad request)
    {
    "message": "data and salt arguments required",
    "error": "Bad Request",
    "statusCode": 400
  }
 ```
   #### GET http://localhost:3000/api/usuario/
- **Descripción:** - Obtener todos los usuarios de la base de datos
- **Body de la request: No requiere body**
 ```json
    Response exitoso(200 OK)
  [
  {
    "id_usuario": 1,
    "nombre": "nombre",
    "apellido": "apellido",
    "email": "usuario@gmail.com",
    "telefono": "228454487",
    "password": "$2b$10$DZZzsTdJoHdartmH/tV0HeDUiGHunayBbQN3Ynzn9SSFxLDSzkpMK",
    "rol": "admin",
    "estado_pago": false,
    "aceptarEmails": false,
    "aceptarWpp": false,
    "aceptarTerminos": false,
    "ficha": null,
    "suscripciones": []
  },
  {
    "id_usuario": 2,
    "nombre": "nombre2",
    "apellido": "apellido2",
    "email": "TESTUSER9077268554204210318@testuser.com",
    "telefono": "228454487",
    "password": "$2b$10$8q6KXe93OWPskJutlHUWpOSZxKrHNwNdEv8TC20JwobaswLvc/0GK",
    "rol": "usuario",
    "estado_pago": false,
    "aceptarEmails": false,
    "aceptarWpp": false,
    "aceptarTerminos": false,
    "ficha": null,
    "suscripciones": []
  },]
 ```
  #### PATCH http://localhost:3000/api/usuario/id
- **Descripción:** - Editar datos del usuario
 ```json
    - Body de la request: (ejemplo válido)
    { 
    "nombre": "nombree",			
    "apellido": "apellidoo",
    "email": "emailEditado@gmail.com",
    "telefono": 228454487,
    "password": "123456",
    "aceptarTerminos": true
  }

  Response exitoso(200 OK)
  {
    "id_usuario": 1,
    "nombre": "nombree",
    "apellido": "nombree",
    "email": "emailEditado@gmail.com",
    "telefono": "228454487",
    "password": "$2b$10$cx0SmxI5L.k7OnIkE0.AQOM7DYV/91jCXwhfpYJvEUJSZWhDGjqei",
    "rol": "admin",
    "estado_pago": false,
    "aceptarEmails": false,
    "aceptarWpp": false,
    "aceptarTerminos": true
  }
```
 #### DELETE http://localhost:3000/api/usuario/id
- **Descripción:** - Eliminar usuario
-  **Body de la request: No requiere body**
  ```json
    Response exitoso(200 OK)

    Response no valido(404 Not Found)
    si el id del usuario no existe
    {
    "message": "usuario no encontrado.",
    "error": "Not Found",
    "statusCode": 404
    }
  ```

  ### 🏋️ Endpoints de plan
  #### POST http://localhost:3000/api/plan
- **Descripción:** - Registra un nuevo plan
 ```json
- Body de la request: (ejemplo válido)
  {
    "nombre":"basic",
    "precio": 35000,
    "descripcion": "Entrenamiento basic"
  }
    Response exito(201 created)

  - Body de la request:(ejemplo invalido)
    {
    "nombre":"basic",
    "descripcion": "Entrenamiento basic"
  }
    Response no valido(400 Bad Request)
    {
    "message": [
      "precio must not be less than 0",
      "precio must be an integer number"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```
  #### GET http://localhost:3000/api/plan
- **Descripción:** - obtiene todos los planes disponibles
-  **Body de la request: No requiere body**
 ```json
    Response exitoso(200 OK)
    [{
      "id_plan": 1,
      "nombre": "premium",
      "precio": 50000,
      "descripcion": "Entrenamiento premium"
    },
    {
      "id_plan": 2,
      "nombre": "standard",
      "precio": 40000,
      "descripcion": "Entrenamiento standard"
    },]
 ```
   #### GET http://localhost:3000/api/plan/id
- **Descripción:** - obtiene el plan seleccionado por el id
-  **Body de la request: No requiere body**
 ```json
    http://localhost:3000/api/plan/2
    Response exitoso(200 OK)
    {
    "id_plan": 2,
    "nombre": "standard",
    "precio": 40000,
    "descripcion": "Entrenamiento standard"
  }
 ```
  #### PATCH http://localhost:3000/api/plan/id
- **Descripción:** - Edita el plan segun el id seleccionado
-  **Body de la request:**
 ```json
  http://localhost:3000/api/plan/4
    {
    "nombre":"basic",
    "precio": 40000,
    "descripcion": "Entrenamiento basic"
  }
  Response exitoso(200 OK)
  {
    "id_plan": 4,
    "nombre": "basic",
    "precio": 40000,
    "descripcion": "Entrenamiento basic"
  }
 ```
  #### DELETE http://localhost:3000/api/plan/id
- **Descripción:** - obtiene el plan seleccionado por el id
-  **Body de la request: No requiere body**
 ```json
    http://localhost:3000/api/plan/4
    Response exitoso(200 OK)

    Response no exitoso(404 Not Found)
    intentamos de nuevo eliminar el mismo id ya eliminado por ejemplo

    {
      "message": "Plan con id 4 no encontrado",
      "error": "Not Found",
      "statusCode": 404
    }
  ```

  ### 🛒 Endpoints de Productos
  #### POST http://localhost:3000/api/producto/
- **Descripción:** - Crear producto
-  **Body de la request:**
  ```json
    {
    "nombre":"proteina",
    "descripcion": "de alta calidad",
    "imagen": "foto.mp4",
    "precio": 12000,
    "stock": 12,
    "categoria": "suplementacion"
  }
    Response exitoso(201 CREATED)
    {
    "id_producto": 9,
    "nombre": "proteinaA",
    "descripcion": "de alta calidad",
    "imagen": "foto.mp4",
    "precio": 12000,
    "stock": 12,
    "categoria": "suplementacion",
    "fecha_creacion": "2025-11-30T09:59:40.444Z"
  }
    Body de la request invalida:
    {
    "nombre":"proteinaA",
    "descripcion": "de alta calidad",
    "imagen": "foto.mp4",
    "precio": 12000,
    "categoria": "suplementacion"
  }
    Response no exitoso(400 Bad Request)
      {
    "message": [
      "stock should not be null or undefined",
      "stock must not be less than 0",
      "stock must be an integer number"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```
  #### GET http://localhost:3000/api/producto/
- **Descripción:** - obtiene todos los productos
-  **Body de la request: No requiere body**
```json
  Response exitoso(200 OK)
  [
  {
    "id_producto": 1,
    "nombre": "Creatina",
    "descripcion": "Suplemento En Polvo Star Nutrition Creatine Monohydrate",
    "imagen": "https://i.imgur.com/n2oxggc.png",
    "precio": 40500,
    "stock": 10,
    "categoria": "suplemento",
    "fecha_creacion": "2025-11-26T07:47:23.833Z"
  },
  {
    "id_producto": 2,
    "nombre": "Whey protein advance",
    "descripcion": "Suplemento de proteína de suero de alta calidad de whey protein",
    "imagen": "https://i.imgur.com/VoceiAa.png",
    "precio": 130000,
    "stock": 30,
    "categoria": "suplemento",
    "fecha_creacion": "2025-11-26T07:47:23.833Z"
  },]
```

  #### GET http://localhost:3000/api/producto/id
- **Descripción:** - obtiene el producto seleccionado por el id
-  **Body de la request: No requiere body**
```json
  http://localhost:3000/api/producto/1
  Response exitoso(200 OK)
  {
    "id_producto": 1,
    "nombre": "Creatina",
    "descripcion": "Suplemento En Polvo Star Nutrition Creatine Monohydrate",
    "imagen": "https://i.imgur.com/n2oxggc.png",
    "precio": 40500,
    "stock": 10,
    "categoria": "suplemento",
    "fecha_creacion": "2025-11-26T07:47:23.833Z"
  }
  Response no exito(404 Not Found)
  http://localhost:3000/api/producto/30
  {
    "statusCode": 404,
    "message": "Error al obtener el producto con el id 30"
  }
```
  #### PATCH http://localhost:3000/api/producto/id
- **Descripción:** - Edita el producto seleccionado por el id
```json
  Body de la request:
    http://localhost:3000/api/producto/9
  {
    "nombre":"protein",
    "descripcion": "de alta calidad",
    "imagen": "foto.mp4",
    "precio": 13000,
    "categoria": "suplementacion"
  }
  Response exitoso(200 OK)
  {
    "id_producto": 9,
    "nombre": "protein",
    "descripcion": "de alta calidad",
    "imagen": "foto.mp4",
    "precio": 13000,
    "stock": 12,
    "categoria": "suplementacion",
    "fecha_creacion": "2025-11-30T09:59:40.444Z"
  }
  http://localhost:3000/api/producto/100
  Response no exitoso(404 Not Found)
  {
    "statusCode": 404,
    "message": "Error al actualizar el producto con el id 100"
  }
  ```

 #### DELETE http://localhost:3000/api/producto/id
- **Descripción:** - Elimina el producto seleccionado por el id
-  **Body de la request: No requiere body**
  ```json
  http://localhost:3000/api/producto/9
  Responsive exitoso(200 OK)

  intento eliminar denuevo el producto con id 9:
  http://localhost:3000/api/producto/9
  Responsive no exitoso(404 Not Found)
    {
    "statusCode": 404,
    "message": "Error al eliminar el producto con el id 9"
  }
  ```
  ### 📞  Endpoints de Contacto
  #### POST http://localhost:3000/api/contacto/
-  **Descripción:** - Crear consulta
  ```json
    Body de la request:
    {
    "nombre": "nombre",
    "email": "nombre@gmail.com",
    "consulta":"Quisiera saber el precio de los planes?"
    }
      Response exitoso(201 created)
    {
    "id": 3,
    "nombre": "nombre",
    "email": "nombre@gmail.com",
    "consulta": "Quisiera saber el precio de los planes?",
    "fecha_creacion": "2025-11-30T10:50:50.437Z"
    }

    Body de la request no valida:
    {
      "nombre": "nombre",
      "email": "nombre@gil.m",
      "consulta":"Quisiera saber el precio de los planes?"
    }
      Response no exitoso(400 Bad Request)
    {
      "message": [
        "El correo no es válido",
        "email must be an email"
      ],
      "error": "Bad Request",
      "statusCode": 400
    }
  ```
  #### GET http://localhost:3000/api/contacto/
-  **Descripción:** - Obtener todas las consultas
  ```json
      Response no exitoso(403 Forbidden)
      el metodo tiene un authguard, solo puede acceder el admin al findAll
      {
      "message": "Forbidden resource",
      "error": "Forbidden",
      "statusCode": 403
    }
  ```
   #### GET http://localhost:3000/api/contacto/id
-  **Descripción:** - Obtener consulta por id
  ```json
    Response no exitoso(403 Forbidden)
    el metodo tiene un authguard, solo el adm puede acceder a las consultas
    {
      "message": "Forbidden resource",
      "error": "Forbidden",
      "statusCode": 403
    }
  ```
   #### DELETE http://localhost:3000/api/contacto/id
-  **Descripción:** - Eliminar consulta por id
  ```json
    Body de la request: no requiere
    http://localhost:3000/api/contacto/4
    Response exitoso(200 ok)

    intento eliminar de nuevo el mismo id
    http://localhost:3000/api/contacto/id
    Response no exitoso(404 Not Found)
    {
      "message": "Consulta con id 4 no encontrado",
      "error": "Not Found",
      "statusCode": 404
    }
  ```
  #### PATCH http://localhost:3000/api/contacto/id
-  **Descripción:** - Editar consulta por id
  ```json
  Body de la request:
  http://localhost:3000/api/contacto/2
  {
    "nombre": "nombreEditado",
    "email": "nombre@gmail.comm",
    "consulta":"Quisiera saber el precio de los planes?"
  }
  Response exitoso(200 OK)
  {
    "id": 2,
    "nombre": "nombreEditado",
    "email": "nombre@gmail.comm",
    "consulta": "Quisiera saber el precio de los planes?",
    "fecha_creacion": "2025-11-27T16:18:24.037Z"
  }

  Response no exitoso(404 Not Found)
  http://localhost:3000/api/contacto/30
  {
    "message": "Consulta con id 30 no encontrado",
    "error": "Not Found",
    "statusCode": 404
  }
  ```
### 📋 Endpoints de Planilla de Salud
  #### GET http://localhost:3000/api/ficha-salud/
-  **Descripción:** - Obtener fichas de salud
  ```json
    Response exitoso(200 OK)
    [
  {
    "id_ficha": 2,
    "dni": 45445454,
    "fechaNacimiento": "1999-12-12",
    "direccion": "calle 5454 54545",
    "ciudad": "5454545454",
    "provincia": "5454544",
    "codigoPostal": 545454,
    "pais": "544545454",
    "sexo": "masculino",
    "clase": "presencial",
    "condicion": "no",
    "lesion": "",
    "medicacion": "no",
    "medicamento": "",
    "expEntrenando": "no",
    "objetivos": "123121231312",
    "fecha_creacion": "2025-11-25T23:21:37.017Z",
    "usuario": {
      "id_usuario": 5,
      "nombre": "ale",
      "apellido": "urbi",
      "email": "test_user_3489719233386436691@testuser.com",
      "telefono": "228454487",
      "password": "$2b$10$IJn8BzoKCdJyCPO4oVNpOOlcF54O5DYbMuh1wJ1qn4kpj/0jv9aWS",
      "rol": "usuario",
      "estado_pago": true,
      "aceptarEmails": false,
      "aceptarWpp": false,
      "aceptarTerminos": false
    }
  },
  {
    "id_ficha": 62,
    "dni": 2222222,
    "fechaNacimiento": "2222-02-22",
    "direccion": "2222222",
    "ciudad": "22222",
    "provincia": "222222",
    "codigoPostal": 2222,
    "pais": "222222",
    "sexo": "femenino",
    "clase": "mixto",
    "condicion": "no",
    "lesion": "",
    "medicacion": "no",
    "medicamento": "",
    "expEntrenando": "no",
    "objetivos": "222222222222222",
    "fecha_creacion": "2025-11-27T11:10:15.375Z",
    "usuario": {
      "id_usuario": 7,
      "nombre": "cuentaMercadopago",
      "apellido": "cuentaMercadopago",
      "email": "test_user_7309443945635814562@testuser.com",
      "telefono": "2284 454545",
      "password": "$2b$10$vCJGQ7Ou9gIt6QL16sG4D.VDFFBeNkC0KfHHcgGAHLNs4cw1n4LcG",
      "rol": "usuario",
      "estado_pago": true,
      "aceptarEmails": false,
      "aceptarWpp": false,
      "aceptarTerminos": false
    }
  },]
  ```
  #### POST http://localhost:3000/api/ficha-salud/
-  **Descripción:** - Crear ficha de salud
  ```json
    Body request valido:
    { 
    "dni": 3333333 ,
    "fechaNacimiento": "3333-03-03" ,
    "direccion" : "calle 1234",
    "ciudad": "ciudad falsa",
    "provincia": "provincia falsa" ,
    "codigoPostal": 3333,
    "pais": "pais falso" ,
    "sexo": "masculino",
    "clase": "presencial" ,
    "condicion": "no",
    "medicacion": "no",
    "expEntrenando": "no",
    "objetivos": "objetivo importante",
    "id_usuario": 14
  }
    Response exitoso(201 created)
      {
    "id_ficha": 64,
    "dni": 3333333,
    "fechaNacimiento": "3333-03-03",
    "direccion": "calle 1234",
    "ciudad": "ciudad falsa",
    "provincia": "provincia falsa",
    "codigoPostal": 3333,
    "pais": "pais falso",
    "sexo": "masculino",
    "clase": "presencial",
    "condicion": "no",
    "lesion": null,
    "medicacion": "no",
    "medicamento": null,
    "expEntrenando": "no",
    "objetivos": "objetivo importante",
    "fecha_creacion": "2025-11-30T11:12:30.811Z",
    "usuario": {
      "id_usuario": 14,
      "nombre": "nombre",
      "apellido": "apellido",
      "email": "testeo2@gmail.com",
      "telefono": "228454487",
      "password": "$2b$10$kDEEpDpDD5M/uSmIx8b.KONJAP0/WEZknLcBxTVtu98WythBOBB2S",
      "rol": "usuario",
      "estado_pago": false,
      "aceptarEmails": false,
      "aceptarWpp": false,
      "aceptarTerminos": true
    }
  }
  ```
  #### GET http://localhost:3000/api/ficha-salud/id
-  **Descripción:** - Obtener ficha de salud por id
  ```json
  http://localhost:3000/api/ficha-salud/64
  Response exitoso(200 OK)
      {
    "id_ficha": 64,
    "dni": 3333333,
    "fechaNacimiento": "3333-03-03",
    "direccion": "calle 1234",
    "ciudad": "ciudad falsa",
    "provincia": "provincia falsa",
    "codigoPostal": 3333,
    "pais": "pais falso",
    "sexo": "masculino",
    "clase": "presencial",
    "condicion": "no",
    "lesion": null,
    "medicacion": "no",
    "medicamento": null,
    "expEntrenando": "no",
    "objetivos": "objetivo importante",
    "fecha_creacion": "2025-11-30T11:12:30.811Z",
    "usuario": {
      "id_usuario": 14,
      "nombre": "nombre",
      "apellido": "apellido",
      "email": "testeo2@gmail.com",
      "telefono": "228454487",
      "password": "$2b$10$kDEEpDpDD5M/uSmIx8b.KONJAP0/WEZknLcBxTVtu98WythBOBB2S",
      "rol": "usuario",
      "estado_pago": false,
      "aceptarEmails": false,
      "aceptarWpp": false,
      "aceptarTerminos": true
    }
  }

  http://localhost:3000/api/ficha-salud/67
  Response no exitoso(404 Not Found)
    {
    "message": "Ficha con id 67 no encontrada",
    "error": "Not Found",
    "statusCode": 404
  }
  ```
   #### PATCH http://localhost:3000/api/ficha-salud/id
-  **Descripción:** - Editar la ficha de salud
  ```json
    Body request valido:
    http://localhost:3000/api/ficha-salud/64
      { 
    "dni": 111111111 ,
    "fechaNacimiento": "3333-03-03" ,
    "direccion" : "aaaaaaaaaa",
    "ciudad": "aaaaaaa",
    "provincia": "aaaaaaa" ,
    "codigoPostal": 3333,
    "pais": "aaaaaaaaaa" ,
    "sexo": "masculino",
    "clase": "presencial" ,
    "condicion": "no",
    "medicacion": "no",
    "expEntrenando": "no",
    "objetivos": "aaaaaaaaaaaaa",
    "id_usuario": 14
    }
    Response exitoso(200 OK)
    {
    "id_ficha": 64,
    "dni": 111111111,
    "fechaNacimiento": "3333-03-03",
    "direccion": "aaaaaaaaaa",
    "ciudad": "aaaaaaa",
    "provincia": "aaaaaaa",
    "codigoPostal": 3333,
    "pais": "aaaaaaaaaa",
    "sexo": "masculino",
    "clase": "presencial",
    "condicion": "no",
    "lesion": null,
    "medicacion": "no",
    "medicamento": null,
    "expEntrenando": "no",
    "objetivos": "aaaaaaaaaaaaa",
    "fecha_creacion": "2025-11-30T11:12:30.811Z",
    "usuario": {
      "id_usuario": 14,
      "nombre": "ale",
      "apellido": "urbi2",
      "email": "testeo2@gmail.com",
      "telefono": "228454487",
      "password": "$2b$10$kDEEpDpDD5M/uSmIx8b.KONJAP0/WEZknLcBxTVtu98WythBOBB2S",
      "rol": "usuario",
      "estado_pago": false,
      "aceptarEmails": false,
      "aceptarWpp": false,
      "aceptarTerminos": true
    }
  }

  Response invalido(404 Not Found)
  http://localhost:3000/api/ficha-salud/100
    {
    "message": "Ficha con id 100 no encontrada",
    "error": "Not Found",
    "statusCode": 404
  }
  ```
 #### DELETE http://localhost:3000/api/ficha-salud/id
-  **Descripción:** - Eliminar la ficha de salud
  ```json
    http://localhost:3000/api/ficha-salud/64
    Response exitoso(200 OK)

    http://localhost:3000/api/ficha-salud/2300
    Response no exitoso(404 Not Found)
      {
      "message": "Ficha con id 2300 no encontrada",
      "error": "Not Found",
      "statusCode": 404
    }
  ```
  ### 💳 Endpoints de Suscripciones
  #### POST http://localhost:3000/api/suscripciones/
-  **Descripción:** - Crear suscripcion
  ```json
  Body request valido:
    {
    "id_usuario": 4,
    "id_plan": 2,
    "mesesContratados": 1
  }
  Response exitoso(201 Created)
    {
    "id": "9174fff6425f46ffbeb192c863648da2",
    "init_point": "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_id=9174fff6425f46ffbeb192c863648da2"
  }
  ```
   #### DELETE http://localhost:3000/api/suscripciones/preapprovalId
-  **Descripción:** - el metodo precisa el preapprovalId que otorga mercado pago al crear la suscripcion, para cancelar la suscripcion y luego la elimina al finalizar el mes de suscripcion 
  ```json
    Response exitoso(200 OK)
  ```

  #### PUT http://localhost:3000/api/suscripciones/id_usuario/plan/:id_plan
-  **Descripción:** - cambia el plan por el que elija el usuario 
  ```json
    http://localhost:3000/api/suscripciones/4/plan/3
    El 4 es el id del usuario al cual pertenece la suscripcion, y el 3 es el id del plan al cual quiere cambiarse
    Body request: 
    {
      "mesesContratados": 1
    }
    Response exitoso(200 OK)
    {
      "message": "Plan cambiado correctamente",
      "init_point": "https://www.mercadopago.com.ar/subscriptions/checkout? preapproval_id=0b485d2af8f8461c8508a010249aa793",
      "preapprovalId": "0b485d2af8f8461c8508a010249aa793"
    }
  ```
  ### 💪 Endpoints de Ejercicios
  #### GET http://localhost:3000/api/ejercicios/
-  **Descripción:** - Obtener los ejercicios
  ```json
    Response exitoso(200 OK)
    [
  {
    "id_ejercicio": 1,
    "nombre": "Sentadilla",
    "detalle": "Ejercicio compuesto para piernas que trabaja cuádriceps, glúteos y core.",
    "tipo": "Fuerza",
    "grupo_muscular": "Piernas",
    "img_url": "imagen.jpg",
    "video_url": "video.mp4"
  },
  {
    "id_ejercicio": 2,
    "nombre": "Press de banca",
    "detalle": "Movimiento para desarrollar el pectoral mayor, tríceps y deltoides.",
    "tipo": "Fuerza",
    "grupo_muscular": "Pecho",
    "img_url": "imagen.jpg",
    "video_url": "video.mp4"
  },]
  ```
 #### POST http://localhost:3000/api/ejercicios/
-  **Descripción:** - Crear ejercicios
  ```json
    Body request valido:
    {
      "nombre": "Press de banca",
      "detalle": "Ejercicio de fuerza para trabajar el pecho, tríceps y hombros. Se realiza acostado en un banco empujando la barra hacia arriba.",
      "tipo": "Fuerza",
      "grupo_muscular": "Pectorales",
      "img_url": "ejemplo.png",
      "video_url": "ejemplo.mp4"
    }
    Response exitoso(201 Created)
    {
      "id_ejercicio": 11,
      "nombre": "Press de banca",
      "detalle": "Ejercicio de fuerza para trabajar el pecho, tríceps y hombros. Se realiza acostado en un banco empujando la barra hacia arriba.",
      "tipo": "Fuerza",
      "grupo_muscular": "Pectorales",
      "img_url": "ejemplo.png",
      "video_url": "ejemplo.mp4"
    }
  ```
   #### GET http://localhost:3000/api/ejercicios/id
-  **Descripción:** - Obtener los ejercicios por id
  ```json
  http://localhost:3000/api/ejercicio/1
  Response exitoso(200 OK)
    {
      "id_ejercicio": 1,
      "nombre": "Sentadilla",
      "detalle": "Ejercicio compuesto para piernas que trabaja cuádriceps, glúteos y core.",
      "tipo": "Fuerza",
      "grupo_muscular": "Piernas",
      "img_url": "imagen.jpg",
      "video_url": "video.mp4"
    }
    http://localhost:3000/api/ejercicio/2000
    Response no exitoso(404 Not Found)
    {
      "message": "Ejercicio con id 2000 no encontrado",
      "error": "Not Found",
      "statusCode": 404
    }
  ```
  #### DELETE http://localhost:3000/api/ejercicios/id
-  **Descripción:** - Eliminar los ejercicios por id
  ```json
  http://localhost:3000/api/ejercicio/14
  Response exitoso(200 OK)

  http://localhost:3000/api/ejercicio/14
  intentamos eliminar el mismo ejercicio de nuevo
  Response no exitoso(404 Not Found)
  ```
  #### PATCH http://localhost:3000/api/ejercicios/id
-  **Descripción:** - Editar los ejercicios por id
  ```json
  Body request valido: http://localhost:3000/api/ejercicio/13
   {
    "nombre": "Press de banca",
    "detalle": "Ejercicio de fuerza para trabajar el pecho, tríceps y hombros. Se realiza acostado en un banco empujando la barra hacia arriba.",
    "tipo": "Fuerza",
    "grupo_muscular": "Pectorales",
    "img_url": "ejemplo.png",
    "video_url": "videoCambiado.mp4"
  }
  Response exitoso(200 OK)
    {
      "id_ejercicio": 13,
      "nombre": "Press de banca",
      "detalle": "Ejercicio de fuerza para trabajar el pecho, tríceps y hombros. Se realiza acostado en un banco empujando la barra hacia arriba.",
      "tipo": "Fuerza",
      "grupo_muscular": "Pectorales",
      "img_url": "ejemplo.png",
      "video_url": "videoCambiado.mp4"
    }

    Response no exitoso(404 Not Found):
    http://localhost:3000/api/ejercicio/200
    {
      "message": "Ejercicio con id 200 no encontrado",
      "error": "Not Found",
      "statusCode": 404
    }
  ```
   ### 💰  Endpoints de Venta
  #### POST http://localhost:3000/api/venta/
-  **Descripción:** - crear  ventas
  ```json
  Body request valido: 
  {
    "id_usuario": 14
  }
  Response exitoso(201 Created)
  {
    "id_venta": 1,
    "usuario": {
      "id_usuario": 14,
      "nombre": "ale",
      "apellido": "urbi2",
      "email": "testeo2@gmail.com",
      "telefono": "228454487",
      "password": "$2b$10$kDEEpDpDD5M/uSmIx8b.KONJAP0/WEZknLcBxTVtu98WythBOBB2S",
      "rol": "usuario",
      "estado_pago": false,
      "aceptarEmails": false,
      "aceptarWpp": false,
      "aceptarTerminos": true
    },
    "fecha_creacion": "2025-11-30T11:59:58.313Z"
  }

  Body request no valido:
  id_usuario no existe:
  {
    "id_usuario": 20
  }
  Response no exitoso(400 Bad Request)
  {
    "statusCode": 400,
    "message": "Error al crear la venta"
  }
  ```
  #### GET http://localhost:3000/api/venta/
-  **Descripción:** - Obtener las  ventas
  ```json
    [
    {
        "id_venta": 1,
        "usuario": {
          "id_usuario": 14,
          "nombre": "ale",
          "apellido": "urbi2",
          "email": "testeo2@gmail.com",
          "telefono": "228454487",
          "password": "$2b$10$kDEEpDpDD5M/uSmIx8b.KONJAP0/WEZknLcBxTVtu98WythBOBB2S",
          "rol": "usuario",
          "estado_pago": false,
          "aceptarEmails": false,
          "aceptarWpp": false,
          "aceptarTerminos": true
        },
        "fecha_creacion": "2025-11-30T11:59:58.313Z"
      }
    ]
  ```
  #### GET http://localhost:3000/api/venta/id
-  **Descripción:** - Obtener las  ventas por id
  ```json
    Response exitoso(200 OK)
    http://localhost:3000/api/venta/1
    {
      "id_venta": 1,
      "usuario": {
        "id_usuario": 14,
        "nombre": "ale",
        "apellido": "urbi2",
        "email": "testeo2@gmail.com",
        "telefono": "228454487",
        "password": "$2b$10$kDEEpDpDD5M/uSmIx8b.KONJAP0/WEZknLcBxTVtu98WythBOBB2S",
        "rol": "usuario",
        "estado_pago": false,
        "aceptarEmails": false,
        "aceptarWpp": false,
        "aceptarTerminos": true
      },
      "fecha_creacion": "2025-11-30T11:59:58.313Z"
    }
    Response no exitoso(404 Not Found)
    http://localhost:3000/api/venta/2000
    {
      "message": "Venta con id 2000 no encontrada",
      "error": "Not Found",
      "statusCode": 404
    }
  ```
   #### DELETE http://localhost:3000/api/venta/id
-  **Descripción:** - eliminar las  ventas por id
  ```json
  http://localhost:3000/api/venta/1
  Response exitoso(200 OK)

  http://localhost:3000/api/venta/1
  intentamos eliminar la misma venta
  Response no exitoso(404 Not Found)
  {
    "message": "Venta con id 1 no encontrada",
    "error": "Not Found",
    "statusCode": 404
  }
  ```
  ### 🧾 Endpoints de detalle-venta
  #### POST http://localhost:3000/api/detalle-venta/
-  **Descripción:** - crear  detalle-venta
  ```json
  Body request valido: 
  {
    "cantidad": 2,
    "subtotal": 20000,
    "id_venta": 2,
    "id_producto": 8
  }
  Response exitoso(201 Created)
  {
    "id_detalleVenta": 1,
    "venta": {
      "id_venta": 2,
      "fecha_creacion": "2025-11-30T12:08:34.369Z"
    },
    "producto": {
      "id_producto": 8,
      "nombre": "Aminoacido ENA",
      "descripcion": "Perfecto para aquellos que quieren entrenar más fuerte y recuperarse más rápido",
      "imagen": "https://i.imgur.com/XURonql.png",
      "precio": 22000,
      "stock": 0,
      "categoria": "suplemento",
      "fecha_creacion": "2025-11-26T07:47:23.833Z"
    },
    "cantidad": 2,
    "subtotal": 44000,
    "fecha_creacion": "2025-11-30T12:11:34.193Z"
  }
  Body request no valido:
  {
    "cantidad": 2,
    "subtotal": 20000,
    "id_venta": 2,
    "id_producto": 10
  }
  no existe el producto con id 10
  Response no exitoso(400 Bad Request)
  {
    "statusCode": 400,
    "message": "Error al crear la venta"
  }
  ```
  #### GET http://localhost:3000/api/detalle-venta/
-  **Descripción:** - obtener todos los  detalle-venta
  ```json
    Response exitoso(200 OK)
    [
      {
        "id_detalleVenta": 1,
        "venta": {
          "id_venta": 2,
          "fecha_creacion": "2025-11-30T12:08:34.369Z"
        },
        "producto": {
          "id_producto": 8,
          "nombre": "Aminoacido ENA",
          "descripcion": "Perfecto para aquellos que quieren entrenar más fuerte y recuperarse más rápido",
          "imagen": "https://i.imgur.com/XURonql.png",
          "precio": 22000,
          "stock": 0,
          "categoria": "suplemento",
          "fecha_creacion": "2025-11-26T07:47:23.833Z"
        },
        "cantidad": 2,
        "subtotal": 44000,
        "fecha_creacion": "2025-11-30T12:11:34.193Z"
      }
    ]
  ```
  #### GET http://localhost:3000/api/detalle-venta/id
-  **Descripción:** - obtener los  detalle-venta por id
  ```json
  http://localhost:3000/api/detalle-venta/1
  Response exitoso(200 OK)
      {
      "id_detalleVenta": 1,
      "venta": {
        "id_venta": 2,
        "fecha_creacion": "2025-11-30T12:08:34.369Z"
      },
      "producto": {
        "id_producto": 8,
        "nombre": "Aminoacido ENA",
        "descripcion": "Perfecto para aquellos que quieren entrenar más fuerte y recuperarse más rápido",
        "imagen": "https://i.imgur.com/XURonql.png",
        "precio": 22000,
        "stock": 0,
        "categoria": "suplemento",
        "fecha_creacion": "2025-11-26T07:47:23.833Z"
      },
      "cantidad": 2,
      "subtotal": 44000,
      "fecha_creacion": "2025-11-30T12:11:34.193Z"
    }

    http://localhost:3000/api/detalle-venta/12
    Response no exitoso(404 Not Found)
    {
      "message": "Venta con id 12 no encontrada",
      "error": "Not Found",
      "statusCode": 404
    }
  ```
  #### DELETE http://localhost:3000/api/detalle-venta/id
-  **Descripción:** - Eliminar los  detalle-venta por id
  ```json
    http://localhost:3000/api/detalle-venta/1
    Response exitoso(200 OK)

    Intentamos eliminar el mismo detalle-venta
    http://localhost:3000/api/detalle-venta/1
    Response no exitoso(404 Not Found)
    {
      "message": "Venta con id 1 no encontrada",
      "error": "Not Found",
      "statusCode": 404
    }
  ```
  ### 🧾 Endpoints de rutina
  #### GET http://localhost:3000/api/rutina/
-  **Descripción:** - Obtener  rutinas
  ```json
  Response exitoso(200 OK)
  [
    {
      "id_rutina": 4,
      "nombre": "rutina nombre",
      "descripcion": "rutina para nombre",
      "nivel": "principiante",
      "categoria": null,
      "tipo_rutina": "cliente",
      "usuario": {
        "id_usuario": 4,
        "nombre": "nombre",
        "apellido": "apellido",
        "email": "test_user_1952556751749126821@testuser.com",
        "telefono": "228454487",
        "password": "$2b$10$aKbXATaeTA7L5oxAvG0T2.dmp7PI/xkVuKSXvaIy/McOPcuwjPP8m",
        "rol": "usuario",
        "estado_pago": true,
        "aceptarEmails": false,
        "aceptarWpp": false,
        "aceptarTerminos": false
      }
    }
  ]
  ```
 #### POST http://localhost:3000/api/rutina/
-  **Descripción:** - crear  rutina
  ```json
    Body request:
    {
      "id_rutina": 101,
      "nombre": "Rutina Full Body",
      "descripcion": "Entrenamiento completo que trabaja todos los grupos musculares principales en una sola sesión.",
      "nivel": "intermedio",
      "id_usuario": 14,
      "tipo_rutina": "cliente"
    }
    Response exitoso(201 Created)
    {
      "id_rutina": 5,
      "nombre": "Rutina Full Body",
      "descripcion": "Entrenamiento completo que trabaja todos los grupos musculares principales en una sola sesión.",
      "nivel": "intermedio",
      "categoria": null,
      "tipo_rutina": "cliente",
      "usuario": {
        "id_usuario": 14,
        "nombre": "nombre",
        "apellido": "nombre",
        "email": "testeo2@gmail.com",
        "telefono": "228454487",
        "password": "$2b$10$kDEEpDpDD5M/uSmIx8b.KONJAP0/WEZknLcBxTVtu98WythBOBB2S",
        "rol": "usuario",
        "estado_pago": false,
        "aceptarEmails": false,
        "aceptarWpp": false,
        "aceptarTerminos": true
      }
    }
  ```
   #### GET http://localhost:3000/api/rutina/id
-  **Descripción:** - Obtener  rutinas por id
  ```json
  http://localhost:3000/api/rutina/5
  Response exitoso(200 OK)
    {
      "id_rutina": 5,
      "nombre": "Rutina Full Body",
      "descripcion": "Entrenamiento completo que trabaja todos los grupos musculares principales en una sola sesión.",
      "nivel": "intermedio",
      "categoria": null,
      "tipo_rutina": "cliente",
      "usuario": {
        "id_usuario": 14,
        "nombre": "ale",
        "apellido": "urbi2",
        "email": "testeo2@gmail.com",
        "telefono": "228454487",
        "password": "$2b$10$kDEEpDpDD5M/uSmIx8b.KONJAP0/WEZknLcBxTVtu98WythBOBB2S",
        "rol": "usuario",
        "estado_pago": false,
        "aceptarEmails": false,
        "aceptarWpp": false,
        "aceptarTerminos": true
      },
      "semanas": []
    }
    Response no exito(404 Not Found)
    http://localhost:3000/api/rutina/54
    {
      "message": "Rutina no encontrada.",
      "error": "Not Found",
      "statusCode": 404
    }
  ```
---
## 📅 Estado del proyecto
- En desarrollo  
- Fecha estimada de lanzamiento: **12/12/2025**  

---

👨‍💻 Autor
- Proyecto desarrollado por Grupo 8.
- Framework base: NestJS
- Licencia: MIT

---
