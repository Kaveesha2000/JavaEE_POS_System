package dao.impl;

import dao.custom.ItemDAO;
import entity.Item;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class ItemDAOImpl implements ItemDAO {

    @Override
    public boolean add(Item item, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public boolean update(Item item, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public boolean delete(String s, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public Item search(String s, Connection connection) throws SQLException {
        return null;
    }

    @Override
    public ArrayList<Item> getAll(Connection connection) throws SQLException {
        return null;
    }

    @Override
    public boolean ifItemExist(String code) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public String generateNewID() throws SQLException, ClassNotFoundException {
        return null;
    }
}
