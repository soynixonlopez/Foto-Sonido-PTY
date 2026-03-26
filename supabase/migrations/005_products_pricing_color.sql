-- Agrega campos para el panel de productos: color, precio antes y precio despues.
-- Nota: `price` ya existe y se usa como "precio después".

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS color text,
  ADD COLUMN IF NOT EXISTS previous_price double precision;

