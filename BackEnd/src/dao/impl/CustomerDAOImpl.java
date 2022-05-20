package dao.impl;

import dao.CrudUtil;
import dao.custom.CustomerDAO;
import entity.Customer;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class CustomerDAOImpl implements CustomerDAO {


    @Override
    public boolean add(Customer customer, Connection connection) throws SQLException {
        return CrudUtil.executeUpdate(
                "INSERT INTO Customer VALUES(?,?,?,?)",
                connection,
                customer.getCustomerId(), customer.getCustomerName(), customer.getCustomerAddress(), customer.getCustomerContact()
        );
    }

    @Override
    public boolean update(Customer customer, Connection connection) throws SQLException {
        return CrudUtil.executeUpdate("UPDATE Customer SET custName=?,custAddress=?,custContact=? WHERE custId=?",
                connection,
                customer.getCustomerName(),customer.getCustomerAddress(),customer.getCustomerAddress(),customer.getCustomerId()
        );
    }

    @Override
    public boolean delete(String s, Connection connection) throws SQLException {
        return CrudUtil.executeUpdate("DELETE FROM Customer WHERE custId=?",
                connection,
                s
        );
    }

    @Override
    public Customer search(String s, Connection connection) throws SQLException {
        ResultSet rst = CrudUtil.executeQuery("SELECT * FROM Customer WHERE custId=?",
                connection,
                s
        );
        if (rst.next()){
            return new Customer(
                    rst.getString(1),
                    rst.getString(2),
                    rst.getString(3),
                    rst.getString(4)
            );
        }else {
            return null;
        }
    }

    @Override
    public ArrayList<Customer> getAll(Connection connection) throws SQLException {
        ResultSet rst = CrudUtil.executeQuery("SELECT * FROM Customer",
                connection
        );
        ArrayList<Customer> customers = new ArrayList<>();
        while (rst.next()){
            customers.add(new Customer(
                    rst.getString(1),
                    rst.getString(2),
                    rst.getString(3),
                    rst.getString(4)
            ));
        }
        return customers;
    }

    @Override
    public int countCustomer(Connection connection) throws SQLException {
        return 0;
    }

    @Override
    public List<String> getIds(Connection connection) throws SQLException {
        ResultSet rst = CrudUtil.executeQuery("SELECT custId FROM Customer ORDER BY custId DESC LIMIT 1",
                connection
        );
        List<String> ids = new ArrayList<>();
        while (rst.next()) {
            ids.add(rst.getString(1));
        }
        return ids;
    }
}
