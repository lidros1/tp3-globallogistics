# TP N° 3: Despliegue de Arquitectura Cloud-Native - GlobalLogistics S.A.
 
**Alumnos:** Lisandro Müller, Marcos Rojas y Elio Corvalan

## Arquitectura Desplegada
* **Balanceador de Carga (1 instancia):** NGINX (`nginx:alpine`) en el puerto `80` con Health Checks pasivos (`max_fails=3 fail_timeout=10s`) y failover automático (`proxy_next_upstream`).
* **Microservicio Backend (3 réplicas):** API REST Stateless en Node.js + Express (`node:18-alpine`) escalada mediante `deploy.replicas: 3`.

## 1. Instrucciones para levantar el entorno (IaC)

Clonar el repositorio y ejecutar en la raíz del proyecto:

```bash
docker-compose up -d --build