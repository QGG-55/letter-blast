# Letter Blast

Fuente de verdad del proyecto. **Versión actual: v0.1.3**.

## Concepto y reglas

Puzle web móvil sobre un tablero 8×8. Se arrastran figuras de letras sin salir del tablero ni solaparse. Tras gastar las tres figuras se genera una nueva tanda. Las palabras locales válidas horizontales o verticales explotan y dan 10 puntos por letra; cada fila o columna completa explota y da 20 puntos. Todos los eventos de una jugada usan el multiplicador actual (×5 a ×1, un nivel cada 3 s); si hay puntuación, vuelve a ×5. Una casilla se elimina una vez aunque participe en varios eventos. La partida termina si ninguna figura restante cabe.

## Arquitectura

- `src/game/types.ts`: modelo puro.
- `src/game/pieces.ts`: catálogo y generadores desacoplados de figuras/letras.
- `src/game/dictionary.ts`: diccionario local sustituible.
- `src/game/engine.ts`: colocación, líneas, palabras, resolución, puntuación, multiplicador y game over.
- `src/ui/`: React, interacción Pointer Events y animaciones.
- `public/`: manifest e icono PWA propio provisional.

## Decisiones

La detección examina todas las palabras posibles de al menos tres letras dentro de cada secuencia contigua, de modo que `DIA` se reconoce también dentro de `AXDIAU`. Palabras y líneas se evalúan sobre el mismo tablero recién colocado y sus eventos puntúan por separado. La bandeja se repone después de usar las tres figuras. Se usan Pointer Events con una elevación visual de 70 px para que el dedo no tape el destino.

## Estado actual

Terminadas: tablero, figuras, letras, validación, drag táctil/ratón, previsualización válida/inválida, líneas, palabras horizontales/verticales, diccionario de prueba, puntuación combinada, multiplicador, animación de explosión, mensajes de eventos, game over, nueva partida, PWA básica, suite unitaria y publicación continua.

Publicación: repositorio público en `https://github.com/QGG-55/letter-blast` y Static Site de Render en `https://letter-blast.onrender.com`, rama `main`, build con lockfile y autodespliegue por commit.

Pendientes: diccionario español definitivo, pruebas E2E en dispositivos reales y mejoras offline. Fuera de alcance: usuarios, backend, ranking, multijugador, publicidad, compras, niveles, sonidos e IA.

## Historial resumido

- v0.1.0: primer MVP jugable.
- v0.1.1: todas las casillas del tablero y bloques de figuras mantienen dimensiones perfectamente cuadradas y uniformes.
- v0.1.2: detección de palabras válidas contenidas dentro de secuencias de letras más largas.
- v0.1.3: panel persistente con las seis palabras completadas más recientes.

## Siguientes hitos

1. Validar tacto y ergonomía en varios móviles reales.
2. Incorporar un diccionario español completo y eficiente.
3. Añadir persistencia local y telemetría respetuosa con la privacidad.
