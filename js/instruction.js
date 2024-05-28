export class Instruction {
    constructor(instructionStr) {
      this.instruction = instructionStr;
      this.decodeInstruction(instructionStr); // Llama al método de decodificación en el constructor
    }
  
    async decodeInstruction(instructionStr) {
      const parts = instructionStr.split("|");
      if (parts.length !== 5) {
        throw new Error("Invalid instruction format");
      }
  
      this.addressingMode = parts[0];
      this.opcode = parts[1];
  
      switch (this.opcode) {
        case "000":
          this.codop = "+"; // Addition
          break;
        case "001":
          this.codop = "-"; // Subtraction
          break;
        case "010":
          this.codop = "*"; // Multiplication
          break;
        case "011":
          this.codop = "/"; // Division
          break;
        case "100":
          this.codop = "=="; // Equality
          break;
        case "101":
          this.codop = "<"; // Less than
          break;
        case "110":
          this.codop = ">"; // Greater than
          break;
        case "111":
          this.codop = "!="; // Inequality
          break;
        default:
          throw new Error("Invalid opcode");
      }
  
      this.op1 = parseInt(parts[2], 10);
      this.op2 = parseInt(parts[3], 10);
      this.dirResult = parseInt(parts[4], 10);
  
      // Aquí podrías manejar la ejecución de la instrucción según el modo de direccionamiento (addressingMode)
      // Por ejemplo, llamar a funciones como immediatly, direct o indirect
      switch (this.addressingMode) {
        case "00":
          //await immediatly(this.op1, this.op2, this.codop); 
          break;
        case "01":
          //await direct(this.op1, this.op2, this.codop);
          break;
        case "10":
          //await indirect(this.op1, this.op2, this.codop);
          break;
        default:
          throw new Error("Invalid addressing mode");
      }
    }
  }
  