package dao.impl;

import dao.custom.OrderDAO;
import entity.Order;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class OrderDAOImpl implements OrderDAO {

    @Override
    public boolean add(Order order, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public boolean update(Order order, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public boolean delete(String s, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public Order search(String s, Connection connection) throws SQLException {
        return null;
    }

    @Override
    public ArrayList<Order> getAll(Connection connection) throws SQLException {
        return null;
    }

    @Override
    public boolean ifOrderExist(String oid) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public String generateNewOrderId() throws SQLException, ClassNotFoundException {
        return null;
    }
}
