# Panel de administración – Foto Sonido

## Requisitos

- Cuenta en [Supabase](https://supabase.com)
- Node.js 18+

## 1. Crear proyecto en Supabase

1. Entra en [supabase.com](https://supabase.com) y crea un proyecto.
2. En **Settings → API** copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Variables de entorno

Copia el ejemplo y rellena con los datos de tu proyecto:

```bash
cp .env.local.example .env.local
```

Edita `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. Base de datos

En el **SQL Editor** de Supabase, ejecuta en este orden:

1. **Migración inicial** (`supabase/migrations/001_initial.sql`): tablas `products`, `orders`, `order_items` y políticas RLS.
2. **Storage** (`supabase/migrations/002_storage.sql`): bucket `product-images` (máx. 1 MB por archivo) y políticas.

## 4. Usuario administrador

1. En Supabase: **Authentication → Users → Add user**.
2. Elige **Create new user**.
3. Indica **Email** y **Password** (este será tu usuario y contraseña del panel).
4. Opcional: confirma el correo en **Authentication → Providers → Email** (por ejemplo, desactiva “Confirm email” en desarrollo).

## 5. Bucket de imágenes (si no se creó con la migración)

Si el bucket `product-images` no aparece en **Storage**:

1. **Storage → New bucket**.
2. Nombre: `product-images`.
3. **Public bucket**: activado (para ver imágenes en el sitio).
4. **File size limit**: 1 MB.
5. **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`, `image/gif`.

En **Policies** del bucket, añade:

- **INSERT**: rol `authenticated`.
- **UPDATE / DELETE**: rol `authenticated`.
- **SELECT**: todos (para lectura pública).

## 6. Uso del panel

1. Arranca la app: `npm run dev`.
2. Entra en: **http://localhost:3000/admin**.
3. Inicia sesión con el email y contraseña del usuario creado en Supabase.
4. Desde el panel puedes:
   - **Dashboard**: ver total de productos, visibles, borradores, pedidos y unidades pedidas.
   - **Productos**: listar, filtrar por “En marketplace” / “Borrador”, crear, editar y subir hasta 5 imágenes (máx. 1 MB cada una).
   - Marcar cada producto como **visible en el marketplace** o **borrador**.

## Resumen de rutas

| Ruta | Descripción |
|------|-------------|
| `/admin` | Redirige a `/admin/dashboard` |
| `/admin/login` | Inicio de sesión (Supabase Auth) |
| `/admin/dashboard` | Estadísticas del catálogo y pedidos |
| `/admin/productos` | Listado y filtros de productos |
| `/admin/productos/nuevo` | Crear producto (imágenes, precio, categoría, marca, ID, descripción, visible/borrador) |
| `/admin/productos/[id]/editar` | Editar producto |

Los productos con **“Mostrar en el marketplace”** activado se publican en la página `/productos` del sitio. Los clientes pueden hacer pedidos desde la ficha del producto; los pedidos se guardan en Supabase y se reflejan en el dashboard del admin.
