function enviarFormulario() {
    const genero = document.getElementById('genero').value;
    const edadMeses = document.getElementById('edadMeses').value;
    const peso = document.getElementById('peso').value;
    const talla = document.getElementById('talla').value;

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
                zPesoYTalla: 'Peso/Talla'
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
