package cl.duoc.cloud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.duoc.cloud.entity.Recurso;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Integer>{
    
}
