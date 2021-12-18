go
USE PaintShop;
drop table dbo.Product;

INSERT dbo.Payment VALUES ('Карта')

INSERT dbo.Product VALUES ('Белая краска', '5' , 10 , 'это тоже норм', 'src/1.png',1)
INSERT dbo.Product VALUES ('Жёлтая краска', '5' , 'гавно краска не нравится', 'src/2.jpg',1)
INSERT dbo.Product VALUES ('Чёрная краска', '10' , 1)
INSERT dbo.Product VALUES ('Жёлтая краска', '10' , 1)
INSERT dbo.Product VALUES ('Синяя краска', '10' , 1)
INSERT dbo.Product VALUES ('Фиолетовая краска', '10' , 1)
INSERT dbo.Product VALUES ('Оранжевая краска', '10' , 1)
INSERT dbo.Product VALUES ('Белая краска', '10' , 1)
 delete from dbo.Product where ProductId = 4;
select * from dbo.Product;
INSERT dbo.Category VALUES('Краска')
select * from dbo.Product
UPDATE dbo.Product 
SET Picture = 'src/3.jpg' where ProductId = 3;
insert dbo.[User] values ('Manager','Manager','$2a$11$ZMXKFM2lFFJKLbmU838rAeN7dw2xXcnivYGIjJrhPJNnR4ec8YwTe','hello@mail.ru', null, 'Manager')
select * from dbo.Product
delete from dbo.Product where ProductId = 8