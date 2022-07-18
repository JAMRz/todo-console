import colors from "colors";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
} from "./helpers/inquirer.js";
import { Tareas } from "./models/tareas.js";

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    //establecer tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();

        break;
      case "3": //listar completados
        tareas.listarPendientesCompletadas(true);

        break;
      case "4": //listar pendientes
        tareas.listarPendientesCompletadas(false);

        break;
      case "6": //borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        console.log({ id });
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
