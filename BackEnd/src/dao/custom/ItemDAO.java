package dao.custom;

import dao.CrudDAO;
import entity.Item;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface ItemDAO extends CrudDAO<Item,String, Connection> {
    List<String> getCodes(Connection connection) throws SQLException;
    boolean updateQtyOnHand(String code, int qty, Connection connection) throws SQLException;
}
