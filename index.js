#!/usr/bin/env node

import chalk from "chalk";
import prompts from 'prompts'
import fs from 'fs';


const orange = chalk.hex('#FFA500');


function titulo(){
  console.log(chalk.cyanBright("***** Lista de Tareas ***** \n\n") )
}


const delay = (sec) => {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
};


const confirmar = async (confirmacion) =>{
  const menu = await prompts({
    type: 'select',
    name: 'choice',
    message: confirmacion,
    choices: [
      { title: 'Cancelar', value: '1' },
      { title: 'Confirmar', value: '2' }
    ]
  });
  return menu.choice;
};


async function eliminar(){
  console.clear();
  titulo();
  const lista = leer();
  if (lista.length == 0)
    return;
  const menu = await prompts({
    type: 'select',
    name: 'choice',
    message: `${orange("Elija la tarea a eliminar")}\n\n`,
    choices: lista
  });
  console.log("\n\n\n");
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].value == menu.choice) {
      console.clear();
      titulo();
      let confirmacion = await confirmar(`${orange(`¿Desea eliminar ${chalk.yellowBright(lista[i].nombre)}?`)}`);
      if (confirmacion == 1){
        console.log(`\n\n${chalk.red("Operación cancelada")}`)
        await delay(2);
      }else{
        console.log(`\n\n${chalk.red(`Tarea eliminada`)}`)
        lista.splice(i,1)
        actualizar(lista);
        await delay(2);
      }
      break;
    }
  }
};


async function marcar (){
  console.clear();
  titulo();
  let confirmacion;
  const lista = leer();
  if (lista.length == 0)
    return;
  const menu = await prompts({
    type: 'select',
    name: 'choice',
    message: `${orange("Elija una tarea\n")}`,
    choices: lista
  });
  console.log("\n\n\n");
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].value == menu.choice) {
      console.clear();
      titulo();
      if(lista[i].completada == false){
        confirmacion = await confirmar(`${orange(`¿Desea marcar ${chalk.yellowBright(lista[i].nombre)} como ${chalk.green("Completada")}?`)}`);
      }else{
        confirmacion = await confirmar(`${orange(`¿Desea marcar ${chalk.yellowBright(lista[i].nombre)} como ${chalk.red("No Completada")}?`)}`);
      }
      if (confirmacion == 1){
        console.log(`\n\n${chalk.red("Operación cancelada")}`)
        await delay(2);
      }else{
        if (lista[i].completada == false) {
          lista[i].completada = true;
          console.log(`\n\nSe marcó ${chalk.yellowBright(lista[i].nombre)} como ${chalk.green("Completada")}`)
          actualizar(lista);
          await delay(2);
        } else {
          lista[i].completada = false;
          console.log(`\n\nSe marcó ${chalk.yellowBright(lista[i].nombre)} como ${chalk.red("No Completada")}`)
          actualizar(lista);
          await delay(2);
        }
      }
      break;
    }
  }
};


const indexar = (lista) =>{
  for (let i = 0; i < lista.length; i++) {
    lista[i].title = lista[i].nombre;
    lista[i].value = i; 
  }
  return lista;
};


const leer = () => {
  const tareas = fs.readFileSync('data.json', 'utf-8');
  if (tareas.length == 0) {
    const lista = [];
    return lista;
  }else{
    const lista = JSON.parse(tareas);
    return indexar(lista);
  }
};


const listar = () => {
  const lista = leer();
  if (lista.length == 0) 
    console.log(chalk.red("\nNo hay tareas"));
  else{
    console.log(`${chalk.magenta("Tarea")} \x1B[40C ${chalk.magenta("Estado")}\n`);
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].completada == false) 
        console.log(`${chalk.yellowBright(lista[i].nombre)} \x1B[${45 -lista[i].nombre.length}C ${chalk.red("No Completada")}`)
      else
        console.log(`${chalk.yellowBright(lista[i].nombre)} \x1B[${45 -lista[i].nombre.length}C ${chalk.green("Completada")}`)
    }
    // console.log(lista);
  }
  console.log("\n")
};


const actualizar = (lista) =>{
  const tareas = JSON.stringify(lista);
  fs.writeFileSync('data.json', tareas);
}


async function agregar (){
  console.clear();
  titulo();
  const lista = leer();
  const nueva = await prompts({
    type: 'text',
    name: 'tarea',
    message: `${orange("Ingrese el nombre de la tarea")}\n\n`,
  });
  const tarea = {
    nombre: nueva.tarea,
    completada: false,
  };
  lista.push(tarea);
  actualizar(lista);
  console.log(`${chalk.green(`\n\nTarea ingresada`)}`);
  await delay(2);
};


async function inicio(){  
  let salir = false;
  while (!salir) {
    console.clear();
    titulo();
    listar();
    console.log("\n")
    const menu = await prompts({
      type: 'select',
      name: 'choice',
      message: `${orange("Elija una opción")}`,
      choices: [
        { title: 'Agregar', value: '1' },
        { title: 'Marcar', value: '2' },
        { title: 'Eliminar', value: '3' },
        { title: 'Salir', value: '4' }
      ],
    });
    switch (menu.choice) {
      case '1':
        await agregar();
        break;
      case '2':
        await marcar();
        break;
      case '3':
        await eliminar();
        break;
      case '4':
        salir = true;
        console.clear();
        break;
      default:
        console.log('Opcion invalida');
    }
  }
}

inicio();






