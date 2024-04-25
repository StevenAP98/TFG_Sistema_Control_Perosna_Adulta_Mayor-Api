// usuario.js

class Usuario {

  constructor(idUsuario, nombre, apellidos, edad) {
    this.idUsuario = idUsuario;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.nombreUsuario = this.nombreUsuario
    this.contrasena = this.contrasena
    this.telefono = this.telefono
    this.rol = this.rol
    
  }

}
  
  // Exporta la clase Usuario para que pueda ser utilizada en otros archivos
  module.exports = Usuario;