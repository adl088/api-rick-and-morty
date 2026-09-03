# Analisis de Preguntas - Taller 1

### 1. ¿Cual estrategia obtuvo un mejor tiempo de ejecucion?
La estrategia concurrente con Promise.all() obtuvo un mejor tiempo de ejecucion. Al realizar las peticiones al mismo tiempo en paralelo, el tiempo total se redujo notablemente (aproximadamente entre 11 y 15 segundos con reintentos) en comparacion con la estrategia secuencial, donde cada peticion tuvo que esperar a que terminara la anterior (tomando mas de 17 segundos).

### 2. ¿Que ventajas ofrece Promise.all()?
- Permite ejecutar multiples promesas de forma concurrente, aprovechando el tiempo de espera de red.
- Reduce el tiempo total de respuesta, ya que no espera una por una.
- Devuelve un unico arreglo con todas las respuestas ya ordenadas segun las URLs enviadas.
- Si una peticion falla, permite manejar el error tempranamente.

### 3. ¿Que desventajas puede tener realizar demasiadas solicitudes concurrentes?
- El servidor de la API puede bloquear la IP temporalmente por exceso de solicitudes (Error 429 Too Many Requests / Rate Limit), como sucede con Cloudflare en esta API.
- Puede sobrecargar la red local o agotar los sockets disponibles en Node.js.
- Puede provocar fallas completas si una sola peticion falla y no se tienen reintentos configurados.

### 4. ¿En que situaciones utilizaria consultas secuenciales y en cuales consultas concurrentes?
- Consultas concurrentes (Promise.all): Se deben usar cuando las peticiones son independientes entre si y ninguna necesita datos de la anterior (por ejemplo, descargar paginas conocidas del 1 al 42 o consultar recursos distintos a la vez).
- Consultas secuenciales (await en bucle): Se deben usar cuando una peticion depende estrictamente del resultado de la anterior (por ejemplo, iniciar sesion para obtener un token antes de pedir datos, o cuando una API devuelve un cursor para la siguiente pagina), o cuando la API tiene limites muy estrictos de peticiones por segundo.
