# Simulador de rendimiento de pruebas diagnósticas

Aplicación educativa interactiva y bilingüe (castellano/catalán) para explorar:

- sensibilidad y especificidad;
- valores predictivos positivo y negativo;
- matriz de confusión;
- curvas ROC y precisión-recall;
- efecto del umbral y de la prevalencia.

La interfaz se inspira en el módulo educativo abierto [Explore AI Diagnostic Performance](https://stanfordmed.github.io/aimeded/ai-evaluation/) de Stanford Medicine, pero esta es una implementación independiente centrada en **respuestas de tests diagnósticos**, sin marca, analítica ni código de Stanford.

La presentación utiliza la identidad visual vigente de la UAB: verde corporativo Pantone 355 C (`#009639`), paleta secundaria institucional y el logotipo oficial de la Facultat de Medicina. El pie incorpora la firma solicitada `Created by G.C. using dev@Friday` y el icono dev@Friday utilizado en la web de horarios.

## Ejecutar localmente

No necesita compilación ni dependencias:

```bash
npm run serve
```

Abrir `http://localhost:8080`.

También puede servirse directamente con Nginx, Apache, Caddy, GitHub Pages, Vercel o cualquier hosting estático.

## Verificación

```bash
npm test
```

## Estructura

- `index.html`: estructura accesible de la interfaz.
- `styles.css`: diseño responsive.
- `app.js`: simulación, traducciones y gráficos.
- `metrics.js`: cálculos estadísticos puros.
- `tests/metrics.test.mjs`: pruebas automáticas.

## Despliegue portable

Copiar todos los archivos del repositorio al directorio público de cualquier servidor web. No usa backend, base de datos, cookies ni servicios externos.
