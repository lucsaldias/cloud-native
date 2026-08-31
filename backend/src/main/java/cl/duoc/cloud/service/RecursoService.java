package cl.duoc.cloud.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cl.duoc.cloud.entity.Recurso;
import cl.duoc.cloud.repository.RecursoRepository;

@Service
public class RecursoService {
    @Autowired
    private RecursoRepository recursoRepository;

    public List<Recurso> obtenerRecursos() {
        return recursoRepository.findAll();
    }

    public Recurso guardarRecurso(Recurso rec) {
        return recursoRepository.save(rec);
    }
    
    public Optional<Recurso> obtenerRecursoPorId(Integer id){
        return recursoRepository.findById(id);
    }

    public boolean eliminarRecursoPorId (Integer id){
        if (recursoRepository.existsById(id)){
            recursoRepository.deleteById(id);
            return true;
        } else {return false;}
    }

    public Optional<Recurso> actualizarRecurso(Integer id, Recurso recursoActualizado){
        return recursoRepository.findById(id).map(recursoExistente -> {
            recursoExistente.setNombreRecurso(recursoActualizado.getNombreRecurso());
            recursoExistente.setDescRecurso(recursoActualizado.getDescRecurso());
            recursoExistente.setCategRecurso(recursoActualizado.getCategRecurso());
            recursoExistente.setRutaArchivo(recursoActualizado.getRutaArchivo());

            return recursoRepository.save(recursoExistente);
        });
    }
}
