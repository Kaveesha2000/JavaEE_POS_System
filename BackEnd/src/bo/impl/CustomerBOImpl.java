package bo.impl;

import bo.custom.CustomerBO;
import dao.DAOFactory;
import dao.custom.CustomerDAO;
import dto.CustomerDTO;
import entity.Customer;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CustomerBOImpl implements CustomerBO {

    private CustomerDAO customerDAO = (CustomerDAO)DAOFactory.getDAOFactory().getDAO(DAOFactory.DAOTypes.CUSTOMER);

    @Override
    public boolean saveCustomer(CustomerDTO customerDTO, Connection connection) throws SQLException {
        return customerDAO.add(new Customer(
                        customerDTO.getCustomerId(),
                        customerDTO.getCustomerName(),
                        customerDTO.getCustomerAddress(),
                        customerDTO.getCustomerContact()),
                connection
        );
    }

    @Override
    public boolean updateCustomer(CustomerDTO customerDTO, Connection connection) throws SQLException {
        return customerDAO.update(new Customer(
                        customerDTO.getCustomerId(),
                        customerDTO.getCustomerName(),
                        customerDTO.getCustomerAddress(),
                        customerDTO.getCustomerContact()),
                connection
        );
    }

    @Override
    public boolean deleteCustomer(String id, Connection connection) throws SQLException {
        return customerDAO.delete(id, connection);
    }

    @Override
    public CustomerDTO searchCustomer(String id, Connection connection) throws SQLException {
        Customer search = customerDAO.search(id, connection);
        if (search == null){
            return null;
        }else {
            return new CustomerDTO(
                    search.getCustomerId(),
                    search.getCustomerName(),
                    search.getCustomerAddress(),
                    search.getCustomerContact()
            );
        }
    }

    @Override
    public ArrayList<CustomerDTO> getAllCustomers(Connection connection) throws SQLException {
        ArrayList<Customer> all = customerDAO.getAll(connection);
        ArrayList<CustomerDTO> allCustomer = new ArrayList<>();
        for (Customer customer : all) {
            allCustomer.add(new CustomerDTO(
                    customer.getCustomerId(),
                    customer.getCustomerName(),
                    customer.getCustomerAddress(),
                    customer.getCustomerContact()
            ));
        }
        return allCustomer;
    }


    @Override
    public List<String> getCustomerIds(Connection connection) throws SQLException {
        return customerDAO.getIds(connection);
    }
}
