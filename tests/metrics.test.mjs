import test from 'node:test';
import assert from 'node:assert/strict';
import { auc, calculateMetrics, confusionMatrix, rocPoints } from '../metrics.js';

test('calcula correctamente la matriz de confusión', () => {
  const patients = [
    { disease: true, score: 90 },
    { disease: true, score: 20 },
    { disease: false, score: 70 },
    { disease: false, score: 10 },
  ];
  assert.deepEqual(confusionMatrix(patients, 50), { tp: 1, fn: 1, fp: 1, tn: 1 });
});

test('calcula sensibilidad, especificidad y valores predictivos', () => {
  const metrics = calculateMetrics({ tp: 80, fn: 20, fp: 10, tn: 90 });
  assert.equal(metrics.sensitivity, 0.8);
  assert.equal(metrics.specificity, 0.9);
  assert.equal(metrics.ppv, 80 / 90);
  assert.equal(metrics.npv, 90 / 110);
  assert.equal(metrics.fpr, 0.1);
});

test('un test perfectamente separado tiene AUC igual a 1', () => {
  const patients = [
    { disease: true, score: 90 }, { disease: true, score: 80 },
    { disease: false, score: 20 }, { disease: false, score: 10 },
  ];
  assert.equal(auc(rocPoints(patients)), 1);
});
