import { viewContent } from './refreshContent.js';
import {changeUCColor,changePCColor,changeIRColor,changeMBRColor,changeMARColor,changeALUColor,changeRecordColor,changeMemoryColor,changeDataBusColor,changeAddressBusColor,changeControlBusColor, changeSWColor} from './colorChange.js';
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
let SW = "00";
let op1 = 0; // Operando 1
let op2 = 0; // Operando 2

let dir; // Direccion de memoria
let res; // Resultado de la operacion

let CODOP; // Codigo de operacion

let INSZ = "0|0|0|0";
// Referencias al boton de ejecucion
const btnExecute = document.getElementById("execute");
const btnInterruption = document.getElementById("interruption");


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
const swValue = document.querySelector(".sw-value");
//Valores de los buses
const addresBusValue = document.querySelector(".address-bus-value");
const dataBusValue = document.querySelector(".data-bus-value");

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


// Interrupciónes
 btnInterruption.addEventListener("click", () => {
  const operador = document.getElementById('operador').value;
      const direccion = document.getElementById('direccion').value;
      const operando1 = document.getElementById('operador1').value;
      const operando2 = document.getElementById('operador2').value;
      const direction= document.getElementById('dirResult').value;

      let instruccion = instructions[0];
      let partes = instruccion.split('|');
      partes[0] = direccion;
      partes[1] = operador;
      partes[2] = operando1;
      partes[3] = operando2;
      partes[4] = direction;
      instructions[13] = partes.join('|');    
      refreshData();
      SW = "01";
      changeSWColor();
      swValue.textContent = SW;
});

// Agrega un event listener al botón
btnExecute.addEventListener("click", () => {
  if (SW != "01") {
  pcValue.textContent = PC;
  fetch();
  }else{
    nextInstruction();
  }

});


// Funcion para el ciclo de captacion
async function fetch() {
  swValue.textContent = SW;
  await changeSWColor();
  await changeSWColor();
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
  addresBusValue.textContent = MAR;
  await changeAddressBusColor();
  addresBusValue.textContent = "";
  await changeMemoryColor();
  dataBusValue.textContent = instructions[MAR];
  await changeDataBusColor();
  dataBusValue.textContent = "";
  MBR = instructions[MAR];
  mbrValue.textContent = MBR;
  await changeMBRColor();
  PC++;
  pcValue.textContent = PC;
  await changePCColor();

  // t3: IR <-- MBR
  await changeUCColor();
  await changeMBRColor();
  if (instructions[PC - 1].split("|")[0] != "00")
    {
    await changeIRColor();
    IR = MBR;
    irValue.textContent = IR;
    }
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
  viewContent();
}

// Funcion para direccionamiento inmediato
async function inmediatly(op1, op2, CODOP) {
  await changeUCColor();
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
  addresBusValue.textContent = op1;
  await changeAddressBusColor();
  addresBusValue.textContent = "";
  await changeMemoryColor();

  dataBusValue.textContent = data[op1];
  await changeDataBusColor();
  dataBusValue.textContent = "";
  await changeMBRColor();
  MBR = parseInt(data[op1]);
  mbrValue.textContent = MBR;
  await changeIRColor();
  IR = MBR;
  irValue.textContent = IR;
  await changeControlBusColor();
  addresBusValue.textContent = op2;
  await changeAddressBusColor();
  addresBusValue.textContent = "";
  await changeMemoryColor();

  dataBusValue.textContent = data[op2];
  await changeDataBusColor();
  dataBusValue.textContent = "";
  MBR = parseInt(data[op2]);
  mbrValue.textContent = MBR;
  await changeMBRColor();
  executeALU(IR, MBR, CODOP);
  await changeALUColor();
  data[dir] = res;
  mbrValue.textContent = res;
  await changeMBRColor();
  await changeUCColor();
  addresBusValue.textContent = dir;
  await changeControlBusColor();
  await changeAddressBusColor();
  addresBusValue.textContent = "";
  dataBusValue.textContent = res;
  await changeDataBusColor();
  dataBusValue.textContent = "";
  
  await changeMemoryColor();
  // Muestra el contenido de los arreglos al cargar la página
  refreshData();
  nextInstruction();
  
}

// Funcion para direccionamiento indirecto
async function indirect(op1, op2, CODOP) {
    await changeUCColor();
    marValue.textContent = op1;
    MAR = op1;
    await changeMARColor();
    await changeControlBusColor();
    addresBusValue.textContent = MAR;
    await changeAddressBusColor();
    addresBusValue.textContent = "";

    await changeMemoryColor();
    dataBusValue.textContent = data[op1];
    await changeDataBusColor();
    dataBusValue.textContent = "";
    await changeMBRColor();
    MBR = parseInt(data[op1]);
    mbrValue.textContent = MBR;

    IR = MBR;
    MAR = IR;

    irValue.textContent = IR;
    await changeIRColor();
    marValue.textContent = MAR;
    await changeMARColor();

    await changeControlBusColor();
    addresBusValue.textContent = MAR;
    await changeAddressBusColor();
    addresBusValue.textContent = "";

    await changeMemoryColor();
    dataBusValue.textContent = data[MAR];
    await changeDataBusColor();
    dataBusValue.textContent = "";
    MBR = parseInt(data[MAR]);
    mbrValue.textContent = MBR;
    await changeMBRColor();
    IR= MBR;
    irValue.textContent = IR;
    await changeIRColor();

    //Capturando indireccion 2
    await changeUCColor();
    marValue.textContent = op2;
    addresBusValue.textContent = op2;
    MAR = op2;
    await changeControlBusColor();
    addresBusValue.textContent = MAR;
    await changeAddressBusColor();
    addresBusValue.textContent = "";

    await changeMemoryColor();

    dataBusValue.textContent = data[op2];
    await changeDataBusColor();
    dataBusValue.textContent = "";

    await changeMBRColor();
    MBR = parseInt(data[op2]);
    mbrValue.textContent = MBR;

    MAR = MBR;
    marValue.textContent = MAR;
    await changeMARColor();


    await changeControlBusColor();

    addresBusValue.textContent = MAR;
    await changeAddressBusColor();
    addresBusValue.textContent = "";

    await changeMemoryColor();

    dataBusValue.textContent = data[MAR];
    await changeDataBusColor();
    dataBusValue.textContent = "";
    MBR = parseInt(data[MAR]);
    mbrValue.textContent = MBR;

    await changeMBRColor();
    await changeIRColor();

    executeALU(IR, MBR, CODOP);
    await changeALUColor();
    data[dir] = res;

    mbrValue.textContent = res;
    await changeMBRColor();
    
    await changeUCColor();

    MAR = dir;
    marValue.textContent = MAR;
    addresBusValue.textContent = dir;
    await changeMARColor();
    await changeAddressBusColor();
    addresBusValue.textContent = "";
    dataBusValue.textContent = res;
    await changeDataBusColor();
    dataBusValue.textContent = "";

    await changeMemoryColor();
    
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




function loadRecords(dato) {

  for (let i = 0; i < records.length; i++) {
    if(records[i] == "-"){
      records[i] = dato;
      break;
    }
  }
}

async function interruption(){
  MBR = PC;
  MAR = 12;
  PC = 13;
  instructions[MAR]=MBR;

  await changeUCColor();
  await changePCColor();
  mbrValue.textContent = MBR; 
  await changeUCColor();
  await changeMBRColor();
  marValue.textContent = MAR;
  await changeMARColor();
  pcValue.textContent = PC;
  await changePCColor();

  await changeUCColor();
  await changeControlBusColor();
  addresBusValue.textContent = MAR;
  await changeAddressBusColor();
  addresBusValue.textContent = "";
  await changeMemoryColor();

  await changeMBRColor();

  dataBusValue.textContent = MBR;
  await changeDataBusColor();
  dataBusValue.textContent = "";
  changeMemoryColor();

  refreshData()
  SW= "10"
  swValue.textContent = SW;
  
  await fetch();


  SW = "00";
  swValue.textContent = SW;
  await changeUCColor();
  addresBusValue.textContent = 12;
  await changeAddressBusColor();
  addresBusValue.textContent = "";
  await changeMemoryColor();

  dataBusValue.textContent = instructions[12];
  await changeDataBusColor();
  dataBusValue.textContent = "";
  MBR = instructions[12];
  mbrValue.textContent = MBR;
  await changeMBRColor();
  PC = MBR;
  pcValue.textContent = PC;
  await changePCColor();
  refreshData();
  nextInstruction();
}


function nextInstruction(){
  if (SW == "01") {
    interruption();
  }
  else if (instructions[PC] != "-" && PC < instructions.length) {
    changeSWColor();
    swValue.textContent = SW;
    fetch();
  }

  SW = "11";
  swValue.textContent = SW;
  refreshData();
}




