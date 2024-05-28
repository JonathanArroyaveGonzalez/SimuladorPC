// Memoria instrucciones
let instructions = [
  "01|010|2|3|6",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
];
let data = [
  "3",
  "4",
  "4",
  "5",
  "6",
  "2",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
];
let records = ["-", "-", "-", "-", "-"];

//Valor de los registros
let IR = 0; // Registro de instruccion
let MAR = 0; // Registro de direccion de memoria
let MBR = 0; // Registro de datos de memoria
let PC = 0; // Contador de programa

let op1 = 0; // Operando 1
let op2 = 0; // Operando 2

let dir; // Direccion de memoria
let res; // Resultado de la operacion

let CODOP; // Codigo de operacion

// Referencias al boton de ejecucion
const btnExecute = document.getElementById("execute");

// Referencia a los componentes del sistema
const memorySection = document.querySelector(".memory");
const uc = document.querySelector(".uc");
const ALU = document.querySelector(".alu");
const ir = document.querySelector(".ir");
const mar = document.querySelector(".mar");
const mbr = document.querySelector(".mbr");
const pc = document.querySelector(".pc");
const record = document.querySelector(".records");
const ControlBus = document.querySelector(".control-bus");
const AddressBus = document.querySelector(".address-bus");
const DataBus = document.querySelector(".data-bus");

// Obtén referencias a los contenedores de memoria
const memoryInstruction = document.querySelector(".memory-section-instruction");
const memoryData = document.querySelector(".memory-section-data");
const recordsValues = document.querySelector(".records-data");

// Referencia a los valores de los registros
//const ALU= document.querySelector(".alu");
const irValue = document.querySelector(".ir-value");
const marValue = document.querySelector(".mar-value");
const mbrValue = document.querySelector(".mbr-value");
const pcValue = document.querySelector(".pc-value");
const op1Value = document.querySelector(".op1-value");
const op2Value = document.querySelector(".op2-value");
const resultValue = document.querySelector(".result-value");

//const recordVa= document.querySelector(".record");

// Colores originales de los componentes
const originalColorMemory = getComputedStyle(memorySection).backgroundColor;
const originalColorUC = getComputedStyle(uc).backgroundColor;
const originalColorIR = getComputedStyle(ir).backgroundColor;
const originalColorMAR = getComputedStyle(mar).backgroundColor;
const originalColorMBR = getComputedStyle(mbr).backgroundColor;
const originalColorPC = getComputedStyle(pc).backgroundColor;
const originalColorRecord = getComputedStyle(record).backgroundColor;
const originalColorControlBus = getComputedStyle(ControlBus).backgroundColor;
const originalColorAddressBus = getComputedStyle(AddressBus).backgroundColor;
const originalColorDataBus = getComputedStyle(DataBus).backgroundColor;
const originalColorALU = getComputedStyle(ALU).backgroundColor;

// Nuevo color temporal
const tempColor = "red"; //"lightblue";

// Agrega un event listener al botón
btnExecute.addEventListener("click", () => {
  pcValue.textContent = PC;
  fetch();
});

// Funcion para el ciclo de captacion
async function fetch() {
  // t1: MAR <-- PC
  await changeUCColor();
  await changePCColor();
  MAR = PC;
  marValue.textContent = PC;
  await changeMARColor();
  // t2: MBR <-- Mem[MAR]
  // t2: PC <-- PC + 1
  await changeUCColor();
  await changeControlBusColor();
  await changeAddressBusColor();
  await changeMemoryColor();
  await changeDataBusColor();
  MBR = instructions[MAR];
  mbrValue.textContent = MBR;
  await changeMBRColor();
  PC++;
  pcValue.textContent = PC;
  await changePCColor();

  // t3: IR <-- MBR
  await changeUCColor();
  await changeMBRColor();
  await changeIRColor();
  IR = MBR;
  irValue.textContent = IR;

  // t4: Decodificacion de la instruccion
  decodeInstruction(instructions[PC - 1]);
}

// Funcion para el ciclo de ejecucion

async function decodeInstruction(instruccion) {
  let OPERATOR = instruccion.split("|")[1];
  switch (OPERATOR) {
    case "000":
      CODOP = "+"; // Suma
      break;
    case "001":
      CODOP = "-"; // Resta
      break;
    case "010":
      CODOP = "*"; // Multiplicacion
      break;
    case "011":
      CODOP = "/"; // Division
      break;
    case "100":
      CODOP = "=="; // Igualdad
      break;
    case "101":
      CODOP = "<"; // Menor que
      break;
    case "110":
      CODOP = ">"; // Mayor que
      break;
    case "111":
      CODOP = "!="; // Diferencia
      break;

    default:
      alert("Operador no valido");
  }

  op1 = parseInt(instruccion.split("|")[2]);
  op2 = parseInt(instruccion.split("|")[3]);

  dir = parseInt(instruccion.split("|")[4]);

  let direccionamiento = instruccion.split("|")[0]; // Direccionamiento

  switch (direccionamiento) {
    case "00":
      inmediatly(op1, op2, CODOP); // Direccionamiento inmediato
      await changeUCColor();
      await changeMBRColor();
      MBR = res;
      mbrValue.textContent = res;
      await changeUCColor();
      await changeControlBusColor();
      await changeDataBusColor();
      await changeMemoryColor();
      data[dir] = res;
      refreshContent();
      break;
    case "01":
      direct(op1, op2, CODOP); // Direccionamiento directo
      break;

    case "10":
      indirect(op1,op2,CODOP); // Direccionamiento indirecto
      break;
    default:
      alert("Direccionamiento no valido");
  }
}

// Funcion para la ejecucion de la ALU

function executeALU(op1, op2, CODOP) {
  switch (CODOP) {
    case "+":
      res = op1 + op2; // Suma
      break;
    case "-":
      res = op1 - op2; // Resta
      break;
    case "*":
      res = op1 * op2; // Multiplicacion
      break;
    case "/":
      res = op1 / op2; // Division
      break;
    case "==":
      res = op1 == op2; // Igualdad
      break;
    case "<":
      res = op1 < op2; // Menor que
      break;
    case ">":
      res = op1 > op2; // Mayor que
      break;
    case "!=":
      res = op1 != op2; // Diferencia
      break;
    default:
      alert("Se tosteó la ALU");
  }
  resultValue.textContent = res;
  op1Value.textContent = op1;
  op2Value.textContent = op2;
  refreshContent();
}

// Funcion para direccionamiento inmediato
async function inmediatly(op1, op2, CODOP) {
  await changeUCColor();
  await changeIRColor();
  await changeALUColor();
  executeALU(op1, op2, CODOP);
  refreshContent();
}

// Funcion para direccionamiento directo
async function direct(op1, op2, CODOP) {
  await changeUCColor();
  await changeControlBusColor();
  await changeMARColor();
  await changeAddressBusColor();
  await changeMemoryColor();
  await changeDataBusColor();
  await changeMBRColor();
  MBR = parseInt(data[op1]);
  mbrValue.textContent = MBR;
  await changeIRColor();
  IR = MBR;
  irValue.textContent = IR;
  await changeMemoryColor();
  await changeDataBusColor();
  MBR = parseInt(data[op2]);
  mbrValue.textContent = MBR;
  await changeMBRColor();
  executeALU(IR, MBR, CODOP);
  await changeALUColor();
  data[dir] = res;
  // Muestra el contenido de los arreglos al cargar la página
  mostrarContenido(memoryInstruction, instructions);
  mostrarContenido(memoryData, data);
  mostrarContenido(recordsValues, records);
  console.log("Valores de los datos :", data, "en la posicion", data[dir]);
  refreshContent();
}

// Funcion para direccionamiento indirecto
async function indirect(op1, op2, CODOP) {
    await changeUCColor();
    await changeControlBusColor();
    await changeMARColor();
    await changeAddressBusColor();
    await changeMemoryColor();
    await changeDataBusColor();
    await changeMBRColor();
    MBR = parseInt(data[op1]);
    mbrValue.textContent = MBR;
    await changeIRColor();
    IR = MBR;
    op1=IR;
    irValue.textContent = IR;
    await changeMemoryColor();
    await changeDataBusColor();
    MBR = parseInt(data[op2]);
    op2=MBR;
    mbrValue.textContent = MBR;
    await changeMBRColor();

    //Capturando indireccion
    await changeUCColor();
    await changeControlBusColor();
    await changeDataBusColor();
    await changeMBRColor();
    MBR = parseInt(data[op1]);
    mbrValue.textContent = MBR;
    await changeIRColor();
    IR = MBR;
    irValue.textContent = IR;
    await changeControlBusColor();
    await changeMemoryColor();
    await changeDataBusColor();
    MBR = parseInt(data[op2]);
    mbrValue.textContent = MBR;
    await changeMBRColor();

    executeALU(IR, MBR, CODOP);
    await changeALUColor();
    data[dir] = res;
    // Muestra el contenido de los arreglos al cargar la página
    mostrarContenido(memoryInstruction, instructions);
    mostrarContenido(memoryData, data);
    mostrarContenido(recordsValues, records);
    console.log("Valores de los datos :", data, "en la posicion", data[dir]);
    refreshContent();
}

// Función para cambiar el color del uc
async function changeUCColor() {
  uc.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  uc.style.backgroundColor = originalColorUC;
}

// Función para cambiar el color del pc
async function changePCColor() {
  pc.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  pc.style.backgroundColor = originalColorPC;
}

// Función para cambiar el color del ir
async function changeIRColor() {
  ir.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  ir.style.backgroundColor = originalColorIR;
}

// Función para cambiar el color del mbr
async function changeMBRColor() {
  mbr.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  mbr.style.backgroundColor = originalColorMBR;
}

// Función para cambiar el color del mar
async function changeMARColor() {
  mar.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  mar.style.backgroundColor = originalColorMAR;
}

// Funcion para cambiar el color de la ALU
async function changeALUColor() {
  ALU.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  ALU.style.backgroundColor = originalColorALU;
}

// Funcion para cambiar el color de los registros
async function changeRecordColor() {
  record.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  record.style.backgroundColor = originalColorRecord;
}

// Función para cambiar el color de la memoria
async function changeMemoryColor() {
  memorySection.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  memorySection.style.backgroundColor = originalColorMemory;
}

// Función para cambiar el color del bus de datos
async function changeDataBusColor() {
  DataBus.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  DataBus.style.backgroundColor = originalColorDataBus;
}

// Función para cambiar el color del bus de direcciones addressBus
async function changeAddressBusColor() {
  AddressBus.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  AddressBus.style.backgroundColor = originalColorAddressBus;
}

// Función para cambiar el color del bus de control
async function changeControlBusColor() {
  ControlBus.style.backgroundColor = tempColor;
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  ControlBus.style.backgroundColor = originalColorControlBus;
}

// Función para mostrar el contenido de un arreglo en un contenedor
function mostrarContenido(contenedor, arreglo) {
  contenedor.innerHTML = ""; // Limpia el contenido anterior

  arreglo.forEach((elemento, indice) => {
    const div = document.createElement("div");
    div.textContent = `Posición ${indice}: ${elemento}`;
    contenedor.appendChild(div);
  });
}

// Muestra el contenido de los arreglos al cargar la página
mostrarContenido(memoryInstruction, instructions);
mostrarContenido(memoryData, data);
mostrarContenido(recordsValues, records);

function refreshContent(){
  // Muestra el contenido de los arreglos al cargar la página
mostrarContenido(memoryInstruction, instructions);
mostrarContenido(memoryData, data);
mostrarContenido(recordsValues, records);
}