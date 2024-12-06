# **Entrega Experiencia 3**

**Autor**: Cristian Gonzalez y Felipe Carrillo

---

## **1. Requisitos para instalar**

1. **Node.js**: Versión 20  
   [Descargar Node.js](https://nodejs.org/)
2. **Angular**: Versión 18  
   [Documentación de Angular](https://angular.io/docs)
3. **Ionic Framework**: Versión 7.2  
   [Instalar Ionic](https://ionicframework.com/docs/intro/cli)

---

## **2. Pasos para crear el proyecto Ionic**

1. **Abre una terminal y ejecuta el siguiente comando:**
   ionic start MyApp
   
2. **Durante la configuración, selecciona las siguientes opciones:**
ngmodule
 -Framework: Angular
 -Template: Blank
 -Una vez creado el proyecto, reemplaza la carpeta src con la carpeta proporcionada en esta entrega.

---

## **3.dependencias QR**
1. **Instalar dependencias necesarias**
Instala el paquete para la captura de QR:
npm install @zxing/browser

2. **Instala el generador de códigos QR:**
npm install angularx-qrcode

---

## **4 Ejecutar en Android Studio**
1. **Instala Capacitor para Android:**
npm install @capacitor/android

2. **Agrega soporte para Android:**
npx cap add android

3. **Construye el proyecto:**
ionic build

4. **Sincroniza los cambios con Capacitor:**
ionic capacitor sync android
ionic capacitor copy android
Abre el proyecto en Android Studio:
ionic capacitor open android

---

## **4.Uso del JSON alojado QR**
**El proyecto utiliza un archivo JSON alojado en la siguiente URL:**
https://repodata-rqrl.onrender.com

---

## **Notas importantes**
**Puedes reinstalar las dependencias del proyecto con el siguiente comando:**
npm install




