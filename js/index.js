import { viewContent } from './refreshContent.js';
import { changeUCColor, changePCColor, changeIRColor, changeMBRColor, changeMARColor, changeALUColor, changeRecordColor, changeMemoryColor, changeDataBusColor, changeAddressBusColor, changeControlBusColor } from './colorChange.js';
// Memoria instrucciones
let instructions = [
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

let INSZ = "0|0|0|0";
// Referencias al boton de ejecucion
const btnExecute = document.getElementById("execute");


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

refreshData();

//Event listener para el boton de load
document.getElementById("load").addEventListener("click", () => {
  const operador = document.getElementById('operador').value;
  const direccion = document.getElementById('direccion').value;
  const operando1 = document.getElementById('operador1').value;
  const operando2 = document.getElementById('operador2').value;
  const direction = document.getElementById('dirResult').value;

  let instruccion = instructions[0];
  let partes = instruccion.split('|');
  partes[0] = direccion;
  partes[1] = operador;
  partes[2] = operando1;
  partes[3] = operando2;
  partes[4] = direction;

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] == "-") {
      instructions[i] = partes.join('|');
      break;
    }
  }
  refreshData();
});




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
      break;
    case "01":
      direct(op1, op2, CODOP); // Direccionamiento directo
      break;

    case "10":
      indirect(op1, op2, CODOP); // Direccionamiento indirecto
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
  loadRecords(res);
  console.log("Valores de los registros :", records);
  refreshData();
  nextInstruction();
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
  refreshData();
  nextInstruction();
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
  op1 = IR;
  irValue.textContent = IR;
  await changeMemoryColor();
  await changeDataBusColor();
  MBR = parseInt(data[op2]);
  op2 = MBR;
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
  refreshData();
  nextInstruction();
}


// Función para refrescar los datos de los arreglos
function refreshData() {
  viewContent(memoryInstruction, instructions);
  viewContent(memoryData, data);
  viewContent(recordsValues, records);
}

document.getElementById("play").addEventListener("click", playSound);

async function playSound() {
  let audio = document.getElementById("audio");
  audio.play(); // Reproducir inmediatamente la primera vez

  for (let i = 1; i < 3; i++) { // Comenzar el bucle desde 1
    setTimeout(() => {
      audio.play();
    }, i * 2000); // Retraso de 2 segundos para las siguientes reproducciones
  }
}


function loadRecords(dato) {

  for (let i = 0; i < records.length; i++) {
    if (dato[i] != "-") {
      records[i] = dato;
      break;
    }
  }
}

function nextInstruction() {
  if (INSZ[0] != "1") {
    if (instructions[PC] != "-" && PC < instructions.length) {
      fetch();
    }
  } else {
    alert("Fin de la ejecucion");
  }
}