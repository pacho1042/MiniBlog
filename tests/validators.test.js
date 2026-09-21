import { describe, test, expect } from "vitest";
import { validarId, validarBio, validarEmail, validarName, validarPublished, validarTitle } from "../utils/validators";

//TEST validar el email
describe("validarEmail",()=>{
    test("acepta email valido", ()=>{
        expect(validarEmail("test@ejemplo.com")).toBe(null);
    });
    test("email sin @", ()=>{
        expect(validarEmail("testejemplo.com")).toContain("inválido");
    });
    test("email sin .com", ()=>{
        expect(validarEmail("test@ejemplo")).toContain("inválido");
    });
    test("email indefinido", ()=>{
        expect(validarEmail(undefined)).toContain("requerido");
    });
    test("email con espacios", ()=>{
        expect(validarEmail("test @ejemplo.com")).toContain("inválido");
    });
    test("email solo con espacios", ()=>{
        expect(validarEmail("    ")).toContain("inválido");
    });

});

//TEST validar el nombre
describe ("validarName",()=>{
   test("acepta nombre valido",()=>{
   expect(validarName("Francisco Jose Delgado Ortega")).toBe(null);
   });
   test("nombre indefinido",()=>{
   expect(validarName(undefined)).toContain("requerido");
   });
   test("nombre con numeros",()=>{
   expect(validarName("Fr4nc15c0")).toContain("letras");
   });
   test("nombre No string",()=>{
   expect(validarName(123325)).toContain("String");
   });
   test("nombre vacio",()=>{
   expect(validarName("    ")).toContain("letras");
   });
   test("extension del nombre",()=>{
   expect(validarName("F")).toContain("caracteres");
   });
});

//validar datos del titulo
describe ("validarTitle",()=>{
    test("acepta titulo correcto",()=>{
    expect(validarTitle("Cien Años de Soledad")).toBe(null);
    });
    test("titulo indefinido",()=>{
    expect(validarTitle(undefined)).toContain("requerido");
    });
    test("titulo No string",()=>{
    expect(validarTitle(123325)).toContain("String");
    });
    test("titulo vacio",()=>{
    expect(validarTitle("    ")).toContain("vacío");
    });
    test("extension del titulo",()=>{
    expect(validarTitle("F")).toContain("caracteres");
    });
});

//validar publicidad
describe ("validarPublicidad",()=>{
    test("estado de publicacion correcta",()=>{
    expect(validarPublished(true)).toBe(null);
    });
    test("estado de publicacion incorrecta",()=>{
    expect(validarPublished("verdadero")).toContain("campo");
    });
});

//validar id
describe ("valdiarId",()=>{
   test("tipo de dato de id valido",()=>{
    expect(validarId(12)).toBe(null);
   });
   test("tipo de dato de id decimal",()=>{
    expect(validarId(0,2)).toContain("entero");
   });
   test("tipo de dato de id indefinido",()=>{
    expect(validarId(undefined)).toContain("entero");
   });
   test("tipo de dato de id vacio",()=>{
    expect(validarId("   ")).toContain("entero");
   });

});

//validar Bio
describe ("validarBio",()=>{
    test("biografia valida",()=>{
    expect(validarBio("Publico toda clase de libros para la audiencia")).toBe(null);
    });
    test("biografia No string",()=>{
    expect(validarBio(123325)).toContain("String");
    });
    test("extension de la biografia",()=>{
    expect(validarBio("F")).toContain("caracteres");
    });
});