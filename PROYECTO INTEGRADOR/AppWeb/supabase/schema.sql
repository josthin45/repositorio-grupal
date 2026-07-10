-- Activar UUID si no está activado
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla: usuarios (perfiles extendidos de auth.users)
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    nombre TEXT,
    correo TEXT,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla: categorias
CREATE TABLE IF NOT EXISTS public.categorias (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    color TEXT DEFAULT '#4f46e5',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabla: preguntas (para módulo Quiz - Angular)
CREATE TABLE IF NOT EXISTS public.preguntas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE CASCADE NOT NULL,
    enunciado TEXT NOT NULL,
    opcionA TEXT NOT NULL,
    opcionB TEXT NOT NULL,
    opcionC TEXT NOT NULL,
    respuesta TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabla: tarjetas (para módulo Cards - Vue)
CREATE TABLE IF NOT EXISTS public.tarjetas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE CASCADE NOT NULL,
    pregunta TEXT NOT NULL,
    respuesta TEXT NOT NULL,
    nivel INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabla: relaciones (para módulo Matching - React)
CREATE TABLE IF NOT EXISTS public.relaciones (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE CASCADE NOT NULL,
    concepto TEXT NOT NULL,
    definicion TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Triggers útiles: Crear el perfil automáticamente al registrar un usuario en auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.usuarios (id, correo, nombre)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'nombre');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Disparador en auth.users (Esto requiere ejecutar con permisos de superusuario en Supabase)
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--     AFTER INSERT ON auth.users
--     FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
