console.clear();
export function validar(input) {
    const tipo = input.dataset.tipo;
    if (validadores[tipo]) {
        validadores[tipo](input);
    };
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('span').innerHTML='';
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('span').innerHTML=mostrarError(tipo,input);
    }
    // console.log(input.validity);
};
const mensajeError = {
    nombre:{
        valueMissing: 'Este Campo no puede estas Vacio'
    },
    email:{
        valueMissing: 'Este Campo no puede estas Vacio',
        typeMismatch: 'El correo no es valido',
    },
    password: {
        valueMissing: 'Este Campo no puede estas Vacio',
        patternMismatch: 'Al menos 8 caracteres, máximo 16, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.',
    },
    nacimiento:{
        valueMissing: 'Este Campo no puede estas Vacio',
        customError: 'Debes tener al menos 18 años de edad'
    },
    telefono: {
        valueMissing: 'Este Campo no puede estas Vacio',
        patternMismatch: 'Ingresa un telefono valido entre 8 a 10 numeros.',
    },
    direccion: {
        valueMissing: 'Este Campo no puede estas Vacio',
        patternMismatch: 'Ingresa una direccion valida, debe contener entre 10 a 100 caracteres.',
    },
    ciudad: {
        valueMissing: 'Este Campo no puede estas Vacio',
        patternMismatch: 'Ingresa una ciudad valida, debe contener entre 10 a 100 caracteres.',
    },
    provincia: {
        valueMissing: 'Este Campo no puede estas Vacio',
        patternMismatch: 'Ingresa una provincia valida, debe contener entre 10 a 100 caracteres.',
    }

}
const tiposErrores = [
    'typeMismatch',
    'patternMismatch',
    'customError',
    'valueMissing',
]
const mostrarError = (tipo,input)=>{
    let mensaje = '';
    tiposErrores.forEach(err=>{
        if(input.validity[err]){
            mensaje=mensajeError[tipo][err];
        }
    })
    return mensaje;
}
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}