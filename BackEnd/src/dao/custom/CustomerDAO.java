package dao.custom;

import dao.CrudDAO;
import entity.Customer;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface CustomerDAO extends CrudDAO<Customer,String, Connection> {
    List<String> getIds(Connection connection) throws SQLException;
}
