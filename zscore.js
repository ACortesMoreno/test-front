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
            let resultados = '';
            const etiquetas = {
                zPesoYEdad: 'Peso por Edad',
                zTallaYEdad: 'Talla por Edad',
                zPesoYTalla: 'Peso por Talla'
            };

            for (const [key, value] of Object.entries(data)) {
                const etiqueta = etiquetas[key] || key;

                // Verifica si el valor es un número antes de usar toFixed
                const valorFormateado = (typeof value === 'number' && !isNaN(value))
                    ? value.toFixed(2)
                    : 'No se encontraron valores';

                resultados += `${etiqueta}: *${valorFormateado}*\n\n`;
            }

            document.getElementById('resultados').innerHTML = resultados.replace(/\n/g, '<br>');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
