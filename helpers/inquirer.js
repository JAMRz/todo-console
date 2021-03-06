import inquirer from "inquirer";

import colors from "colors";

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "Seleccione una opción",
    choices: [
      {
        value: "1",
        name: `${"*".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"*".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"*".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"*".green} Listar tareas pendientes`,
      },

      {
        value: "5",
        name: `${"*".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"*".green} Eliminar tarea(s)`,
      },
      {
        value: "0",
        name: `${"*".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log("   Seleccione una opción".white);
  console.log("===========================\n".green);

  const { opcion } = await inquirer.prompt(menuOpts);

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `presione${"ENTER".green} para continuar`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Favor de ingresar un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

//-------------------

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

export {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
};
