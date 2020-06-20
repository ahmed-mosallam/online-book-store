package com.professional.onlinebookstore.models;

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Book {
 @Id
 @GeneratedValue(strategy=GenerationType.IDENTITY)
 private Long id;
 @Size(min=5 , max=100 , message="SKU At Least 5 Characters and Maximum 100")
 private String sku;
 @NotNull
 @Size(min=5 , max=100 , message="Book Name At Least 5 Characters and Maximum 100")
 private String name;
 private String description;
 @Column(name="Unit_Price")
 @NotNull
 private BigDecimal Price;
 @Column(name="Image_Url")
 private String imageUrl;
 @NotNull
 private boolean active;
 @Column(name="Units_In_Stock")
 private int stockUnits;
 @Column(name="Creation_Date")
 @NotNull
 private Date dateCreated;
 @Column(name="Last_Update")
 private Date lastUpdated;
 @ManyToOne
 @JoinColumn(name="category_id")
 @NotNull
 private BookCategory category;
}
