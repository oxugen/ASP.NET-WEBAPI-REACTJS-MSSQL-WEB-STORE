go
USE PaintShop;
drop table dbo.Product;

INSERT dbo.Payment VALUES ('�����')

INSERT dbo.Product VALUES ('����� ������', '5' , 10 , '��� ���� ����', 'src/1.png',1)
INSERT dbo.Product VALUES ('Ƹ���� ������', '5' , '����� ������ �� ��������', 'src/2.jpg',1)
INSERT dbo.Product VALUES ('׸���� ������', '10' , 1)
INSERT dbo.Product VALUES ('Ƹ���� ������', '10' , 1)
INSERT dbo.Product VALUES ('����� ������', '10' , 1)
INSERT dbo.Product VALUES ('���������� ������', '10' , 1)
INSERT dbo.Product VALUES ('��������� ������', '10' , 1)
INSERT dbo.Product VALUES ('����� ������', '10' , 1)
 delete from dbo.Product where ProductId = 4;
select * from dbo.Product;
INSERT dbo.Category VALUES('������')
select * from dbo.Product
UPDATE dbo.Product 
SET Picture = 'src/3.jpg' where ProductId = 3;
insert dbo.[User] values ('Manager','Manager','$2a$11$ZMXKFM2lFFJKLbmU838rAeN7dw2xXcnivYGIjJrhPJNnR4ec8YwTe','hello@mail.ru', null, 'Manager')
select * from dbo.Product
delete from dbo.Product where ProductId = 8