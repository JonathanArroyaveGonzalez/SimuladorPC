## Direccionamiento

| Tipo        | Código | Descripción                                                                                                 |
|-------------|--------|--------------------------------------------------------------------------------------------------------------|
| Inmediato   | 00     | El operando es un valor constante incluido en la instrucción.                                           |
| Directo     | 01     | La instrucción contiene la dirección de memoria del operando.                                               |
| Indirecto   | 10     | La instrucción contiene la dirección de memoria donde se encuentra la dirección del operando.              |
| Valor       | 11     | No se utiliza en este contexto.                                                                           |

## Codop

| Tipo        | Código  | Operación                                   |
|-------------|-------- |-------------------------------------------- |
| Aritméticas | 000     | Suma                                       |
|             | 001     | Resta                                      |
|             | 010     | Multiplicación                             |
|             | 011     | División                                   |
| Lógicas     | 100     | Igual a (==)                               |
|             | 101     | Menor que (<)                              |
|             | 110     | Mayor que (>)                              |
|             | 111     | Diferente de (!=)                          |
| Carga       | 100     | `load` (Cargar un valor en un registro)    |
|             | 101     | `set` (Establecer un valor en un registro) |

## Formato de instrucción

| Tipo dir | Codop | Op 1 | Op 2 | Dir resul |

## Interrupción 

t1: MBR <-- (PC)

t2: MAR <-- Dirección de salvaguardia

    PC  <-- Dirección de rutina
    
t3: Memoria <-- (MBR)

