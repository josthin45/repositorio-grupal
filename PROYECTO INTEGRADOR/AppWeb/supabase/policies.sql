-- Habilitar RLS en todas las tablas
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preguntas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tarjetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relaciones ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla "usuarios"
-- Los usuarios solo pueden ver y actualizar su propio perfil
CREATE POLICY "Users can view their own profile" ON public.usuarios
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.usuarios
    FOR UPDATE USING (auth.uid() = id);

-- Políticas para la tabla "categorias"
-- El CRUD es exclusivo para el usuario creador (usuario_id)
CREATE POLICY "Users can view their own categories" ON public.categorias
    FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert their own categories" ON public.categorias
    FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update their own categories" ON public.categorias
    FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Users can delete their own categories" ON public.categorias
    FOR DELETE USING (auth.uid() = usuario_id);

-- Políticas para la tabla "preguntas" (Quiz)
CREATE POLICY "Users can view their own questions" ON public.preguntas
    FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert their own questions" ON public.preguntas
    FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update their own questions" ON public.preguntas
    FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Users can delete their own questions" ON public.preguntas
    FOR DELETE USING (auth.uid() = usuario_id);

-- Políticas para la tabla "tarjetas" (Cards)
CREATE POLICY "Users can view their own cards" ON public.tarjetas
    FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert their own cards" ON public.tarjetas
    FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update their own cards" ON public.tarjetas
    FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Users can delete their own cards" ON public.tarjetas
    FOR DELETE USING (auth.uid() = usuario_id);

-- Políticas para la tabla "relaciones" (Matching)
CREATE POLICY "Users can view their own relations" ON public.relaciones
    FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert their own relations" ON public.relaciones
    FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update their own relations" ON public.relaciones
    FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Users can delete their own relations" ON public.relaciones
    FOR DELETE USING (auth.uid() = usuario_id);
