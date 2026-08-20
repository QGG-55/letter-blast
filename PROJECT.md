# Letter Blast

Fuente de verdad del proyecto. **Versión actual: v0.3.1**.

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
- v0.1.4: previsualización de arrastre alineada con los centros reales de las casillas y de cada figura.
- v0.1.5: explosiones más largas con destello, partículas, onda expansiva, impacto y desglose visible de puntos y total.
- v0.1.6: cantidades ocultas en los carteles de explosión, eventos centrados en el multiplicador y paletas rotatorias al vaciar el tablero.
- v0.1.7: el cartel central de resolución muestra exclusivamente el multiplicador aplicado (`×5` a `×1`).
- v0.1.8: bandeja más próxima al tablero, diseño compacto en pantallas bajas y bloqueo explícito del scroll durante el arrastre táctil.
- v0.1.9: ajuste dinámico del tablero a la altura útil para mantener visibles las tres figuras con la barra móvil abierta.
- v0.2.0: pantalla inicial con identidad Letter Blast y accesos a Niveles, Classic y Club; Classic abre el juego actual y los otros modos quedan señalados como próximos.
- v0.2.1: volver al menú pausa la partida Classic; al entrar de nuevo se conservan tablero, puntuación, multiplicador, figuras y palabras.
- v0.3.0: modo Niveles con 100 retos, objetivos alternativos de palabras o puntos, desbloqueo progresivo y progreso guardado en el dispositivo.
- v0.3.1: selector de niveles convertido en un recorrido de puertas celestiales entre cielo, nubes y luz.

## Siguientes hitos

1. Validar tacto y ergonomía en varios móviles reales.
2. Incorporar un diccionario español completo y eficiente.
3. Añadir persistencia local y telemetría respetuosa con la privacidad.
