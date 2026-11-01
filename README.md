# TP N° 3: Despliegue de Arquitectura Cloud-Native - GlobalLogistics S.A.
 
**Alumnos:** Lisandro Exequiel Müller, Marcos Rojas y Elio Corvalán

## Arquitectura Desplegada
- **Balanceador de Carga (1 instancia):** NGINX (`nginx:alpine`) en el puerto `80` con Health Checks pasivos (`max_fails=3 fail_timeout=10s`) y failover automático (`proxy_next_upstream`).
- **Microservicio Backend (3 réplicas):** API REST Stateless en Node.js + Express (`node:18-alpine`) escalada mediante `deploy.replicas: 3`.

## 1. Instrucciones para levantar el entorno (IaC)

Clonar el repositorio y ejecutar en la raíz del proyecto:

    docker-compose up -d --build

Para verificar que el balanceador y las 3 réplicas están en ejecución:

    docker-compose ps

## 2. Verificar el Balanceo de Carga (Round-Robin)

Ejecutar peticiones consecutivas al puerto 80 para observar cómo el tráfico se reparte equitativamente (el ID de instancia cambiará en cada respuesta):

En PowerShell (Windows):

    1..6 | ForEach-Object { Invoke-RestMethod http://localhost/ }

En Bash (Linux/macOS):

    for i in {1..6}; do curl -s http://localhost/; echo ""; done

## 3. Reproducir las Pruebas de Estrés (Apache Benchmark)

Para replicar las métricas obtenidas en el informe, utilizar la herramienta `ab` (Apache Benchmark).

### Escenario 1: Concurrencia Moderada (5.000 peticiones, 100 concurrentes)

    ab -n 5000 -c 100 http://localhost/

### Escenario 2: Concurrencia Extrema / Saturación (15.000 peticiones, 1.000 concurrentes)

    ab -n 15000 -c 1000 http://localhost/