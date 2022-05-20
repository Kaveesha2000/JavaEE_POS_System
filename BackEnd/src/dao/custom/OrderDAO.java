package dao.custom;

import dao.CrudDAO;
import entity.Order;

import java.net.ConnectException;
import java.sql.Connection;
import java.sql.SQLException;

public interface OrderDAO extends CrudDAO<Order,String, Connection> {
    boolean ifOrderExist(String oid) throws SQLException, ClassNotFoundException;
    String generateNewOrderId() throws SQLException, ClassNotFoundException;
}
