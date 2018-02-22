SELECT * FROM bamazondb.products;
SELECT * from products;
SELECT * FROM bamazondb.products INNER JOIN top_songsdb.top_5000 ON products.item_id = top_5000.postion;
SELECT COUNT(*) cnt FROM bamazondb.products WHERE Item_id = 10;

