
// Nuevo color temporal
const tempColor = "red"; //"lightblue";

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

// Función para cambiar el color del uc
export async function changeUCColor() {
    uc.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    uc.style.backgroundColor = originalColorUC;
  }
  
  // Función para cambiar el color del pc
 export async function changePCColor() {
    pc.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    pc.style.backgroundColor = originalColorPC;
  }
  
  // Función para cambiar el color del ir
  export async function changeIRColor() {
    ir.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    ir.style.backgroundColor = originalColorIR;
  }
  
  // Función para cambiar el color del mbr
 export async function changeMBRColor() {
    mbr.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    mbr.style.backgroundColor = originalColorMBR;
  }
  
  // Función para cambiar el color del mar
 export async function changeMARColor() {
    mar.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    mar.style.backgroundColor = originalColorMAR;
  }
  
  // Funcion para cambiar el color de la ALU
 export async function changeALUColor() {
    ALU.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    ALU.style.backgroundColor = originalColorALU;
  }
  
  // Funcion para cambiar el color de los registros
 export async function changeRecordColor() {
    record.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    record.style.backgroundColor = originalColorRecord;
  }
  
  // Función para cambiar el color de la memoria
 export async function changeMemoryColor() {
    memorySection.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    memorySection.style.backgroundColor = originalColorMemory;
  }
  
  // Función para cambiar el color del bus de datos
 export async function changeDataBusColor() {
    DataBus.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    DataBus.style.backgroundColor = originalColorDataBus;
  }
  
  // Función para cambiar el color del bus de direcciones addressBus
 export async function changeAddressBusColor() {
    AddressBus.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    AddressBus.style.backgroundColor = originalColorAddressBus;
  }
  
  // Función para cambiar el color del bus de control
 export async function changeControlBusColor() {
    ControlBus.style.backgroundColor = tempColor;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
    ControlBus.style.backgroundColor = originalColorControlBus;
  }