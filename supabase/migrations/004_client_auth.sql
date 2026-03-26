-- Perfil de cliente: puntos y datos de usuario (id = auth.uid())
CREATE TABLE IF NOT EXISTS public.customer_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text DEFAULT '',
  points integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_customer_profiles_email ON public.customer_profiles(email);

-- Pedidos: vincular al usuario autenticado (opcional, compatible con pedidos sin cuenta)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);

-- Puntos ganados por pedido entregado (1 punto por cada $1, redondeado)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS points_earned integer NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.orders.points_earned IS 'Puntos acumulados por este pedido cuando status = entregado (ej: floor(total/10))';

-- RLS: customer_profiles
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios ven y actualizan su propio perfil"
  ON public.customer_profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS: orders (clientes ven solo sus pedidos)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clientes leen sus pedidos" ON public.orders;
CREATE POLICY "Clientes leen sus pedidos"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Clientes crean pedidos con su user_id" ON public.orders;
CREATE POLICY "Clientes crean pedidos con su user_id"
  ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Si ya tenías políticas en orders (ej. para admin), añade una para que el servicio pueda hacer todo con service role.
-- Los clientes solo ven/crean con las de arriba.

-- Trigger: crear perfil al registrarse (por si se usa signUp sin upsert desde la app)
CREATE OR REPLACE FUNCTION public.handle_new_customer()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.customer_profiles (id, email, full_name, points)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    0
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, customer_profiles.full_name),
    updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_customer ON auth.users;
CREATE TRIGGER on_auth_user_created_customer
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_customer();

-- Puntos al marcar pedido como entregado: 1 punto por cada $10 (redondeado hacia abajo)
CREATE OR REPLACE FUNCTION public.set_order_points_on_delivered()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'entregado' AND (OLD.status IS NULL OR OLD.status <> 'entregado') THEN
    NEW.points_earned := greatest(0, floor(COALESCE(NEW.total, 0) / 10));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS orders_set_points_earned ON public.orders;
CREATE TRIGGER orders_set_points_earned
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE PROCEDURE public.set_order_points_on_delivered();
