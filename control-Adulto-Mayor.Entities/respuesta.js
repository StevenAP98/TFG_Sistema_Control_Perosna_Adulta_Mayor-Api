class Respuesta{

    constructor(ObjetoRespuesta, HayError, Mensaje, MensajeError, MensajeErrorDetallado, IdError) {
      this.ObjetoRespuesta=ObjetoRespuesta
      this.HayError = HayError;
      this.Mensaje = Mensaje;
      this.MensajeError = MensajeError;
      this.MensajeErrorDetallado = MensajeErrorDetallado;
      this.IdError = IdError;

    }
  
  }
    
    // Exporta la clase Mensaje para que pueda ser utilizada en otros archivos
    module.exports = Respuesta;

