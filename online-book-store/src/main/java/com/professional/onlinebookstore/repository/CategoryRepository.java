package com.professional.onlinebookstore.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import com.professional.onlinebookstore.models.BookCategory;

@RepositoryRestResource(collectionResourceRel="bookCategory" , path="book-category")
public interface CategoryRepository extends JpaRepository<BookCategory, Long> {
    @Query("select id from BookCategory where categoryName=?1")
    @RestResource(path="categoryname")
	int findIdByName(@Param("categoryName") String name);
}
