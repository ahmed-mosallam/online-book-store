package com.professional.onlinebookstore.repository;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import com.professional.onlinebookstore.models.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
	@RestResource(path="category")
   Page<Book> findByCategoryId(@Param("id") long id , Pageable pageble);
	
    @RestResource(path="bookname")
   Page<Book> findByNameContaining(@Param("name") String searchText , Pageable pageble);
   
}
