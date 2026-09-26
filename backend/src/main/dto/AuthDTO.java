package cl.duoc.cloud.dto;

public class AuthDTO {
    public record RegistroDTO(
        String nombre,
        String apellido,
        String correo,
        String contrasena 
    ){}

    public record LoginDTO(
        String correo,
        String contrasena
    ) {}
}
