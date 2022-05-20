package dao.impl;

import dao.custom.OrderDetailDAO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class OrderDetailDAOImpl implements OrderDetailDAO {

    @Override
    public boolean add(OrderDetailDAO orderDetailDAO, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public boolean update(OrderDetailDAO orderDetailDAO, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public boolean delete(String s, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public OrderDetailDAO search(String s, Connection connection) throws SQLException {
        return null;
    }

    @Override
    public ArrayList<OrderDetailDAO> getAll(Connection connection) throws SQLException {
        return null;
    }
}
