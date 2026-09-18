export function validarEmail(email){
  
    if(!email)
    {
        return "El email es requerido";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email?.trim() || !emailRegex.test(email.trim())) {
    return "El formato del email es inválido";
    }
   
  return null;
};

export function validarName(name){

   if(!name){

      return "El nombre es requerido";
   }
   if(typeof name !== "string")
    {
        return "El nombre debe ser tipo String";
    }
   const nameRegex  = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;

    if (!name?.trim() || !nameRegex.test(name.trim())) {
        return "El nombre solo debe contener letras";
    }
    
    if(name.trim().length<2 || name.trim().length>100){

        return "El nombre debe tener entre 2 y 100 caracteres";
    }

   return null;
};

export function validarTitle(title){

   if(!title){

      return "El titulo es requerido";
   }

    if(typeof title !== "string")
    {
        return "El titulo debe ser tipo String";
    }

    if(title.trim().length==0)
    {
        return "El titulo no puede ser vacío";
    }
    if(title.trim().length<2 || title.trim().length>200){

        return "El titulo debe tener entre 2 y 200 caracteres";
    }

   return null;
};

export function validarPublished(published){

if (published !== undefined && typeof published !== "boolean") {
    return  "El campo published debe ser true o false";
}

    return null;
};

export function validarAutorId(id){

    if (typeof id === "string" && id.trim().length === 0) {
        return "El id debe ser un número entero válido";
    }   
   
    if (!id || isNaN(id) || !Number.isInteger(Number(id))) {
      return  "El id debe ser un número entero válido";
     }
     return null;
};

export function validarBio(bio){

    // Si no vino, es válido (campo opcional)
    if (bio === undefined) {
        return null;
    }

    if (typeof bio !== "string") {
        return "La biografía debe ser tipo String";
    }

    const bioLimpia = bio.trim();

    if (bioLimpia.length <= 2 || bioLimpia.length >= 200) {
        return "La biografía debe tener entre 2 y 200 caracteres";
    }
    return null;
};

