# Energyx

Aplicación inicial de Energyx construida con React, Vite y Supabase.

## Requisitos
- Node.js 20 o superior
- npm

## Instalación
```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre la URL que muestra Vite, normalmente `http://localhost:5173`.

## Variables de entorno
Configura en `.env.local`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Utiliza únicamente la clave publicable en el navegador. Nunca introduzcas `service_role` ni claves secretas en variables `VITE_` o en el frontend.

## Estado actual
- Panel inicial responsive de Energyx.
- Navegación visual del área de cliente.
- Simulador orientativo de ahorro con comisión ilustrativa del 25%.
- Modal de selección de factura (todavía no sube documentos).
- Cliente Supabase preparado, pendiente de configurar credenciales y políticas.
- Sin OCR, contratación ni ofertas reales todavía.

## Próximas tareas
1. Conectar Supabase Auth y perfiles.
2. Crear bucket privado para facturas y políticas RLS.
3. Guardar metadatos de facturas.
4. Implementar OCR y revisión humana.
5. Implementar comparaciones verificables con tarifas y consumo normalizado.
6. Crear flujo de ofertas de proveedores y panel de administración.

**Importante:** el simulador muestra estimaciones hipotéticas. No representa ahorro conseguido ni genera cargos.
