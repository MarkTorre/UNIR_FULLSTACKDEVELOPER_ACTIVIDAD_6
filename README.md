# UNIR_FULLSTACKDEVELOPER_ACTIVIDAD_6
Módulo 3. Framework de Front End Angular - Actividad 6: Aplicación consultando a API Externa

## 1. Creación del proyecto
Comando para crear un proyecto en Angular:
```bash
ng new UserProfile
```

## 1.1 Diseño Arquitectura Proyecto
Hantes de empezar con las distintas practicas del proyecto he hecho un diseño de la arquitectura del proyecto. Se han identificado:
    
* Diseño de Componentes: 
    * Componentes relacionados padre/hijo
    * Componentes no relacionados
* Identificación de entradas y salidas de datos entre    componentes relacionados(@Inputs y @Outputs).
* Identificación de entrada y salida de datos entre    componentes no relacionados(@Injectable).
* Diseño del Servicio para la comunicación entre los componentes no relacionados
* Diseño del Servicio para la peticiones a una API.
* Diseño de interfaz de datos.
* Diseño del sistema de rutas para cada componente
* Diseño del Formulario y Validaciones

![alt text](ArquitectureDesign.jpg)

## 2. Creación de rutas y componentes.

## 2.1 Rutas
Se han definido las siguientes rutas:

**/home:** donde ser cargará el listado de usuarios completo.

**/user/1:** donde ser cargará la vista de usuario con todos sus datos. Nótese que el numero de la ruta corresponde al id del usuario.

**/newuser:** donde ser cargará un formulario que dará de alta un usuario siguiendo el patron del api de creater user.

**/updateuser/1:** se cargará reutilizando el formulario de registro los datos del usuario a actualizar para que se pueda actualizar los datos y mandárselos al api.

## 2.2 Componentes.
He definido hasta 4 tipos de componentes teniendo en cuenta la aplicación principal.

Componentes:

* CP1 -> **App**
* CP2 -> **Caption**
* CP3 -> **Profile**
* CP4 -> **Formulary**

Estos se han creado mediante los siguientes comandos:

```bash
ng generate component components/caption --skip-tests
ng generate component components/profile --skip-tests
ng generate component components/formulary --skip-tests
```


