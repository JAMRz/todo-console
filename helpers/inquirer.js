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

export { inquirerMenu, pausa, leerInput };
