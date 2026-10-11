/* Early-loaded avatar translations: independent of the asynchronous page translations.
   Covers the five mission tips, fifteen decision consequences, all theory screens
   and static assistant messages. English source keys remain unchanged. */
(function(){
  "use strict";
  const selected = new URLSearchParams(location.search).get("hubLang") ||
                   new URLSearchParams(location.search).get("lang");
  const lang = selected==="en" ? "en" : "es";
  const spanish = new Map([
  [
    "Start by comparing route length with terrain sensitivity. Shortest does not automatically mean lowest impact.",
    "Empieza comparando la longitud de la ruta con la sensibilidad del terreno. La ruta más corta no implica automáticamente el menor impacto."
  ],
  [
    "Temporary does not mean impact-free. Look at infiltration, repeated loading and what happens when the area is removed.",
    "Temporal no significa libre de impactos. Considera la infiltración, las cargas repetidas y qué ocurre cuando se retira la instalación."
  ],
  [
    "Ask where water will go, not only where equipment is standing. Flow paths are part of the site system.",
    "Pregunta hacia dónde irá el agua, no solo dónde están los equipos. Las trayectorias de flujo forman parte del sistema del emplazamiento."
  ],
  [
    "Compaction is cumulative. Repeated passes over the same vulnerable soil can matter more than one isolated movement.",
    "La compactación es acumulativa. Los pasos repetidos sobre el mismo suelo vulnerable pueden importar más que un movimiento aislado."
  ],
  [
    "Emergency pressure changes the decision threshold, not the need to think. Use the least-damaging feasible option and record why.",
    "La presión de una emergencia cambia el umbral de decisión, no la necesidad de razonar. Utiliza la opción viable menos dañina y registra el motivo."
  ],
  [
    "High axle loading on vulnerable ground can reduce pore space; crossing the drainage swale also creates a clear control failure.",
    "Una elevada carga por eje sobre terreno vulnerable puede reducir el espacio poroso; cruzar la cuneta de drenaje genera además un fallo claro de control."
  ],
  [
    "Using existing load-bearing corridors concentrates traffic on surfaces designed for it and avoids creating new disturbed tracks.",
    "Utilizar corredores existentes preparados para soportar carga concentra el tráfico en superficies diseñadas para ello y evita crear nuevas huellas alteradas."
  ],
  [
    "Protecting drainage alone is not enough. Edge damage can fragment or degrade small habitat features.",
    "Proteger únicamente el drenaje no es suficiente. El daño en los bordes puede fragmentar o degradar pequeños elementos de hábitat."
  ],
  [
    "Aggregate over unprotected soil can compact and seal the surface, especially under repeated heavy loads; removal may not restore structure.",
    "El árido sobre suelo sin protección puede compactar y sellar la superficie, especialmente bajo cargas pesadas repetidas; retirarlo puede no restaurar la estructura."
  ],
  [
    "Load-spreading and defined lanes reduce pressure and disturbance while keeping the footprint reversible and inspectable.",
    "El reparto de carga y los carriles definidos reducen la presión y la alteración, manteniendo una ocupación reversible e inspeccionable."
  ],
  [
    "Avoiding soil disturbance does not justify blocking drainage. Altered runoff can create ponding, erosion or polluted bypass flows.",
    "Evitar la alteración del suelo no justifica bloquear el drenaje. Una escorrentía modificada puede generar encharcamiento, erosión o flujos de bypass contaminados."
  ],
  [
    "Unassessed diversion can concentrate flow, increase erosion and transfer impacts downstream.",
    "Una desviación no evaluada puede concentrar el flujo, aumentar la erosión y trasladar impactos aguas abajo."
  ],
  [
    "Maintaining natural/established flow paths while controlling sediment and crossings addresses the cause instead of shifting it.",
    "Mantener las trayectorias de flujo naturales/establecidas controlando sedimentos y cruces aborda la causa en lugar de trasladarla."
  ],
  [
    "A berm can change hydraulic behaviour and create ponding or overtopping if it was not designed as drainage infrastructure.",
    "Un caballón puede modificar el comportamiento hidráulico y generar encharcamiento o desbordamiento si no fue diseñado como infraestructura de drenaje."
  ],
  [
    "Uncontrolled traffic creates multiple desire lines, widens disturbance and makes impacts difficult to monitor.",
    "El tráfico no controlado crea múltiples trazas informales, amplía la zona alterada y dificulta el seguimiento de impactos."
  ],
  [
    "Concentrating traffic on suitable areas and stopping movement under vulnerable conditions is a practical operational control.",
    "Concentrar el tráfico en zonas adecuadas y detener los movimientos en condiciones vulnerables constituye un control operacional práctico."
  ],
  [
    "Spreading disturbance can enlarge the total affected footprint and damage more microhabitats even if rutting looks less intense.",
    "Dispersar la alteración puede ampliar la superficie total afectada y dañar más microhábitats aunque las rodadas parezcan menos intensas."
  ],
  [
    "Urgency can justify trade-offs, but a foreseeable high-impact access route with no mitigation creates both physical damage and weak audit evidence.",
    "La urgencia puede justificar compromisos, pero una ruta de acceso previsiblemente de alto impacto sin mitigación genera tanto daño físico como evidencias de auditoría débiles."
  ],
  [
    "This keeps the recovery rapid while reducing ground pressure and documenting a proportionate emergency control.",
    "Mantiene una recuperación rápida reduciendo la presión sobre el terreno y documentando un control de emergencia proporcionado."
  ],
  [
    "Environmental protection must be integrated with mission needs. A decision that protects soil but causes unacceptable readiness loss may not be viable.",
    "La protección ambiental debe integrarse con las necesidades de misión. Una decisión que proteja el suelo pero cause una pérdida inaceptable de disponibilidad puede no ser viable."
  ],
  [
    "Compaction is a change in soil structure, not simply a mark on the ground. Heavy loads and repeated passes squeeze pore space, alter water movement and can reduce the soil's capacity to recover.",
    "La compactación es un cambio en la estructura del suelo, no simplemente una marca en el terreno. Las cargas pesadas y los pasos repetidos comprimen el espacio poroso, alteran el movimiento del agua y pueden reducir la capacidad del suelo para recuperarse."
  ],
  [
    "A good environmental rule is specific enough that an operator, supervisor and auditor can all tell whether it was followed. 'Be careful with the ground' is not a control; an approved route, trigger and inspection process is.",
    "Una buena regla ambiental es lo bastante específica para que operador, supervisor y auditor puedan saber si se ha cumplido. «Ten cuidado con el terreno» no es un control; una ruta aprobada, un criterio de activación y un proceso de inspección sí lo son."
  ],
  [
    "Water does not respect operational boundaries. Any decision that blocks, concentrates or redirects flow can move the impact somewhere else, including toward habitats, buildings or downstream drainage assets.",
    "El agua no respeta los límites operativos. Cualquier decisión que bloquee, concentre o redirija el flujo puede trasladar el impacto a otro lugar, incluidos hábitats, edificios o infraestructuras de drenaje aguas abajo."
  ],
  [
    "Urgency changes the decision space, but it does not remove environmental responsibility. The objective is the least-damaging feasible solution that still protects safety, airworthiness and mission need.",
    "La urgencia cambia el espacio de decisión, pero no elimina la responsabilidad ambiental. El objetivo es la solución viable menos dañina que siga protegiendo seguridad, aeronavegabilidad y necesidad de misión."
  ],
  [
    "A temporary platform, laydown area or maintenance pad can change soil structure and water movement within hours. Reversibility must be designed into the plan from the beginning.",
    "Una plataforma temporal, zona de acopio o área de mantenimiento puede modificar la estructura del suelo y el movimiento del agua en cuestión de horas. La reversibilidad debe integrarse en el plan desde el principio."
  ],
  [
    "Your goal is simple: protect soil and drainage while keeping the base operational. Press “How to play” first; the game will then guide you mission by mission.",
    "Tu objetivo es sencillo: proteger el suelo y el drenaje manteniendo la base operativa. Pulsa primero «Cómo jugar»; después el juego te guiará misión a misión."
  ],
  [
    "To advance: choose one option in each mission, review the impact preview, then confirm. After the result, complete the short theory screen and press “Next mission”.",
    "Para avanzar: elige una opción en cada misión, revisa la previsión de impacto y confirma. Después del resultado, completa la pantalla breve de teoría y pulsa «Siguiente misión»."
  ],
  [
    "Choose one plan. You can change your selection before you press “Confirm plan”.",
    "Elige un plan. Puedes cambiar tu selección antes de pulsar «Confirmar plan»."
  ],
  [
    "This result is not just a score. Read the mechanism:",
    "Este resultado no es solo una puntuación. Lee el mecanismo:"
  ],
  [
    "Then open the theory checkpoint before moving on.",
    "Después abre el bloque de teoría antes de continuar."
  ],
  [
    "These are the external technical anchors behind the training logic. They support the concepts of soil degradation, compaction, hydrological function and environmental management—not a site-specific operating procedure.",
    "Estas son las referencias técnicas externas que sustentan la lógica formativa. Respaldan los conceptos de degradación del suelo, compactación, función hidrológica y gestión ambiental; no constituyen un procedimiento operativo específico de un emplazamiento."
  ],
  [
    "This module is deliberately detailed. Work through the core theory, field signals and control cycle before unlocking the next mission.",
    "Este módulo ofrece una explicación detallada. Revisa los conceptos principales, las señales que debes observar sobre el terreno y el ciclo de control antes de desbloquear la siguiente misión."
  ],
  [
    "CONTROLLED & AUDIT-READY",
    "CONTROLADO Y PREPARADO PARA AUDITORÍA"
  ],
  [
    "CONTROLLED WITH IMPROVEMENTS",
    "CONTROLADO, CON MEJORAS PENDIENTES"
  ],
  [
    "SIGNIFICANT WEAKNESSES",
    "DEFICIENCIAS SIGNIFICATIVAS"
  ],
  [
    "CRITICAL CONTROL FAILURE",
    "FALLO CRÍTICO DE CONTROL"
  ]
]);
  const audit = /^Final audit score:\s*(\d+)\/100\s*—\s*(CONTROLLED & AUDIT-READY|CONTROLLED WITH IMPROVEMENTS|SIGNIFICANT WEAKNESSES|CRITICAL CONTROL FAILURE)\. Open your decision log on this screen to see exactly which operational choices created the result\.$/;
  window.SSF_AVATAR_LANG = lang;
  window.SSF_AVATAR_TRANSLATE = function(input) {
    const raw = String(input??"");
    if(lang!=="es") return raw;
    const direct = spanish.get(raw);
    if(direct!==undefined) return direct;
    const matched = raw.match(audit);
    if(matched) return "Puntuación final de auditoría: "+matched[1]+"/100 — "+spanish.get(matched[2])+". Abre el registro de decisiones de esta pantalla para comprobar qué actuaciones han generado el resultado.";
    return window.translateText?.(raw) || raw;
  };
})();
