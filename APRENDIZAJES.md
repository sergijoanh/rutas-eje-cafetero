# Mis aprendizajes · Rutas del Eje

> Las pruebas automáticas dicen si tu código **funciona**. Este archivo muestra si **entiendes por qué funciona**.
> Responde con tus palabras, en 2 a 5 líneas por pregunta. No copies la documentación: explícala.
> En cada issue anota también **qué consultaste** (enlace) y **qué encontraste ahí**.
>
> Este archivo forma parte de la calificación del reto (criterio _Comprensión_).

**Aprendiz:** Sergi Joan Henao González

---

## Issue #1 · G1 Guía de estilo

\*_Consulté:_
-MDN (https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties) prendí cómo se declaran variables en :root y se consumen globalmente con var()

-Bootstrap (Buttons: https://getbootstrap.com/docs/5.3/components/buttons/#variables) → Encontré que cada componente usa sus propias variables locales (--bs-btn-\*).

-WebAIM (Contrast Checker: https://webaim.org/resources/contrastchecker/) → Verifiqué que las combinaciones superan el ratio mínimo de 4.5:1.

-

1. **Explica:** ¿qué ventaja tiene escribir los colores como variables en `:root` en vez de escribir el hex directamente en cada regla?
   Permite usar el diseño en un solo lugar

2. **Experimenta y explica:** en DevTools selecciona el botón "Ver rutas", pestaña _Computed_ (o _Calculado_) y busca `--bs-btn-bg`. ¿De dónde sale su valor? ¿Por qué cambiar `--bs-primary` no habría cambiado el color del botón?
   el valor sale de la regla .btn-primary en estilos.css donde se asignó --bs-btn-bg: var(--eje-primario)

3. **¿Qué pasaría si…** enlazas `estilos.css` ANTES de `bootstrap.min.css` en el `<head>`? Pruébalo, describe lo que ves y vuelve a dejarlo como estaba.
   Por la cascada de CSS a igual especificidad gana la última regla leída

---

## Issue #2 · G2 Componentes

**Consulté:**
- Bootstrap Navbar (https://getbootstrap.com/docs/5.3/components/navbar/#responsive-behaviors) → Vi cómo funciona el botón toggler junto con el div collapse usando `data-bs-target`.
- Bootstrap Button group (https://getbootstrap.com/docs/5.3/components/button-group/) y MDN `aria-pressed` (https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA/Attributes/aria-pressed) → Entendí cómo agrupar botones y avisar cuál está presionado.

1. **Explica:** ¿qué relación hay entre `data-bs-target="#menu"` en el botón y el `id="menu"` del div? ¿Quién lee ese atributo?
   El `data-bs-target="#menu"` le dice qué elemento abrir o cerrar cuando se hace clic, y coincide exactamente con el `id="menu"` del div. Lo lee el JavaScript de Bootstrap (`bootstrap.bundle.min.js`) para saber qué menú colapsar.

2. **Experimenta:** abre y cierra el menú en un ancho de celular y observa en DevTools el atributo `aria-expanded` del botón. ¿Qué pasa con su valor? ¿Para quién es útil esa información?
   Cuando el menú está cerrado vale `"false"` y cuando se abre cambia a `"true"`. Eso le sirve a los lectores de pantalla para avisarle a personas con discapacidad visual si el menú está desplegado o escondido.

3. **¿Qué pasaría si…** en un botón de filtro escribes `data-tipo="café"` (con tilde)? Piensa en lo que hay en `datos.js` antes de responder.
   No encontraría ninguna ruta porque en `datos.js` la propiedad `tipo` está escrita sin tilde (`'cafe'`). Como `filtrarPorTipo` compara con `===`, `'cafe' === 'café'` daría falso.

---

## Issue #3 · G3 Datos → tarjetas

**Consulté:**
- MDN Template literals (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals) → Aprendí a escribir HTML en varias líneas con backticks y meter variables con `${ }`.
- MDN `map()` y `join()` (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map y https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/join) → Vi que `map()` devuelve un arreglo nuevo del mismo tamaño y `join('')` lo vuelve un solo texto sin comas.

1. **Predice y comprueba:** antes de ejecutarlas en la consola del navegador, escribe qué crees que devuelve cada línea. Después ejecútalas y anota el resultado real.

   ```js
   [1, 2, 3].map((n) => n * 10)
   ['a', 'b', 'c'].join('')
   ['a', 'b', 'c'].join(' - ')
   rutas.map((r) => r.nombre).length
   ```

   | Línea | Mi predicción | Resultado real |
   | ----- | ------------- | -------------- |
   | 1     | `[10, 20, 30]` | `[10, 20, 30]` |
   | 2     | `'abc'`        | `'abc'`        |
   | 3     | `'a - b - c'`  | `'a - b - c'`  |
   | 4     | `11`           | `11`           |

2. **Experimenta y explica:** quita temporalmente `.join('')` de `pintarRutas`. ¿Qué aparece entre las tarjetas y por qué? (Pista: ¿qué hace `innerHTML` cuando le asignas un arreglo?). Vuelve a ponerlo.
   Aparecen comas (`,`) sueltas entre cada tarjeta. Eso pasa porque `innerHTML` espera texto y cuando se le pasa un arreglo lo convierte a string automáticamente poniendo comas entre cada elemento.

3. **Explica:** ¿por qué la tarjeta se escribe con comillas invertidas `` ` `` y no con comillas simples `' '`? ¿Qué hace `${ }`?
   Porque las comillas invertidas dejan escribir texto en varias líneas sin romper el string. El `${ }` evalúa lo que haya adentro (como `ruta.nombre`) y lo pega directo dentro del texto.

---

## Issue #4 · G4 Filtros y eventos

**Consulté:**
- MDN `filter()` (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) → Confirmé que crea un arreglo nuevo y no cambia el original.
- MDN `input` vs `change` (https://developer.mozilla.org/es/docs/Web/API/Element/input_event) y `aria-live` (https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA/Attributes/aria-live) → Vi cuándo se dispara cada evento y cómo `aria-live="polite"` anuncia cambios dinámicos.

1. **Predice y comprueba:** después de ejecutar `filtrarPorTipo(rutas, 'cafe')` en la consola, ¿cuánto vale `rutas.length`? ¿Por qué?
   Sigue valiendo `11`. Porque `filter()` no modifica el arreglo original, sino que recorre los elementos y devuelve un arreglo nuevo solo con los que cumplen la condición.

2. **Explica el recorrido:** describe paso a paso qué pasa desde que la persona hace clic en el botón "Cultura" hasta que aparecen las tarjetas nuevas. Menciona: el evento, `estado`, `aplicarFiltros()`, `filtrarPorTipo()` y `pintarRutas()`.
   Al hacer clic se dispara el evento `'click'`, se lee `boton.dataset.tipo` (`'cultura'`) y se guarda en `estado.tipo`. Luego se actualiza la clase `active` y `aria-pressed` de los botones y se llama a `aplicarFiltros()`, que usa `filtrarPorTipo()` y `buscarPorTexto()` para filtrar los datos sin tocar `rutas` y al final llama a `pintarRutas()` para volver a dibujar las tarjetas en el HTML.

3. **¿Qué pasaría si…** usas el evento `'change'` en lugar de `'input'` en el buscador? Pruébalo y describe la diferencia.
   Con `'input'` filtra en tiempo real con cada letra que uno escribe o borra. Con `'change'` no pasa nada mientras se escribe, solo filtra cuando uno termina y hace clic fuera del campo o presiona Enter.

---

## Reto · Ordenar rutas

**Consulté:**
- MDN `sort()` (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) y `localeCompare()` (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) → Entendí que `sort()` ordena sobre el mismo arreglo y que `localeCompare` ordena bien las palabras con tildes en español.

1. **Explica:** ¿por qué `ordenarRutas` hace `const copia = [...lista]` antes de `sort()`? ¿Qué le pasaría a `rutas` si no se copia? ¿Qué prueba tuya lo demuestra?
   Porque `sort()` muta directamente el arreglo sobre el que se llama. Si no hiciéramos copia, el arreglo `rutas` perdería su orden original cada vez que el usuario ordenara. En `tests/reto.test.js` la prueba `'no modifica la lista original al ordenar'` compara `rutas` antes y después de ordenar para demostrar que queda intacto.

2. **Explica:** en `copia.sort((a, b) => a.precio - b.precio)`, ¿qué significa que la función devuelva un número negativo, cero o positivo?
   Si devuelve negativo, `a` va antes que `b`; si devuelve positivo, `b` va antes que `a`; y si devuelve `0`, los deja en el mismo orden relativo. Así con `a.precio - b.precio` quedan de menor a mayor precio.

3. **Tus pruebas:** elige una de tus pruebas y explica qué error de programación detectaría si alguien dañara la función.
   La prueba `'ordena por nombre de A a Z respetando tildes'` detectaría si alguien ordenara textos usando resta o comparación simple (`a.nombre > b.nombre`) en lugar de `localeCompare('es')`, ya que las palabras con tilde como `'Árbol...'` quedarían mal ubicadas al final.
