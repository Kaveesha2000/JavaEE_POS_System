package dao.custom;

import dao.CrudDAO;
import entity.OrderDetail;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public interface OrderDetailDAO extends CrudDAO<OrderDetail,String, Connection> {
    ArrayList<OrderDetail> searchOrderDetail(String id, Connection connection) throws SQLException;
    int countQtyOnHand(String id, Connection connection) throws SQLException;
}
