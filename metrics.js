export function confusionMatrix(patients, threshold) {
  return patients.reduce((matrix, patient) => {
    const positive = patient.score >= threshold;
    if (patient.disease && positive) matrix.tp += 1;
    else if (patient.disease) matrix.fn += 1;
    else if (positive) matrix.fp += 1;
    else matrix.tn += 1;
    return matrix;
  }, { tp: 0, fn: 0, fp: 0, tn: 0 });
}

const ratio = (numerator, denominator) => denominator ? numerator / denominator : 0;

export function calculateMetrics({ tp, fn, fp, tn }) {
  const sensitivity = ratio(tp, tp + fn);
  const specificity = ratio(tn, tn + fp);
  const ppv = ratio(tp, tp + fp);
  const npv = ratio(tn, tn + fn);
  return {
    accuracy: ratio(tp + tn, tp + fn + fp + tn),
    sensitivity,
    specificity,
    fpr: ratio(fp, fp + tn),
    ppv,
    npv,
    f1: ratio(2 * ppv * sensitivity, ppv + sensitivity),
  };
}

export function rocPoints(patients) {
  const points = [];
  for (let threshold = 100; threshold >= 0; threshold -= 1) {
    const matrix = confusionMatrix(patients, threshold);
    const metrics = calculateMetrics(matrix);
    points.push({ x: metrics.fpr, y: metrics.sensitivity, threshold });
  }
  return points.sort((a, b) => a.x - b.x || a.y - b.y);
}

export function prPoints(patients) {
  const points = [];
  for (let threshold = 100; threshold >= 0; threshold -= 1) {
    const matrix = confusionMatrix(patients, threshold);
    const metrics = calculateMetrics(matrix);
    points.push({ x: metrics.sensitivity, y: matrix.tp + matrix.fp ? metrics.ppv : 1, threshold });
  }
  return points.sort((a, b) => a.x - b.x || b.y - a.y);
}

export function auc(points) {
  const unique = [];
  for (const point of points) {
    const previous = unique[unique.length - 1];
    if (previous && Math.abs(previous.x - point.x) < 1e-12) {
      previous.y = Math.max(previous.y, point.y);
    } else {
      unique.push({ ...point });
    }
  }
  let area = 0;
  for (let index = 1; index < unique.length; index += 1) {
    const left = unique[index - 1];
    const right = unique[index];
    area += (right.x - left.x) * (left.y + right.y) / 2;
  }
  return Math.max(0, Math.min(1, area));
}
