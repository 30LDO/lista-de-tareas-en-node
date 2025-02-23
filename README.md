# Aplicación de tareas utilizando módulos de terceros en Node.js

## Objetivo
Instalar, importar y utilizar paquetes NPM, trabajar con archivos y la interacción del usuario mediante la realización de una aplicación de node.js que permita almacenar, eliminar, listar y completar tareas.

## Funcionamiento
Al iniciar la aplicación, el usuario se encontrará con la lista actual de tareas. Si no hay tareas, el usuario verá un mensaje que indica que no hay tareas en la lista. Además, podrá ver el menú principal con 4 opciones (agregar, marcar, eliminar, salir). Para moverse en este menú interactivo, basta con utilizar las teclas de flecha de su computadora y al presionar la tecla Enter, se accederá a la función escogida. Al escoger la opción, el sistema evaluará la selección con un menú switch que estará ejecutándose infinitamente. De acuerdo a la selección, se ejecutará la función respectiva. Si el usuario escoge salir, el programa se cerrará.

Para esta aplicación se utilizaron los módulos Prompts para leer las entradas de usuario, Chalk para el diseño de la interfaz de usuario y FS para la escritura y lectura del archivo data.json.

### Función Listar()
Esta función lee el archivo data.json, el cual puede estar vacío o contener la lista de tareas en formato json. Luego de obtener la lista la muestra en pantalla en el menú principal de la aplicación, si no hay nada en la lista, muestra un mensaje que indica que la lista está vacía.

### Función Agregar()
Esta función le pide al usuario que ingrese el nombre de la nueva tarea, después de escribirlo, el usuario presiona enter y la aplicación le preguntará al usuario si desea descartar o guardar los cambios. Si el usuario guarda los cambios, se crea un objeto con el nombre de la tarea, este se agrega a un arreglo de objetos donde cada objeto es una tarea, luego se convierte a una cadena json y se almacena en el archivo data.json.

### Función Marcar()
Al escoger esta función, el usuario verá la lista de tareas actuales como un menú interactivo. Utilizando las teclas de flecha del ordenador, puede escoger la tarea a marcar. Luego de escogerla presionando la tecla Enter, puede elegir si marcarla como "Completada" o "No Completada". Después de guardar los cambios, el programa cambiará el estado del objeto Tarea de acuerdo a lo que haya escogido el usuario.


### Función Eliminar()
Al escoger esta función, el usuario verá la lista de tareas actuales como un menú interactivo. Utilizando las teclas de flecha del ordenador, puede escoger la tarea a eliminar. Luego de escogerla presionando la tecla Enter, puede elegir si desea continuar con la eliminación o descartar los cambios. Si la eliminación es confirmada, la tarea será quitada de la lista de tareas y luego se actualizará el archivo data.json sin la tarea eliminada.


## Ejecución

1.  Tener Node.js instalado.
2.  Descargar la aplicacion del repositorio github.com/30LDO/lista-de-tareas-en-node.
3.  Abrir la consola del sistema en su computadora.
4.  Navegar a la dirección donde está localizado el archivo index.js del repositorio.
5.  Ejecutar el comando npm install para instalar todas las dependencias necesarias.
6.  A partir de acá se puede inicializar la aplicación con el comando node index.js.
7.  Si se desea inicializar de manera global, se puede ejecutar el comando npm install -g.
8.  En caso de tener un error, ejecutar este comando desde una terminal con permisos de administrador.
9.  Luego de esto, se puede ejecutar la aplicación con el comando "lista-de-tareas" desde cualquier ubicación en la terminal.
10. Al inicializar la aplicación con cualquiera de estos dos métodos, la aplicación se ejecuta y el usuario puede interactuar libremente en ella.
11. Escoger la opción "Salir" para cerrar el programa.
