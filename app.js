import { auc, calculateMetrics, confusionMatrix, prPoints, rocPoints } from './metrics.js';

const copy = {
  es: {
    brand: 'Evaluación de pruebas diagnósticas', language: 'Idioma', title: 'Explora el rendimiento de las pruebas diagnósticas',
    subtitle: 'Simulación interactiva de sensibilidad, especificidad, valores predictivos y curvas ROC.',
    whyTitle: 'Por qué es importante',
    whyText: 'Para interpretar correctamente una prueba diagnóstica hay que comprender cómo cambia su rendimiento con el umbral de positividad, la dificultad de los casos y la prevalencia de la enfermedad.',
    exampleText: 'El ejemplo utiliza una prueba para detectar neumonía. Los mismos principios se aplican a cualquier test diagnóstico.',
    experiment: 'Experimentar', review: 'Repasar los conceptos',
    instructions: 'Cada punto representa a un paciente. El test asigna una puntuación de 0 a 100%. Arrastra la línea morada para fijar el umbral: las puntuaciones situadas a la derecha se interpretan como resultado positivo. Observa cómo cambian la matriz de confusión, las métricas y las curvas.',
    severe: 'Casos evidentes', subtle: 'Casos sutiles', lowPrevalence: 'Baja prevalencia', prevalence: 'Prevalencia de la enfermedad',
    negativeZone: '← Respuesta del test: negativa', positiveZone: 'Respuesta del test: positiva →', testScore: 'Puntuación del test diagnóstico (probabilidad de neumonía)',
    healthy: 'Paciente sano', disease: 'Paciente con neumonía', threshold: 'Umbral',
    testPositive: 'Test: positivo', testNegative: 'Test: negativo', actuallyDisease: 'Realmente tiene neumonía', actuallyHealthy: 'Realmente sano',
    tp: 'Verdadero positivo', fn: 'Falso negativo', fp: 'Falso positivo', tn: 'Verdadero negativo',
    accuracy: 'Exactitud', sensitivity: 'Sensibilidad', specificity: 'Especificidad', fpr: 'Tasa de falsos positivos', ppv: 'VPP / Precisión', npv: 'VPN',
    accuracyHelp: 'Proporción de respuestas correctas entre todos los pacientes.', sensitivityHelp: 'Proporción de enfermos correctamente identificados.',
    specificityHelp: 'Proporción de sanos correctamente identificados.', fprHelp: 'Proporción de sanos clasificados erróneamente como positivos.',
    ppvHelp: 'Probabilidad de enfermedad cuando el test es positivo.', npvHelp: 'Probabilidad de estar sano cuando el test es negativo.', f1Help: 'Equilibrio entre sensibilidad y valor predictivo positivo.',
    interpretationTitle: 'Interpretación clínica',
    interpretation: 'Con este umbral, el test clasifica correctamente el {accuracy} de los casos y detecta el {sensitivity} de las neumonías. El {fpr} de los pacientes sanos recibe un resultado falso positivo. Cuando el resultado es negativo, la probabilidad de que el paciente esté realmente sano es del {npv}.',
    tryTitle: 'Pruébalo tú mismo', tryIntro: 'Usa la simulación para explorar estas situaciones clínicas:',
    screeningTitle: '1. Cribado', screeningQuestion: 'No quieres enviar a casa a una persona con neumonía. En “Casos evidentes”, ¿dónde pondrías el umbral?',
    screeningAnswer: 'Umbral bajo (aprox. 20–30%). En cribado se prioriza una sensibilidad alta para perder el menor número posible de casos. A cambio aumentan los falsos positivos y las pruebas adicionales.',
    confirmTitle: '2. Confirmación', confirmQuestion: 'Quieres evitar antibióticos y estudios innecesarios. En “Casos sutiles”, ¿dónde pondrías el umbral?',
    confirmAnswer: 'Umbral alto (aprox. 70–80%). En una prueba confirmatoria interesa que un positivo sea convincente. A cambio se pierden algunos casos y disminuye la sensibilidad.',
    prevalenceTitle: '3. Baja prevalencia', prevalenceQuestion: 'Compara el VPP al 50% en “Casos sutiles” y en “Baja prevalencia”. ¿Qué cambia?',
    prevalenceAnswer: 'El VPP disminuye cuando la enfermedad es rara, aunque la capacidad discriminativa sea similar. Con pocos enfermos, los falsos positivos pueden superar a los verdaderos positivos.',
    showAnswer: 'Mostrar respuesta', hideAnswer: 'Ocultar respuesta',
    outcomesTitle: 'Los 4 resultados', metricsTitle: 'Métricas principales', tradeoffsTitle: 'Compromisos del umbral', outcomesIntro: 'Al comparar la respuesta del test diagnóstico con el estado real aparecen cuatro resultados posibles:',
    tpLong: 'Verdadero positivo (VP)', tpText: 'El test es positivo y el paciente tiene la enfermedad. Es una detección correcta.',
    fnLong: 'Falso negativo (FN)', fnText: 'El test es negativo, pero el paciente tiene la enfermedad. Es un caso perdido.',
    fpLong: 'Falso positivo (FP)', fpText: 'El test es positivo, pero el paciente está sano. Es una falsa alarma.',
    tnLong: 'Verdadero negativo (VN)', tnText: 'El test es negativo y el paciente está sano. Es una exclusión correcta.',
    metric: 'Métrica', question: 'Pregunta que responde', formula: 'Fórmula', tradeoffsIntro: 'Mover el umbral modifica simultáneamente los beneficios y los costes clínicos:',
    lowerThreshold: 'Umbral más bajo (←)', higherThreshold: 'Umbral más alto (→)',
    lowThresholdItems: ['Más resultados positivos', 'Mayor sensibilidad', 'Más falsos positivos', 'Menos casos perdidos'],
    highThresholdItems: ['Menos resultados positivos', 'Menor sensibilidad', 'Menos falsos positivos', 'Más casos perdidos'],
    contextTitle: 'El contexto clínico importa', contextText: 'Para cribado suele preferirse un umbral bajo; para confirmación, uno más alto. La elección depende de las consecuencias de un falso negativo y de un falso positivo.',
    aucHelp: 'Área bajo la curva. Resume la capacidad del test para ordenar a enfermos por encima de sanos: 1 es perfecto y 0,5 equivale al azar.',
    rocY: 'Sensibilidad (TPR)', rocX: 'Tasa de falsos positivos', prY: 'VPP / Precisión', prX: 'Sensibilidad',
    separatedExplanation: '<strong>Casos evidentes:</strong> los valores de pacientes enfermos y sanos están bien separados. El test discrimina con facilidad.',
    overlapExplanation: '<strong>Casos sutiles:</strong> las distribuciones se solapan y el test comete más falsos positivos y falsos negativos.',
    lowExplanation: '<strong>Baja prevalencia:</strong> solo el {prevalence}% tiene neumonía. El VPP empeora porque hay pocos verdaderos positivos frente a los falsos positivos.',
    mobileTitle: 'Mejor en una pantalla grande', mobileText: 'La simulación funciona en el móvil, pero las curvas y la matriz se interpretan mejor en una tableta u ordenador.', continue: 'Continuar',
    footer: 'Herramienta educativa. No sustituye el juicio clínico ni valida un test real.', inspiration: 'Inspirada en el módulo educativo abierto de Stanford Medicine.'
  },
  ca: {
    brand: 'Avaluació de proves diagnòstiques', language: 'Idioma', title: 'Explora el rendiment de les proves diagnòstiques',
    subtitle: 'Simulació interactiva de sensibilitat, especificitat, valors predictius i corbes ROC.',
    whyTitle: 'Per què és important',
    whyText: 'Per interpretar correctament una prova diagnòstica cal comprendre com canvia el seu rendiment amb el llindar de positivitat, la dificultat dels casos i la prevalença de la malaltia.',
    exampleText: 'L’exemple utilitza una prova per detectar pneumònia. Els mateixos principis s’apliquen a qualsevol test diagnòstic.',
    experiment: 'Experimentar', review: 'Repassar els conceptes',
    instructions: 'Cada punt representa un pacient. El test assigna una puntuació de 0 a 100%. Arrossega la línia morada per fixar el llindar: les puntuacions situades a la dreta s’interpreten com a resultat positiu. Observa com canvien la matriu de confusió, les mètriques i les corbes.',
    severe: 'Casos evidents', subtle: 'Casos subtils', lowPrevalence: 'Baixa prevalença', prevalence: 'Prevalença de la malaltia',
    negativeZone: '← Resposta del test: negativa', positiveZone: 'Resposta del test: positiva →', testScore: 'Puntuació del test diagnòstic (probabilitat de pneumònia)',
    healthy: 'Pacient sa', disease: 'Pacient amb pneumònia', threshold: 'Llindar',
    testPositive: 'Test: positiu', testNegative: 'Test: negatiu', actuallyDisease: 'Realment té pneumònia', actuallyHealthy: 'Realment sa',
    tp: 'Vertader positiu', fn: 'Fals negatiu', fp: 'Fals positiu', tn: 'Vertader negatiu',
    accuracy: 'Exactitud', sensitivity: 'Sensibilitat', specificity: 'Especificitat', fpr: 'Taxa de falsos positius', ppv: 'VPP / Precisió', npv: 'VPN',
    accuracyHelp: 'Proporció de respostes correctes entre tots els pacients.', sensitivityHelp: 'Proporció de malalts identificats correctament.',
    specificityHelp: 'Proporció de sans identificats correctament.', fprHelp: 'Proporció de sans classificats erròniament com a positius.',
    ppvHelp: 'Probabilitat de malaltia quan el test és positiu.', npvHelp: 'Probabilitat d’estar sa quan el test és negatiu.', f1Help: 'Equilibri entre sensibilitat i valor predictiu positiu.',
    interpretationTitle: 'Interpretació clínica',
    interpretation: 'Amb aquest llindar, el test classifica correctament el {accuracy} dels casos i detecta el {sensitivity} de les pneumònies. El {fpr} dels pacients sans rep un resultat fals positiu. Quan el resultat és negatiu, la probabilitat que el pacient estigui realment sa és del {npv}.',
    tryTitle: 'Prova-ho tu mateix', tryIntro: 'Fes servir la simulació per explorar aquestes situacions clíniques:',
    screeningTitle: '1. Cribratge', screeningQuestion: 'No vols enviar a casa una persona amb pneumònia. A “Casos evidents”, on posaries el llindar?',
    screeningAnswer: 'Llindar baix (aprox. 20–30%). En cribratge es prioritza una sensibilitat alta per perdre el menor nombre possible de casos. A canvi augmenten els falsos positius i les proves addicionals.',
    confirmTitle: '2. Confirmació', confirmQuestion: 'Vols evitar antibiòtics i estudis innecessaris. A “Casos subtils”, on posaries el llindar?',
    confirmAnswer: 'Llindar alt (aprox. 70–80%). En una prova confirmatòria interessa que un positiu sigui convincent. A canvi es perden alguns casos i disminueix la sensibilitat.',
    prevalenceTitle: '3. Baixa prevalença', prevalenceQuestion: 'Compara el VPP al 50% a “Casos subtils” i a “Baixa prevalença”. Què canvia?',
    prevalenceAnswer: 'El VPP disminueix quan la malaltia és rara, encara que la capacitat discriminativa sigui similar. Amb pocs malalts, els falsos positius poden superar els vertaders positius.',
    showAnswer: 'Mostra la resposta', hideAnswer: 'Amaga la resposta',
    outcomesTitle: 'Els 4 resultats', metricsTitle: 'Mètriques principals', tradeoffsTitle: 'Compromisos del llindar', outcomesIntro: 'En comparar la resposta del test diagnòstic amb l’estat real apareixen quatre resultats possibles:',
    tpLong: 'Vertader positiu (VP)', tpText: 'El test és positiu i el pacient té la malaltia. És una detecció correcta.',
    fnLong: 'Fals negatiu (FN)', fnText: 'El test és negatiu, però el pacient té la malaltia. És un cas perdut.',
    fpLong: 'Fals positiu (FP)', fpText: 'El test és positiu, però el pacient està sa. És una falsa alarma.',
    tnLong: 'Vertader negatiu (VN)', tnText: 'El test és negatiu i el pacient està sa. És una exclusió correcta.',
    metric: 'Mètrica', question: 'Pregunta que respon', formula: 'Fórmula', tradeoffsIntro: 'Moure el llindar modifica simultàniament els beneficis i els costos clínics:',
    lowerThreshold: 'Llindar més baix (←)', higherThreshold: 'Llindar més alt (→)',
    lowThresholdItems: ['Més resultats positius', 'Més sensibilitat', 'Més falsos positius', 'Menys casos perduts'],
    highThresholdItems: ['Menys resultats positius', 'Menys sensibilitat', 'Menys falsos positius', 'Més casos perduts'],
    contextTitle: 'El context clínic importa', contextText: 'Per a cribratge se sol preferir un llindar baix; per a confirmació, un de més alt. L’elecció depèn de les conseqüències d’un fals negatiu i d’un fals positiu.',
    aucHelp: 'Àrea sota la corba. Resumeix la capacitat del test per ordenar els malalts per sobre dels sans: 1 és perfecte i 0,5 equival a l’atzar.',
    rocY: 'Sensibilitat (TPR)', rocX: 'Taxa de falsos positius', prY: 'VPP / Precisió', prX: 'Sensibilitat',
    separatedExplanation: '<strong>Casos evidents:</strong> els valors de pacients malalts i sans estan ben separats. El test discrimina amb facilitat.',
    overlapExplanation: '<strong>Casos subtils:</strong> les distribucions se solapen i el test comet més falsos positius i falsos negatius.',
    lowExplanation: '<strong>Baixa prevalença:</strong> només el {prevalence}% té pneumònia. El VPP empitjora perquè hi ha pocs vertaders positius davant dels falsos positius.',
    mobileTitle: 'Millor en una pantalla gran', mobileText: 'La simulació funciona al mòbil, però les corbes i la matriu s’interpreten millor en una tauleta o ordinador.', continue: 'Continua',
    footer: 'Eina educativa. No substitueix el judici clínic ni valida un test real.', inspiration: 'Inspirada en el mòdul educatiu obert de Stanford Medicine.'
  }
};

const datasets = {
  separated: {
    disease: [43, 50, 56, 61, 65, 68, 71, 74, 77, 79, 81, 83, 85, 87, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 99, 88, 84, 76, 69],
    healthy: [3, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 5, 14, 22, 31, 40, 49, 58, 64, 67, 69, 4, 12, 20, 28, 36, 44, 52, 57, 63, 66]
  },
  overlap: {
    disease: [35, 39, 43, 46, 49, 52, 55, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 47, 53, 59, 65, 71, 77],
    healthy: [7, 11, 14, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 14, 20, 26, 32, 38, 44, 50, 56, 62, 68, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72]
  }
};

let lang = new URLSearchParams(location.search).get('lang') === 'ca' ? 'ca' : (localStorage.getItem('diagnostic-lang') || 'es');
let currentDataset = 'separated';
let thresholdValue = 50;
let prevalence = 10;
let curveType = 'roc';
let patients = [];

const t = (key, values = {}) => Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), copy[lang][key] ?? key);
const percent = value => `${Math.round(value * 100)}%`;

function applyLanguage() {
  document.documentElement.lang = lang;
  document.title = t('title');
  document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll('[data-i18n-title]').forEach(node => { node.title = t(node.dataset.i18nTitle); });
  document.querySelector('#languageSelect').value = lang;
  renderDatasetExplanation();
  renderSupportingContent();
  update();
}

function renderSupportingContent() {
  const rows = [
    ['accuracy', 'accuracyHelp', '(VP+VN) / Total'], ['sensitivity', 'sensitivityHelp', 'VP / (VP+FN)'],
    ['specificity', 'specificityHelp', 'VN / (VN+FP)'], ['fpr', 'fprHelp', 'FP / (FP+VN)'],
    ['ppv', 'ppvHelp', 'VP / (VP+FP)'], ['npv', 'npvHelp', 'VN / (VN+FN)'], ['F1', 'f1Help', '2·P·S / (P+S)']
  ];
  document.querySelector('#metricsTable').innerHTML = rows.map(([name, help, formula]) => `<tr><td><strong>${name === 'F1' ? name : t(name)}</strong></td><td>${t(help)}</td><td><code>${formula}</code></td></tr>`).join('');
  document.querySelector('#lowThresholdList').innerHTML = copy[lang].lowThresholdItems.map(item => `<li>${item}</li>`).join('');
  document.querySelector('#highThresholdList').innerHTML = copy[lang].highThresholdItems.map(item => `<li>${item}</li>`).join('');
}

function seededJitter(index) {
  return ((index * 37 + 17) % 19) - 9;
}

function makePatients() {
  const source = currentDataset === 'low' ? datasets.overlap : datasets[currentDataset];
  const total = 100;
  const diseaseCount = currentDataset === 'low' ? Math.round(total * prevalence / 100) : 30;
  const healthyCount = total - diseaseCount;
  patients = [];
  for (let index = 0; index < diseaseCount; index += 1) patients.push({ disease: true, score: source.disease[index % source.disease.length] });
  for (let index = 0; index < healthyCount; index += 1) patients.push({ disease: false, score: source.healthy[index % source.healthy.length] });
  renderPatients();
}

function renderPatients() {
  const chart = document.querySelector('#distributionChart');
  chart.querySelectorAll('.patient').forEach(node => node.remove());
  patients.forEach((patient, index) => {
    const node = document.createElement('span');
    node.className = `patient ${patient.disease ? 'disease' : 'healthy'}`;
    node.style.left = `${patient.score}%`;
    node.style.top = `${22 + (index % 8) * 25 + seededJitter(index) * .5}px`;
    node.title = `${Math.round(patient.score)}% · ${patient.disease ? t('disease') : t('healthy')}`;
    chart.append(node);
  });
}

function update() {
  if (!patients.length) return;
  const matrix = confusionMatrix(patients, thresholdValue);
  const metrics = calculateMetrics(matrix);
  for (const key of ['tp', 'fn', 'fp', 'tn']) document.querySelector(`#${key}`).textContent = matrix[key];
  for (const key of ['accuracy', 'sensitivity', 'specificity', 'fpr', 'ppv', 'npv', 'f1']) document.querySelector(`#${key}`).textContent = percent(metrics[key]);
  document.querySelector('#threshold').style.left = `${thresholdValue}%`;
  document.querySelector('#thresholdLabel').textContent = `${t('threshold')}: ${thresholdValue}%`;
  document.querySelector('#distributionChart').setAttribute('aria-valuenow', thresholdValue);
  document.querySelectorAll('.patient').forEach((node, index) => node.classList.toggle('positive', patients[index].score >= thresholdValue));
  document.querySelector('#interpretationText').textContent = t('interpretation', {
    accuracy: percent(metrics.accuracy), sensitivity: percent(metrics.sensitivity), fpr: percent(metrics.fpr), npv: percent(metrics.npv)
  });
  drawCurve(metrics);
}

function drawCurve(metrics) {
  const canvas = document.querySelector('#curveCanvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = 38;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;
  const points = curveType === 'roc' ? rocPoints(patients) : prPoints(patients);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#f7fafc'; ctx.fillRect(padding, padding, plotWidth, plotHeight);
  ctx.strokeStyle = '#cbd5e0'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]); ctx.beginPath();
  if (curveType === 'roc') { ctx.moveTo(padding, height - padding); ctx.lineTo(width - padding, padding); }
  else {
    const baseline = patients.filter(patient => patient.disease).length / patients.length;
    const y = height - padding - baseline * plotHeight; ctx.moveTo(padding, y); ctx.lineTo(width - padding, y);
  }
  ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = '#53565a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(padding, padding); ctx.lineTo(padding, height - padding); ctx.lineTo(width - padding, height - padding); ctx.stroke();
  ctx.fillStyle = '#53565a'; ctx.font = '11px sans-serif';
  for (let tick = 0; tick <= 4; tick += 1) {
    const value = tick / 4; const x = padding + value * plotWidth; const y = height - padding - value * plotHeight;
    ctx.textAlign = 'center'; ctx.fillText(value.toFixed(2), x, height - padding + 17);
    ctx.textAlign = 'right'; ctx.fillText(value.toFixed(2), padding - 7, y + 4);
  }
  ctx.strokeStyle = '#009639'; ctx.lineWidth = 3; ctx.beginPath();
  points.forEach((point, index) => {
    const x = padding + point.x * plotWidth; const y = height - padding - point.y * plotHeight;
    if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  const activeX = curveType === 'roc' ? metrics.fpr : metrics.sensitivity;
  const activeY = curveType === 'roc' ? metrics.sensitivity : metrics.ppv;
  ctx.fillStyle = '#e0007f'; ctx.beginPath(); ctx.arc(padding + activeX * plotWidth, height - padding - activeY * plotHeight, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(padding + activeX * plotWidth, height - padding - activeY * plotHeight, 3.5, 0, Math.PI * 2); ctx.fill();
  document.querySelector('#auc').textContent = auc(points).toFixed(2);
  document.querySelector('#yLabel').textContent = t(curveType === 'roc' ? 'rocY' : 'prY');
  document.querySelector('#xLabel').textContent = t(curveType === 'roc' ? 'rocX' : 'prX');
}

function renderDatasetExplanation() {
  const key = currentDataset === 'separated' ? 'separatedExplanation' : currentDataset === 'overlap' ? 'overlapExplanation' : 'lowExplanation';
  document.querySelector('#datasetExplanation').innerHTML = t(key, { prevalence });
  document.querySelector('#prevalenceControl').hidden = currentDataset !== 'low';
}

function setThreshold(clientX) {
  const chart = document.querySelector('#distributionChart');
  const box = chart.getBoundingClientRect();
  thresholdValue = Math.round(Math.max(5, Math.min(95, (clientX - box.left) / box.width * 100)));
  update();
}

function bindEvents() {
  document.querySelector('#languageSelect').addEventListener('change', event => {
    lang = event.target.value; localStorage.setItem('diagnostic-lang', lang);
    const url = new URL(location.href); url.searchParams.set('lang', lang); history.replaceState({}, '', url); applyLanguage(); renderPatients();
  });
  document.querySelectorAll('.main-tab').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.main-tab, .main-panel').forEach(node => node.classList.remove('active'));
    button.classList.add('active'); document.querySelector(`#${button.dataset.panel}`).classList.add('active');
  }));
  document.querySelectorAll('.concept-tab').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.concept-tab, .concept-panel').forEach(node => node.classList.remove('active'));
    button.classList.add('active'); document.querySelector(`#${button.dataset.concept}`).classList.add('active');
  }));
  document.querySelectorAll('.dataset-button').forEach(button => button.addEventListener('click', () => {
    currentDataset = button.dataset.dataset; document.querySelectorAll('.dataset-button').forEach(node => node.classList.remove('active')); button.classList.add('active');
    renderDatasetExplanation(); makePatients(); update();
  }));
  document.querySelector('#prevalenceSlider').addEventListener('input', event => {
    prevalence = Number(event.target.value); document.querySelector('#prevalenceValue').textContent = `${prevalence}%`; renderDatasetExplanation(); makePatients(); update();
  });
  document.querySelectorAll('.curve-button').forEach(button => button.addEventListener('click', () => {
    curveType = button.dataset.curve; document.querySelectorAll('.curve-button').forEach(node => node.classList.remove('active')); button.classList.add('active'); update();
  }));
  document.querySelectorAll('.answer-button').forEach(button => button.addEventListener('click', () => {
    const answer = button.nextElementSibling; const open = answer.classList.toggle('open'); button.textContent = t(open ? 'hideAnswer' : 'showAnswer');
  }));
  const chart = document.querySelector('#distributionChart');
  let dragging = false;
  chart.addEventListener('pointerdown', event => { dragging = true; chart.setPointerCapture(event.pointerId); setThreshold(event.clientX); });
  chart.addEventListener('pointermove', event => { if (dragging) setThreshold(event.clientX); });
  chart.addEventListener('pointerup', () => { dragging = false; });
  chart.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); thresholdValue = Math.max(5, Math.min(95, thresholdValue + (event.key === 'ArrowRight' ? 1 : -1))); update();
  });
  document.querySelector('#dismissMobile').addEventListener('click', () => { document.querySelector('#mobileNote').hidden = true; sessionStorage.setItem('diagnostic-mobile-note', 'dismissed'); });
}

bindEvents();
makePatients();
applyLanguage();
if (innerWidth < 720 && !sessionStorage.getItem('diagnostic-mobile-note')) document.querySelector('#mobileNote').hidden = false;
