package cl.duoc.cloud.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.Optional;

import cl.duoc.cloud.entity.Usuario;
import cl.duoc.cloud.repository.UsuarioRepository;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Map<String, String> dto) {
        String correo = dto.get("correo");

        if (usuarioRepository.existsByCorreo(correo)) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("mensaje", "El correo ya esta registrado"));
        }

        Usuario nuevoUsuario = new Usuario(
            dto.get("nombre"),
            dto.get("apellido"),
            dto.get("correo"),
            dto.get("contrasena")
        );

        usuarioRepository.save(nuevoUsuario);

        return ResponseEntity.ok(Map.of("mensaje", "Usuario registrado con exito."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dto) {
        String correo = dto.get("correo");
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(correo);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("mensaje", "Correo o Contraseña incorrectos."));
        }

        Usuario usuario = usuarioOpt.get();

        if (!usuario.getContrasena().equals(dto.get("contrasena"))) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("mensaje", "Correo o Contraseña incorrectos."));
        }

        return ResponseEntity.ok(Map.of(
            "mensaje", "Inicio de sesion exitoso",
            "token", "mock-jwt-token-xyz-123",
            "correo", usuario.getCorreo()
        ));
    }
}
