# SWAM Web

Portal web para la consulta de calificaciones desarrollado como complemento del sistema **SWAM (Sistema para la Gestión y Administración Académica)**.

---

## Descripción

SWAM Web es una aplicación web desarrollada como parte del proyecto académico **SWAM**, con el propósito de ofrecer a los estudiantes una plataforma sencilla desde la cual puedan consultar sus calificaciones e información académica.

El portal fue desarrollado utilizando tecnologías web estándar (**HTML5, CSS3 y JavaScript**) y está diseñado para funcionar en cualquier navegador moderno.

---

## Objetivos

* Facilitar el acceso de los estudiantes a sus calificaciones.
* Proporcionar una interfaz web intuitiva y fácil de utilizar.
* Complementar el sistema administrativo desarrollado en Visual Basic .NET.
* Aplicar conocimientos de desarrollo web frontend.

---

## Características

* Interfaz web responsiva.
* Consulta de calificaciones.
* Consulta de información académica.
* Diseño ligero y de fácil navegación.
* Compatible con los principales navegadores web.

---

## Tecnologías Utilizadas

| Tecnología | Uso                        |
| ---------- | -------------------------- |
| HTML5      | Estructura del sitio web   |
| CSS3       | Diseño y estilos           |
| JavaScript | Interactividad del sistema |

---

## Arquitectura Prevista

SWAM Web fue concebido como el portal de consulta para estudiantes dentro del ecosistema SWAM.

La arquitectura original contemplaba que el portal se conectara a la misma base de datos **Microsoft SQL Server** hospedada en **Somee** utilizada por la aplicación de escritorio. Bajo este esquema, las calificaciones registradas por el personal administrativo estarían disponibles automáticamente para su consulta desde cualquier navegador web.

Con esta integración, ambas aplicaciones compartirían una única fuente de información, garantizando la consistencia de los datos entre el sistema administrativo y el portal de estudiantes.

---

## Estado Actual

La versión disponible en este repositorio corresponde a un prototipo funcional desarrollado con fines académicos.

Para demostrar el funcionamiento de la interfaz y la experiencia de usuario, el portal utiliza información local simulada en lugar de una conexión directa con la base de datos remota.

La integración con **Microsoft SQL Server** sobre **Somee** fue considerada durante el diseño del sistema, pero no formó parte del alcance final del proyecto y actualmente no existen planes para implementarla.

---

## Estructura del Proyecto

```text
SWAM-Web
│
├── index.html
├── styles.css
├── script.js
├── logo.png
└── logo1.png
```

---

## Instalación

No requiere instalación.

1. Clonar el repositorio.

```bash
git clone https://github.com/CaboxCraft85/SWAM-Web.git
```

2. Abrir el archivo `index.html` en cualquier navegador web moderno.

---

## Relación con SWAM

Este proyecto corresponde al portal web del sistema **SWAM**.

Mientras que la aplicación de escritorio permite la administración de la información académica por parte del personal autorizado, SWAM Web fue diseñado para ofrecer a los estudiantes un medio de consulta de sus calificaciones utilizando la misma base de datos del sistema principal.

---

## Estado del Proyecto

Proyecto académico finalizado como parte de una asignación del **Politécnico Máximo Gómez**.

---

## Créditos

**Desarrolladores**

* William
* Adancel
* Marcos
* Saul

**Institución**

Politécnico Máximo Gómez

---

## Licencia

Este proyecto fue desarrollado con fines exclusivamente académicos y educativos como parte de una asignación del Politécnico Máximo Gómez.

El código fuente se comparte únicamente con fines de aprendizaje y como parte del portafolio de sus autores.
