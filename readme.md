🥋 Explorador de Artes Marciales - Frontend
Una aplicación web para explorar y comparar artes marciales del mundo. Construida con React y Tailwind CSS.
🚀 Características

Buscar artes marciales por nombre, país o enfoque
Filtrar por tipo, país, contacto y demandas físicas
Comparar hasta 3 artes marciales
Ver información detallada de cada arte marcial
Diseño responsive para móvil y desktop

🛠 Tecnologías

React 18
Vite
Tailwind CSS
React Router
Axios
Lucide React (iconos)

⚡ Instalación Rápida
bash# Clonar repositorio
git clone <url-del-repositorio>
cd frontend-artes-marciales

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar desarrollo
npm run dev
⚙️ Configuración
Crear archivo .env:
envVITE_API_URL=http://localhost:5000

Nota: Asegúrate de que el backend esté corriendo en el puerto 5000

📱 Uso

Buscar: Usa la barra de búsqueda para encontrar artes marciales
Filtrar: Aplica filtros por tipo, país, etc.
Comparar: Selecciona hasta 3 artes marciales para comparar
Explorar: Haz clic en "Ver Detalles" para información completa

📁 Estructura
src/
├── components/
│   ├── ArteMarcialCard.jsx      # Tarjeta de arte marcial
│   ├── ArteMarcialDetail.jsx    # Vista detallada
│   ├── ComparisonModal.jsx      # Modal de comparación
│   ├── Header.jsx               # Encabezado
│   ├── LoadingSpinner.jsx       # Cargando
│   └── SearchFilters.jsx        # Filtros
├── App.jsx                      # Componente principal
└── main.jsx                     # Entrada de la app
🎯 Componentes Principales

ArteMarcialCard: Muestra información básica en formato tarjeta
ArteMarcialDetail: Vista completa con historia, técnicas y filosofía
ComparisonModal: Comparación lado a lado de artes marciales
SearchFilters: Sistema de filtros por categorías

📜 Scripts
bash npm run dev      # Desarrollo
npm run build    # Construcción
npm run preview  # Vista previa de producción
🎨 Características del Diseño

Responsive: Adaptado para móvil, tablet y desktop
Colores dinámicos: Diferentes colores según demanda física y tipo de contacto
Animaciones suaves: Transiciones y hover effects
Iconos modernos: Usando Lucide React

🔧 Personalización
Cambiar colores de estado:
javascript// En ArteMarcialCard.jsx
const getDemandaColor = (demanda) => {
  switch (demanda.toLowerCase()) {
    case 'baja': return 'bg-green-100 text-green-800';
    case 'alta': return 'bg-red-100 text-red-800';
    // Añadir más casos aquí
  }
};
Añadir nuevo filtro:
javascript// En SearchFilters.jsx
// Añadir nuevo select con opciones únicas del campo deseado
🐛 Solución de Problemas
Error de conexión con API:

Verificar que el backend esté corriendo
Comprobar la URL en .env

Estilos no se cargan:

Ejecutar npm install para instalar Tailwind CSS

Página en blanco:

Revisar la consola del navegador para errores
Verificar que todas las dependencias estén instaladas

🤝 Contribuir

Fork el proyecto
Crea tu rama (git checkout -b feature/nueva-funcionalidad)
Commit tus cambios (git commit -m 'Añadir nueva funcionalidad')
Push a la rama (git push origin feature/nueva-funcionalidad)
Abre un Pull Request

📝 Notas

La aplicación requiere el backend corriendo para funcionar
Las imágenes se cargan desde URLs externas
Los filtros se resetean al cambiar de página (comportamiento normal)