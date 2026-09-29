package cl.duoc.cloud.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Recurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer idRecurso;
    public String nombreRecurso;
    public String nombreCreador;
    public String descRecurso;
    public String categRecurso;
    public String rutaArchivo;
    public Integer descargas;

    public Recurso(String categRecurso, String descRecurso, Integer idRecurso, String nombreRecurso, String nombreCreador, String rutaArchivo, Integer descargas) {
        this.categRecurso = categRecurso;
        this.descRecurso = descRecurso;
        this.idRecurso = idRecurso;
        this.nombreRecurso = nombreRecurso;
        this.nombreCreador = nombreCreador;
        this.rutaArchivo = rutaArchivo;
        this.descargas = descargas;
    }

    public Recurso() {   
    }

    public Integer getIdRecurso() {
        return idRecurso;
    }

    public void setIdRecurso(Integer idRecurso) {
        this.idRecurso = idRecurso;
    }

    public String getNombreRecurso() {
        return nombreRecurso;
    }

    public void setNombreRecurso(String nombreRecurso) {
        this.nombreRecurso = nombreRecurso;
    }

    public String getNombreCreador(){
        return nombreCreador;
    }

    public void setNombreCreador(String nombreCreador) {
        this.nombreCreador = nombreCreador;
    }

    public String getDescRecurso() {
        return descRecurso;
    }

    public void setDescRecurso(String descRecurso) {
        this.descRecurso = descRecurso;
    }

    public String getCategRecurso() {
        return categRecurso;
    }

    public void setCategRecurso(String categRecurso) {
        this.categRecurso = categRecurso;
    }

    public String getRutaArchivo() {
        return rutaArchivo;
    }

    public void setRutaArchivo(String rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

    public Integer getDescargas() {
        return descargas;
    }

    public void setDescargas(Integer descargas) {
        this.descargas = descargas;
    }
}
