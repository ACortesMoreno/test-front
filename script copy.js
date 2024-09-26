function calcularEdadEnMeses(fechaNacimiento, fechaEvaluacion) {
    const nacimiento = new Date(fechaNacimiento);
    const evaluacion = new Date(fechaEvaluacion);

    // Calcular diferencia en años y meses
    let edadAnos = evaluacion.getFullYear() - nacimiento.getFullYear();
    let edadMeses = edadAnos * 12 + (evaluacion.getMonth() - nacimiento.getMonth());

    // Ajustar si el día de la evaluación es antes del día de nacimiento en el mes
    if (evaluacion.getDate() < nacimiento.getDate()) {
        edadMeses -= 1;
    }

    // Calcular diferencia en días para redondeo
    const diasPorMes = 30.44; // Promedio de días en un mes
    const diferenciaEnDias = Math.floor((evaluacion - nacimiento) / (1000 * 60 * 60 * 24));
    const diasRestantes = diferenciaEnDias % diasPorMes;

    // Redondear al mes más cercano si la edad es de 5 años o menos
    if (edadMeses <= 60) {
        const mesesCompletos = Math.floor(diferenciaEnDias / diasPorMes);
        edadMeses = mesesCompletos + (diasRestantes >= diasPorMes / 2 ? 1 : 0);
    }

    return edadMeses;
}

function enviarFormulario() {
    const genero = document.getElementById('genero').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const fechaEvaluacion = document.getElementById('fechaEvaluacion').value;
    const peso = document.getElementById('peso').value;
    const talla = document.getElementById('talla').value;

    if (!fechaNacimiento || !fechaEvaluacion) {
        alert("Por favor, complete ambas fechas.");
        return;
    }

    const edadMeses = calcularEdadEnMeses(fechaNacimiento, fechaEvaluacion);

    fetch('https://test-backend-riux.onrender.com/api/zscores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genero, edadMeses, peso, talla }),
    })
        .then(response => response.json())
        .then(data => {
            // Mapeo de claves a etiquetas
            const etiquetas = {
                zPesoYEdad: 'Peso/Edad',
                zTallaYEdad: 'Talla/Edad',
                zPesoYTalla: 'Peso/Talla',
                zIMCYEdad: 'IMC/Edad'
            };

            // Generar resultados en el formato deseado
            let resultados = '';
            for (const [key, value] of Object.entries(data)) {
                const etiqueta = etiquetas[key] || key;
                resultados += `${etiqueta}: <strong>${value !== null ? value : 'No se encontraron valores'}</strong><br><br>`;
            }
            document.getElementById('resultados').innerHTML = resultados;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

console.log('Ruta actualizada')