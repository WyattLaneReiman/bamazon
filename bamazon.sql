create database bamazon;

use bamazon;

create table products (
			item_id integer(50) auto_increment not null,
            primary key (item_id),
            product_name varchar(50) not null,
            department_name varchar(50),
            price integer(50) not null,
            stock_quantity integer(50) not null
	);
    
insert into products (product_name, department_name, price, stock_quantity)
values ("Camera", "Electronics", 400, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("Television", "Electronics", 1200, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("Toilet Paper", "Bathroom", 8, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Hand Soap", "Bathroom", 7, 50);

insert into products (product_name, department_name, price, stock_quantity)
values ("Towel", "HouseHold", 15, 50);

insert into products (product_name, department_name, price, stock_quantity)
values ("Chair", "HouseHold", 25, 40);

insert into products (product_name, department_name, price, stock_quantity)
values ("Water Gun", "Toys", 15, 30);

insert into products (product_name, department_name, price, stock_quantity)
values("Board Game", "Toys", 20, 30);

insert into products (product_name, department_name, price, stock_quantity)
values("T-Shirt", "Clothes", 25, 50);

insert into products (product_name, department_name, price, stock_quantity)
values("Pants", "Clothes", 40, 50);

select * from products;

update products 
set stock_quantity = 50 where item_id = 10;



            
            
            
