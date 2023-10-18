let filaEditando = null;

        const opciones = document.getElementById("opciones");

        opciones.addEventListener("change", function() {
            const selectedOption = opciones.value;
            const portadaImg = document.getElementById("portada");
            switch (selectedOption) {
                case "Cars":
                    portadaImg.src = "cars.jpg"; 
                    break;
                case "Meg":
                    portadaImg.src = "meg.jpg"; 
                    break;
                case "Potter":
                    portadaImg.src = "potter.jpg"; 
                    break;
                case "conjuro":
                    portadaImg.src = "conjuro.jpg"; 
                    break;
                case "Monja":
                    portadaImg.src = "monja.jpg"; 
                    break;
                default:
                    portadaImg.src = "portada.jpeg"; 
                    break;
            }
        });

        document.getElementById("btnEnviar").addEventListener("click", function(event) {
            event.preventDefault();
        
            const nombre = document.getElementById("nombre").value;
            const correo = document.getElementById("correo").value;
            const pelicula = document.getElementById("opciones").value;
            const boletos = parseInt(document.getElementById("Boletos").value);

            if (!correo.includes("@")) {
                alert("El correo electrónico debe contener '@'.");
                return;
            }
        
            if (nombre && correo && pelicula && !isNaN(boletos) && boletos > 0) {
                const tablaVentas = document.getElementById("tablaVentas").getElementsByTagName('tbody')[0];
                if (filaEditando) {
                    // Eliminar la fila editada
                    filaEditando.remove();
                }
                const newRow = tablaVentas.insertRow(tablaVentas.rows.length);
                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                const cell3 = newRow.insertCell(2);
                const cell4 = newRow.insertCell(3);
                const cell5 = newRow.insertCell(4);
                const cell6 = newRow.insertCell(5);
                const cell7 = newRow.insertCell(6);
                
                cell1.innerHTML = nombre;
                cell2.innerHTML = correo;
                cell3.innerHTML = pelicula;
                cell4.innerHTML = boletos;
        
                // Agregar la imagen
                const img = document.createElement("img");
                img.src = document.getElementById("portada").src;
                img.width = 100;
                cell5.appendChild(img);
        
                // Calcular y mostrar el total a pagar
                const costoPorBoleto = 50;
                const total = boletos * costoPorBoleto;
                cell6.innerHTML = "$" + total;
        
                // Agregar botones de editar y eliminar
                const editarBtn = document.createElement("button");
                editarBtn.textContent = "Editar";
                editarBtn.className = "btn btn-primary";
                editarBtn.onclick = function() {
                // Obtener los valores de la fila editada
                const nombreFila = newRow.cells[0].innerHTML;
                const correoFila = newRow.cells[1].innerHTML;
                const peliculaFila = newRow.cells[2].innerHTML;
                const boletosFila = newRow.cells[3].innerHTML;

                // Obtener la imagen de la fila editada
                const imgFila = newRow.cells[4].getElementsByTagName("img")[0];

                // Llenar el formulario con los valores de la fila editada
                document.getElementById("nombre").value = nombreFila;
                document.getElementById("correo").value = correoFila;
                document.getElementById("opciones").value = peliculaFila;
                document.getElementById("Boletos").value = boletosFila;

                // Cargar la imagen de la fila editada
                document.getElementById("portada").src = imgFila.src;

                // Marcar la fila como editando
                filaEditando = newRow;

                // Resaltar la fila para indicar que se está editando (puedes cambiar el estilo de fondo, por ejemplo)
                newRow.style.backgroundColor = "lightyellow";
};

        
                const eliminarBtn = document.createElement("button");
                eliminarBtn.textContent = "Eliminar";
                eliminarBtn.className = "btn btn-danger";
                eliminarBtn.onclick = function() {
                    // Eliminar la fila
                    if (confirm("¿Estás seguro de que quieres eliminar esta película?")) {
                        // Código para eliminar la película
                        newRow.remove();
                      } 
                    
                };
        
                cell7.appendChild(editarBtn);
                cell7.appendChild(eliminarBtn);
        
                // Restablecer la imagen por defecto
                document.getElementById("portada").src = "portada.jpeg";
        
                // Limpiar el formulario después de agregar o editar la entrada
                document.getElementById("ventas").reset();
            }
        });