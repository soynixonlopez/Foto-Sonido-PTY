-- Tabla de productos (admin + marketplace)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL,
  brand TEXT NOT NULL,
  product_id TEXT NOT NULL UNIQUE,
  images TEXT[] DEFAULT '{}',
  is_visible BOOLEAN DEFAULT false NOT NULL,
  stock INTEGER DEFAULT NULL
);

-- Índices para búsqueda y filtros
CREATE INDEX IF NOT EXISTS idx_products_is_visible ON public.products(is_visible);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand);
CREATE INDEX IF NOT EXISTS idx_products_product_id ON public.products(product_id);

-- Pedidos
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendiente',
  total NUMERIC(12,2),
  user_email TEXT
);

-- Ítems de cada pedido
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price NUMERIC(12,2) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- RLS: solo usuarios autenticados pueden ver/editar (admin). Público solo lectura de productos visibles.
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Políticas para products: público puede leer solo is_visible = true
CREATE POLICY "Productos visibles son públicos" ON public.products
  FOR SELECT USING (is_visible = true);

-- Autenticados (admin) pueden todo en products
CREATE POLICY "Admin puede gestionar productos" ON public.products
  FOR ALL USING (auth.role() = 'authenticated');

-- Admin: ver y gestionar pedidos
CREATE POLICY "Admin puede ver y gestionar pedidos" ON public.orders
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin puede ver y gestionar order_items" ON public.order_items
  FOR ALL USING (auth.role() = 'authenticated');

-- Permitir insert de orders desde el sitio (anon o authenticated) para "hacer pedido"
CREATE POLICY "Cualquiera puede crear pedidos" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Cualquiera puede crear order_items" ON public.order_items
  FOR INSERT WITH CHECK (true);

-- Trigger para updated_at en products
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON public.products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Comentarios
COMMENT ON TABLE public.products IS 'Catálogo de productos; is_visible controla si se muestra en el marketplace.';
COMMENT ON TABLE public.orders IS 'Pedidos realizados desde el sitio.';
COMMENT ON TABLE public.order_items IS 'Líneas de cada pedido.';
