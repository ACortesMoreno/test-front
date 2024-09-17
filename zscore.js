function enviarFormulario() {
    const genero = document.getElementById('genero').value;
    const edadMeses = document.getElementById('edadMeses').value;
    const peso = document.getElementById('peso').value;
    const talla = document.getElementById('talla').value;

    fetch('https://test-backend-riux.onrender.com/api/zscores', { // Asegúrate de que esta URL sea correcta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genero, edadMeses, peso, talla }),
    })
        .then(response => response.json())
        .then(data => {
            let resultados = '';
            for (const [key, value] of Object.entries(data)) {
                resultados += `${key}: ${value !== null ? JSON.stringify(value, null, 2) : 'No se encontraron valores'}\n\n`;
            }
            document.getElementById('resultados').innerText = resultados;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
