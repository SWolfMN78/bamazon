SELECT * FROM bamazondb.products;
SELECT * from products;
SELECT * FROM bamazondb.products INNER JOIN top_songsdb.top_5000 ON products.item_id = top_5000.postion;
SELECT COUNT(*), COUNT(*) FROM bamazondb.products WHERE Item_id = 10;
SELECT item_id, product_name, stock_quantity FROM bamazondb.products;
UPDATE products SET stock_quantity = stock_quantity = 100 WHERE item_id = 1;
SELECT * FROM products WHERE item_id = 4;