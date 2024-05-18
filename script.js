// Memoria instrucciones
let instructions = ["001|010|30|40|12",1,2,3,4,5,6,7,8,9,10,11,12,13,14];
let data = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];

//Valor de los registros
let IR = 0;
let MAR = 0;
let MBR = 0;
let PC = 0;



// Referencias al boton de ejecucion
const btnExecute = document.getElementById("execute");

// Referencia a los componentes del sistema
const memorySection = document.querySelector(".memory");
const uc= document.querySelector(".uc");
const ALU= document.querySelector(".alu");
const ir= document.querySelector(".ir");
const mar= document.querySelector(".mar");
const mbr= document.querySelector(".mbr");
const pc= document.querySelector(".pc");
const record= document.querySelector(".records");
const ControlBus= document.querySelector(".control-bus");
const AddressBus= document.querySelector(".address-bus");
const DataBus= document.querySelector(".data-bus");

// Referencia a los valores de los registros
//const ALU= document.querySelector(".alu");
const irValue= document.querySelector(".ir-value");
const marValue= document.querySelector(".mar-value");
const mbrValue= document.querySelector(".mbr-value");
const pcValue= document.querySelector(".pc-value");
const op1Value= document.querySelector(".op1-value");
const op2Value= document.querySelector(".op2-value");
const resultValue= document.querySelector(".result-value");

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
const tempColor = "black";//"lightblue";


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
}


// Función para cambiar el color del uc
async function changeUCColor() {
    uc.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    uc.style.backgroundColor = originalColorUC;
}

// Función para cambiar el color del pc
async function changePCColor() {
    pc.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    pc.style.backgroundColor = originalColorPC;
}

// Función para cambiar el color del ir
async function changeIRColor() {
    ir.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    ir.style.backgroundColor = originalColorIR;
}

// Función para cambiar el color del mbr
async function changeMBRColor() {
    mbr.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    mbr.style.backgroundColor = originalColorMBR;
}

// Función para cambiar el color del mar
async function changeMARColor() {
    mar.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    mar.style.backgroundColor = originalColorMAR;
}

// Funcion para cambiar el color de la ALU
async function changeALUColor() {
    ALU.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    ALU.style.backgroundColor = originalColorALU;
}

// Funcion para cambiar el color de los registros
async function changeRecordColor() {
    record.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    record.style.backgroundColor = originalColorRecord;
}

// Función para cambiar el color de la memoria
async function changeMemoryColor() {
    memorySection.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    memorySection.style.backgroundColor = originalColorMemory;
}

// Función para cambiar el color del bus de datos
async function changeDataBusColor() {
    DataBus.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    DataBus.style.backgroundColor = originalColorDataBus;
}

// Función para cambiar el color del bus de direcciones addressBus
async function changeAddressBusColor() {
    AddressBus.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    AddressBus.style.backgroundColor = originalColorAddressBus;
}

// Función para cambiar el color del bus de control
async function changeControlBusColor() {
    ControlBus.style.backgroundColor = tempColor;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
    ControlBus.style.backgroundColor = originalColorControlBus;
}

