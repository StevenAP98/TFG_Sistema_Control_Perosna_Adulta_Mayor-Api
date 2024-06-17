-- Table: Schema-datos.Cirugias

-- DROP TABLE IF EXISTS "Schema-datos"."Cirugias";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Cirugias"
(
    "idCirugia" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "nombreCirugia" text COLLATE pg_catalog."default",
    descripcion text COLLATE pg_catalog."default",
    "nombreCirujano" text COLLATE pg_catalog."default",
    "tipoCirugia" text COLLATE pg_catalog."default",
    "idResidente" integer,
    "fechaCirugia" timestamp with time zone,
    estado text COLLATE pg_catalog."default",
    "nombreAdjuntos"text COLLATE pg_catalog."default",
    "rutaAdjuntos" text COLLATE pg_catalog."default",

    CONSTRAINT "Cirugias_pkey" PRIMARY KEY ("idCirugia")
)
WITH (
    OIDS = FALSE
)





-- Table: Schema-datos.Citas

-- DROP TABLE IF EXISTS "Schema-datos"."Citas";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Citas"
(
    "idCita" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    titulo text COLLATE pg_catalog."default",
    especialidad text COLLATE pg_catalog."default",
    descripcion text COLLATE pg_catalog."default",
    "idResidente" integer,
    estado text COLLATE pg_catalog."default",
    "rutaAdjunto" text COLLATE pg_catalog."default",
    "doctorAsignado" text COLLATE pg_catalog."default",
    "centroMedico" text COLLATE pg_catalog."default",
    "nombreAdjuntos"text COLLATE pg_catalog."default",
    "notasConsultaMedica" text COLLATE pg_catalog."default",
    "fechaCita" timestamp with time zone,
    CONSTRAINT "Citas_pkey" PRIMARY KEY ("idCita")
)
WITH (
    OIDS = FALSE
)


-- Table: Schema-datos.Medicamentos

-- DROP TABLE IF EXISTS "Schema-datos"."Medicamentos";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Medicamentos"
(
    "idMedicamento" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "nombreMedicamento" text COLLATE pg_catalog."default",
    descripcion text COLLATE pg_catalog."default",
    "stockDisponible" integer,
    miligramos text COLLATE pg_catalog."default",
    "fechaVencimiento" date,
    clasificacion text COLLATE pg_catalog."default",
    CONSTRAINT "Medicamentos_pkey" PRIMARY KEY ("idMedicamento")
)
WITH (
    OIDS = FALSE
)




-- Table: Schema-datos.MedicamentosXResidente

-- DROP TABLE IF EXISTS "Schema-datos"."MedicamentosXResidente";

CREATE TABLE IF NOT EXISTS "Schema-datos"."MedicamentosXResidente"
(
    "idMedicamentoXResidente" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "idResidente" integer NOT NULL,
    "idMedicamento" integer,
    "stokOcupado" integer,
    "stockConsumido" integer,

    tipo text COLLATE pg_catalog."default",
    CONSTRAINT "MedicamentosXResidente_pkey" PRIMARY KEY ("idMedicamentoXResidente")
)
WITH (
    OIDS = FALSE
)




-- Table: Schema-datos.Padecimientos

-- DROP TABLE IF EXISTS "Schema-datos"."Padecimientos";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Padecimientos"
(
    "idPadecimiento" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "nombrePadecimiento" text COLLATE pg_catalog."default",
    descripcion text COLLATE pg_catalog."default",
    "fechaPadecerlo" date,
    "idResidente" integer,
    criticidad text COLLATE pg_catalog."default",
    CONSTRAINT "Padecimientos_pkey" PRIMARY KEY ("idPadecimiento")
)
WITH (
    OIDS = FALSE
)




-- Table: Schema-datos.Permiso

-- DROP TABLE IF EXISTS "Schema-datos"."Permiso";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Permiso"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    id_rol numeric,
    id_ventana numeric,
    permiso_lectura boolean,
    permiso_escritura boolean,
    permiso_eliminar boolean,
    CONSTRAINT "Permiso_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)




-- Table: Schema-datos.Residentes

-- DROP TABLE IF EXISTS "Schema-datos"."Residentes";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Residentes"
(
    "idResidente" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nombre text COLLATE pg_catalog."default",
    apellidos text COLLATE pg_catalog."default",
    edad numeric,
    "fechaNacimiento" date,
    "telefonoFamiliar" text COLLATE pg_catalog."default",
    "nombreFamiliarCercano" text COLLATE pg_catalog."default",
    "parentezcoFamilar" text COLLATE pg_catalog."default",
    "direccionFamiliar" text COLLATE pg_catalog."default",
    "estadoCivil" text COLLATE pg_catalog."default",
    "parentezcoFamiliar" text COLLATE pg_catalog."default",
    "fechaIngreso" date,
    genero text COLLATE pg_catalog."default",
    habitacion text COLLATE pg_catalog."default",
    "idEncargado" integer,
    CONSTRAINT "Residentes_pkey" PRIMARY KEY ("idResidente")
)
WITH (
    OIDS = FALSE
)




-- Table: Schema-datos.Roles

-- DROP TABLE IF EXISTS "Schema-datos"."Roles";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Roles"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nombre text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Roles_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)




-- Table: Schema-datos.SignosVitales

-- DROP TABLE IF EXISTS "Schema-datos"."SignosVitales";

CREATE TABLE IF NOT EXISTS "Schema-datos"."SignosVitales"
(
    "idSignosVitales" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "presionArterial" text COLLATE pg_catalog."default",
    "frecuenciaCardiaca" text COLLATE pg_catalog."default",
    temperatura text COLLATE pg_catalog."default",
    "saturacionOxigeno" text COLLATE pg_catalog."default",
    "idResidente" integer,
    fecha timestamp with time zone,
    CONSTRAINT "SignosVitales_pkey" PRIMARY KEY ("idSignosVitales")
)
WITH (
    OIDS = FALSE
)




-- Table: Schema-datos.Usuarios

-- DROP TABLE IF EXISTS "Schema-datos"."Usuarios";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Usuarios"
(
    "idUsuario" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nombre text COLLATE pg_catalog."default",
    apellidos text COLLATE pg_catalog."default",
    edad numeric,
    "nombreUsuario" text COLLATE pg_catalog."default",
    contrasena text COLLATE pg_catalog."default",
    telefono text COLLATE pg_catalog."default",
    token text COLLATE pg_catalog."default",
    "idRol" numeric,
    "correoElectronico" text COLLATE pg_catalog."default",
    "contrasenaTemporal" boolean DEFAULT false,
    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("idUsuario")
)
WITH (
    OIDS = FALSE
)




-- Table: Schema-datos.Vacunas

-- DROP TABLE IF EXISTS "Schema-datos"."Vacunas";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Vacunas"
(
    "idVacuna" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "nombreVacuna" text COLLATE pg_catalog."default",
    descripcion text COLLATE pg_catalog."default",
    "fechaAplicacion" timestamp with time zone,
    "idResidente" integer,
    CONSTRAINT "Vacunas_pkey" PRIMARY KEY ("idVacuna")
)
WITH (
    OIDS = FALSE
)

-- Table: Schema-datos.Ventanas

-- DROP TABLE IF EXISTS "Schema-datos"."Ventanas";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Ventanas"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nombre text COLLATE pg_catalog."default" NOT NULL,
    ruta text COLLATE pg_catalog."default",
    CONSTRAINT "Ventanas_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
-- Table: Schema-datos.Fisioterapia

-- DROP TABLE IF EXISTS "Schema-datos"."Fisioterapia";

CREATE TABLE IF NOT EXISTS "Schema-datos"."Fisioterapia"
(
    "idFisioterapia" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    fecha timestamp with time zone,
    tratamiento text COLLATE pg_catalog."default",
    recomendaciones text COLLATE pg_catalog."default",
    "idRecidente" text COLLATE pg_catalog."default",
    CONSTRAINT "Fisioterapia_pkey" PRIMARY KEY ("idFisioterapia")
)
-- Table: Schema-datos.DosisDiaria

-- DROP TABLE IF EXISTS "Schema-datos"."DosisDiaria";

CREATE TABLE IF NOT EXISTS "Schema-datos"."DosisDiaria"
(
    "idDosisDiaria" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    fecha timestamp with time zone,
    aplicador text COLLATE pg_catalog."default",
    clasificacion text COLLATE pg_catalog."default",
    "idMedicamentoXResidente" numeric,
    cantidad numeric,
    CONSTRAINT "dosisDiaria_pkey" PRIMARY KEY ("idDosisDiaria")
)

