package dao.impl;

import dao.CrudUtil;
import dao.custom.ItemDAO;
import entity.Item;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemDAOImpl implements ItemDAO {

    @Override
    public boolean add(Item item, Connection connection) throws SQLException {
        return CrudUtil.executeUpdate(
                "INSERT INTO Item VALUES(?,?,?,?)",
                connection,
                item.getItemId(), item.getItemName(), item.getUnitPrice(), item.getQtyOnHand()
        );
    }

    @Override
    public boolean update(Item item, Connection connection) throws SQLException {
        return CrudUtil.executeUpdate("UPDATE Item SET itemName=?,unitPrice=?,qtyOnHand=? WHERE itemId=?",
                connection,
                item.getItemName(),item.getUnitPrice(),item.getQtyOnHand(),item.getItemId()
        );
    }

    @Override
    public boolean delete(String id, Connection connection) throws SQLException {
        return CrudUtil.executeUpdate("DELETE FROM Item WHERE itemId=?",
                connection,
                id
        );
    }

    @Override
    public Item search(String id, Connection connection) throws SQLException {
        ResultSet rst = CrudUtil.executeQuery("SELECT * FROM Item WHERE itemId=?",
                connection,
                id
        );
        if (rst.next()){
            return new Item(
                    rst.getString(1),
                    rst.getString(2),
                    rst.getInt(3),
                    rst.getInt(4)
            );
        }else {
            return null;
        }
    }

    @Override
    public ArrayList<Item> getAll(Connection connection) throws SQLException {
        ResultSet rst = CrudUtil.executeQuery("SELECT * FROM Item",
                connection
        );
        ArrayList<Item> items = new ArrayList<>();
        while (rst.next()){
            items.add(new Item(
                    rst.getString(1),
                    rst.getString(2),
                    rst.getInt(3),
                    rst.getInt(4)
            ));
        }
        return items;
    }

    @Override
    public List<String> getCodes(Connection connection) throws SQLException {
        ResultSet rst = CrudUtil.executeQuery("SELECT itemId FROM Item ORDER BY itemId DESC LIMIT 1",
                connection
        );
        List<String> ids = new ArrayList<>();
        while (rst.next()) {
            ids.add(rst.getString(1));
        }
        return ids;
    }

    @Override
    public boolean updateQtyOnHand(String code, int qty, Connection connection) throws SQLException {
        return CrudUtil.executeUpdate("UPDATE Item SET qtyOnHand=(qtyOnHand - " + qty + " )  WHERE itemId=?",
                connection,
                code
        );
    }
}
