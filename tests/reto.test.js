/*
 * RETO · Escribe AQUÍ tus propias pruebas para ordenarRutas(lista, criterio).
 * Mínimo 5 casos (ver RETO.md). Usa el patrón Preparar, Ejecutar, Verificar.
 *
 * Ejemplo de la forma de una prueba (bórralo o adáptalo):
 *
 *   test('describe lo que debe pasar', () => {
 *     // Preparar
 *     const lista = rutas;
 *     // Ejecutar
 *     const resultado = ordenarRutas(lista, 'precio');
 *     // Verificar
 *     assert.equal(resultado[0].precio, 0);
 *   });
 */
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { rutas } = require('../js/datos.js');
const { ordenarRutas } = require('../js/app.js');

describe('RETO · ordenarRutas(lista, criterio)', () => {
  test('ordena por nombre de A a Z respetando tildes', () => {
    // Preparar
    const lista = [
      { nombre: 'Valle de Cocora' },
      { nombre: 'Ascenso al Nevado del Ruiz' },
      { nombre: 'Árbol de prueba' }
    ];
    // Ejecutar
    const resultado = ordenarRutas(lista, 'nombre');
    // Verificar
    assert.deepEqual(
      resultado.map((r) => r.nombre),
      ['Árbol de prueba', 'Ascenso al Nevado del Ruiz', 'Valle de Cocora']
    );
  });

  test('ordena por precio de menor a mayor dejando las gratis primero', () => {
    // Preparar
    const lista = rutas;
    // Ejecutar
    const resultado = ordenarRutas(lista, 'precio');
    // Verificar
    assert.equal(resultado[0].precio, 0);
    assert.equal(resultado[resultado.length - 1].precio, 150000);
  });

  test('ordena por duracion de menor a mayor', () => {
    // Preparar
    const lista = rutas;
    // Ejecutar
    const resultado = ordenarRutas(lista, 'duracion');
    // Verificar
    assert.equal(resultado[0].duracionHoras, 2);
    assert.equal(resultado[resultado.length - 1].duracionHoras, 10);
  });

  test('no modifica la lista original al ordenar', () => {
    // Preparar
    const copiaOriginal = [...rutas];
    // Ejecutar
    ordenarRutas(rutas, 'precio');
    // Verificar
    assert.deepEqual(rutas, copiaOriginal);
  });

  test('si el criterio es vacio o desconocido devuelve una copia con el mismo orden', () => {
    // Preparar
    const lista = rutas.slice(0, 3);
    // Ejecutar
    const resultado = ordenarRutas(lista, 'cualquier_cosa');
    // Verificar
    assert.deepEqual(resultado, lista);
    assert.notEqual(resultado, lista);
  });

  test('si la lista esta vacia devuelve un arreglo vacio', () => {
    // Preparar
    const lista = [];
    // Ejecutar
    const resultado = ordenarRutas(lista, 'nombre');
    // Verificar
    assert.deepEqual(resultado, []);
  });
});
