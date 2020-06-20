package com.professional.onlinebookstore.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="book_category")
@Getter
@Setter
@ToString
public class BookCategory {
 @Id
 @GeneratedValue(strategy=GenerationType.IDENTITY)
 private Long id ;
 @Column(name="Category_Name")
 @NotNull
 @Size(min=5 , max= 100 , message="Category Name At Least 5 Characters and Maximum 100")
 private String categoryName;
 @OneToMany(cascade=CascadeType.ALL ,mappedBy="category")
 private List<Book> book;
}
