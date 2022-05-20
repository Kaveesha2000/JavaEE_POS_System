package dao.custom;

import dao.CrudDAO;
import entity.Order;

import java.sql.Connection;
import java.sql.SQLException;

public interface OrderDAO extends CrudDAO<Order,String, Connection> {
    String getOrderId(Connection connection) throws SQLException;
}
