create table dbo.Category
(
	CategoryId int not null primary key identity(1,1),
	Category nvarchar(50) not null
)
USE PaintShop;

create table dbo.Product
(
	ProductId int not null primary key identity(1,1),
	NameOfProduct nvarchar(50) not null,
	NumberOfProducts int not null,
	Price int not null,
	[Description] nvarchar(1000) not null,
	Picture nvarchar(100) ,
	CategoryId int foreign key references dbo.Category(CategoryId)
)

create table [User]
(
	UserId int not null primary key identity(1,1),
	FirstName nvarchar(50) not null,
	SecondName nvarchar(50) not null,
	Pass nvarchar(100) not null,
	Mail nvarchar(50) not null,
	Picture nvarchar(50),
	RoleOfUser nvarchar(50) not null
)

create table dbo.Payment
(
	PaymentId int not null primary key identity(1,1),
	PaymentType nvarchar(50) not null
)

create table dbo.[Order]
(
	OrderId int not null primary key identity(1,1),
	UserId int foreign key references dbo.[User](UserId) not null,
	PaymentId int foreign key references dbo.Payment(PaymentId) not null,  
	Price int not null,
	OrderDate nvarchar(50) not null,
	CountOfProducts int not null,
)
drop table dbo.[Order]
create table dbo.ProductsOrders
(
	OrderId int foreign key references dbo.[Order](OrderId),
	ProductId int foreign key references dbo.Product(ProductId),
	primary key(OrderId, ProductId)
)


create table dbo.[Card]
(
	ProductId int foreign key references dbo.Product(ProductId),
	CountOfProducts int not null,
)

select * from dbo.[Order]
select * from dbo.ProductsOrders
drop table dbo.[Card] 
drop table dbo.[Order]
drop table dbo.Category
drop table dbo.Product

drop table dbo.ProductsOrders