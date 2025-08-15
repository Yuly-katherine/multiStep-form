# 📋 Formulario Multi-Pasos con Vue 3 + TypeScript

Este proyecto es un formulario de tres pasos desarrollado con **Vue 3**, **TypeScript**, **Yup** y **Tailwind CSS**.  
El usuario debe completar todos los campos requeridos en cada paso antes de poder avanzar.  
Al finalizar y enviar el formulario, se muestra un modal de confirmación indicando que los datos fueron enviados exitosamente.

---

## 🚀 Características

- **Formulario de 3 pasos** con navegación entre pasos (avanzar/retroceder).
- **Validación en tiempo real** usando [Yup].
- **Estilos modernos** con [Tailwind CSS].
- **Modal de confirmación** al enviar los datos.
- **Tipado estricto** gracias a TypeScript.
- Arquitectura modular para fácil mantenimiento y escalabilidad.

---

## 🧱 Estructura del Proyecto

El proyecto está dividido en componentes reutilizables y una lógica clara centralizada en el componente padre. Esto mejora la escalabilidad, el mantenimiento y la legibilidad del código.

### Vistas principales

- **MultiStepForm**: Vista paso 1 del formulario.


### Componentes reutilizables

- `FileUploadField.vue`: componente para cargar imagenes en formato JPG.
- `FormField.vue`: Campo de formulario reutilizable, input tipo texto o selector.
- `PasswordField.vue`:  Campo de contraseña con ocultar/mostrar.
- `SuccessModal.vue`: Modal para indicar al usuario que sus datos fueron ingresados con éxito.
- `Timeline.vue`: Línea de tiempo para indicar el paso actual.

---

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone  https://github.com/Yuly-katherine/multiStep-form.git

```

2. Instala dependencias:
```bash
npm install

```

3. Ejecuta la app en modo desarrollo:
```bash
npm run dev

```

##  ¡¡A probar!!


## ✨ Autor

Desarrollado por Yuly Katherine Gómez 