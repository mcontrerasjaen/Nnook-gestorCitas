from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze_service():
    data = request.json
    servicio = data.get('servicio', '').lower()
    cliente = data.get('cliente', 'Cliente')
    
    print(f"🧠 Python analizando: {servicio} para {cliente}")
   
    if "tinte" in servicio or "color" in servicio or "mechas" in servicio:
       
        resumen = {
            "status": "optimized",
            "tipo_agenda": "multi-block",
            "bloques": [
                {"tarea": "Aplicación Mezcla", "duracion": 30, "color": "#D4AF37", "tipo": "fijo"},
                {"tarea": "Tiempo de Exposición", "duracion": 45, "color": "#333333", "tipo": "espera"},
                {"tarea": "Lavado y Secado", "duracion": 20, "color": "#D4AF37", "tipo": "fijo"}
            ]
        }
    elif "corte" in servicio or "barba" in servicio:
        resumen = {
            "status": "optimized",
            "tipo_agenda": "single-block",
            "bloques": [
                {"tarea": servicio.capitalize(), "duracion": 45, "color": "#D4AF37", "tipo": "fijo"}
            ]
        }
    else:
        resumen = {
            "status": "standard",
            "tipo_agenda": "single-block",
            "bloques": [
                {"tarea": servicio.capitalize() if servicio else "Servicio General", "duracion": 30, "color": "#D4AF37", "tipo": "fijo"}
            ]
        }

    return jsonify(resumen)

if __name__ == '__main__':
    print("🚀 Cerebro de Aura (Python) activo en puerto 5000")
    app.run(host='0.0.0.0', port=5000)