import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

DATABASE_URL = "postgresql://postgres:26035618@localhost:5433/nnook_db"

def get_db_connection():
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

@app.route('/api/home', methods=['POST']) 
def register_home(): 
    data = request.json
    try:
        conn = get_db_connection()
        cur = conn.cursor()        
        cur.execute("""
            INSERT INTO empresas (nombre_salon, email, password_hash, sector, main_category, iban)
            VALUES (%s, %s, %s, %s, %s, %s) RETURNING id;
        """, (
            data.get('businessName'),
            data.get('email'),
            'hash_temporal', 
            data.get('type'),
            data.get('mainCategory'),
            data.get('iban', '')
        ))
        new_id = cur.fetchone()['id']
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"status": "success", "id": new_id})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM empresas WHERE email = %s", (email,))
        user = cur.fetchone()
        cur.close()
        conn.close()

        if user:
            return jsonify({
                "status": "success",
                "business": {
                    "id": user['id'],
                    "nombre_salon": user['nombre_salon'],
                    "sector": user['sector'],
                    "email": user['email']
                }
            })
        return jsonify({"status": "error", "message": "Email no encontrado"}), 401
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/staff', methods=['GET', 'POST'])
def manage_staff():    
    empresa_id = request.args.get('empresa_id') or (request.json.get('empresa_id') if request.is_json else 1)
    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == 'POST':
        data = request.json
        cur.execute("""
            INSERT INTO empleados (empresa_id, nombre, especialidad, color)
            VALUES (%s, %s, %s, %s) RETURNING *;
        """, (empresa_id, data.get('nombre'), data.get('especialidad'), data.get('color')))
        nuevo = cur.fetchone()
        conn.commit()
        return jsonify(nuevo)

    cur.execute("SELECT * FROM empleados WHERE empresa_id = %s;", (empresa_id,))
    lista = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(lista)

@app.route('/api/appointments', methods=['GET', 'POST'])
def manage_appointments():
    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == 'POST':
        data = request.json
        try:
            cur.execute("""
                INSERT INTO citas (empresa_id, empleado_id, cliente_nombre, fecha, hora_inicio)
                VALUES (%s, %s, %s, %s, %s) RETURNING *;
            """, (data['empresa_id'], data['empleado_id'], data['cliente_nombre'], data['fecha'], data['hora_inicio']))
            
            nueva_cita = cur.fetchone()
            conn.commit()
            
            # --- FORMATEO ANTES DE ENVIAR ---
            if nueva_cita:
                nueva_cita['fecha'] = nueva_cita['fecha'].isoformat() if hasattr(nueva_cita['fecha'], 'isoformat') else str(nueva_cita['fecha'])
                nueva_cita['hora_inicio'] = nueva_cita['hora_inicio'].strftime('%H:%M') if hasattr(nueva_cita['hora_inicio'], 'strftime') else str(nueva_cita['hora_inicio'])
            
            return jsonify(nueva_cita), 201
        except Exception as e:
            print(f"Error al guardar cita: {e}")
            return jsonify({"error": str(e)}), 500
        finally:
            cur.close()
            conn.close()

    # --- LÓGICA GET ---
    empresa_id = request.args.get('empresa_id')
    try:
        cur.execute("SELECT * FROM citas WHERE empresa_id = %s ORDER BY hora_inicio ASC", (empresa_id,))
        citas = cur.fetchall()
        
        # Formateamos todas las citas de la lista
        for cita in citas:
            cita['fecha'] = str(cita['fecha'])
            cita['hora_inicio'] = cita['hora_inicio'].strftime('%H:%M') if hasattr(cita['hora_inicio'], 'strftime') else str(cita['hora_inicio'])
            
        return jsonify(citas)
    except Exception as e:
        print(f"Error al obtener citas: {e}")
        return jsonify([])
    finally:
        cur.close()
        conn.close()
    
@app.route('/api/services', methods=['GET', 'POST'])
def manage_services():    
    empresa_id = request.args.get('empresa_id') or (request.json.get('empresa_id') if request.is_json else None)
    
    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == 'POST':
        data = request.json
        cur.execute("""
            INSERT INTO servicios (empresa_id, nombre, duracion, precio, color)
            VALUES (%s, %s, %s, %s, %s) RETURNING *;
        """, (empresa_id, data.get('nombre'), data.get('duracion'), data.get('precio'), data.get('color')))
        nuevo = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return jsonify(nuevo)
   
    cur.execute("SELECT * FROM servicios WHERE empresa_id = %s ORDER BY id DESC", (empresa_id,))
    servicios = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(servicios)

@app.route('/api/business/<int:id>', methods=['DELETE'])
def delete_business(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM empresas WHERE id = %s", (id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"status": "success"})

if __name__ == '__main__':
    print("🚀 Nnook Backend conectado a PostgreSQL (Puerto 5433)")
    app.run(host='0.0.0.0', port=5000, debug=True)