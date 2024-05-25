// Función para mostrar el contenido de un arreglo en un contenedor
export function viewContent(contenedor, arreglo) {
    contenedor.innerHTML = ""; // Limpia el contenido anterior
  
    arreglo.forEach((elemento, indice) => {
      const div = document.createElement("div");
      div.textContent = `Posición ${indice}: ${elemento}`;
      contenedor.appendChild(div);
    });
  }

