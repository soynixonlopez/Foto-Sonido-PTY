-- Secciones/motivos para mostrar productos en el marketplace (promociones, últimos modelos, etc.)
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS sections TEXT[] DEFAULT '{}';

COMMENT ON COLUMN public.products.sections IS 'Motivos para mostrar en el sitio: promociones, ultimos_modelos, destacados, nuevos';

CREATE INDEX IF NOT EXISTS idx_products_sections ON public.products USING GIN (sections);
