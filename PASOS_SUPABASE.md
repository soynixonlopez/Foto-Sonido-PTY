# Pasos después de tener las credenciales de Supabase

## 1. Variables de entorno

Asegúrate de tener un archivo `.env.local` en la raíz del proyecto (junto a `package.json`) con:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...tu-clave-anon...
```

Si solo tienes `.env.local.example`, cópialo y renómbralo a `.env.local`, luego pega ahí tu URL y tu anon key.

---

## 2. Crear tablas en Supabase

1. Entra a [app.supabase.com](https://app.supabase.com) y abre tu proyecto.
2. En el menú izquierdo: **SQL Editor**.
3. **Nueva query**.
4. Copia **todo** el contenido del archivo `supabase/migrations/001_initial.sql` y pégalo en el editor.
5. Pulsa **Run** (o Ctrl+Enter).
6. Debe decir que se ejecutó correctamente (tablas `products`, `orders`, `order_items` y políticas creadas).
7. Abre otra **Nueva query**.
8. Copia **todo** el contenido de `supabase/migrations/002_storage.sql` y pégalo.
9. Pulsa **Run** de nuevo.
10. Debe crearse el bucket `product-images` en **Storage**. Si da error de “policy already exists”, puedes ignorarlo o borrar antes las políticas de `storage.objects` en el Dashboard.
11. **Nueva query** de nuevo: copia todo `supabase/migrations/003_product_sections.sql` y ejecuta **Run**. Así se añade la columna `sections` a `products` para Promociones, Últimos modelos, Destacados y Nuevos.

---

## 3. Crear usuario administrador

1. En Supabase: **Authentication** → **Users**.
2. **Add user** → **Create new user**.
3. Pon un **Email** (ej: `admin@tudominio.com`) y una **Contraseña** segura.
4. Guarda. Ese email y contraseña serán los que uses para entrar al panel en `/admin/login`.

(Opcional: en **Authentication** → **Providers** → **Email** puedes desactivar “Confirm email” en desarrollo para no tener que confirmar el correo.)

---

## 4. Arrancar la app y entrar al panel

En la terminal, en la carpeta del proyecto:

```bash
npm install
npm run dev
```

Abre el navegador en:

- **Sitio:** http://localhost:3000  
- **Panel admin:** http://localhost:3000/admin  

En `/admin` te pedirá usuario y contraseña: usa el **email** y **contraseña** del usuario que creaste en el paso 3.

---

## Resumen

| Paso | Dónde | Qué hacer |
|------|--------|-----------|
| 1 | Proyecto local | `.env.local` con URL y anon key |
| 2 | Supabase → SQL Editor | Ejecutar `001_initial.sql` y luego `002_storage.sql` |
| 3 | Supabase → Authentication → Users | Crear usuario (email + contraseña) |
| 4 | Terminal | `npm run dev` y entrar a http://localhost:3000/admin |

Después de esto ya puedes crear productos en el panel, subir imágenes y marcar cuáles se muestran en el marketplace.
