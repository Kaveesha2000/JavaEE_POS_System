package dao.impl;

import dao.CrudUtil;
import dao.custom.OrderDetailDAO;
import entity.OrderDetail;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class OrderDetailDAOImpl implements OrderDetailDAO {

    @Override
    public boolean add(OrderDetail orderDetail, Connection connection) throws SQLException {
        return CrudUtil.executeUpdate(
                "INSERT INTO Orderdetail VALUES(?,?,?,?)",
                connection,
                orderDetail.getItemId(),orderDetail.getOrderId(),orderDetail.getQty(),orderDetail.getUnitPrice()
        );
    }

    @Override
    public boolean update(OrderDetail orderDetail, Connection connection) throws SQLException {
        throw new UnsupportedOperationException("No Supported Yet.");
    }

    @Override
    public boolean delete(String s, Connection connection) throws SQLException {
        throw new UnsupportedOperationException("No Supported Yet.");
    }

    @Override
    public OrderDetail search(String s, Connection connection) throws SQLException {
        throw new UnsupportedOperationException("No Supported Yet.");
    }

    @Override
    public ArrayList<OrderDetail> getAll(Connection connection) throws SQLException {
        throw new UnsupportedOperationException("No Supported Yet.");
    }

    @Override
    public ArrayList<OrderDetail> searchOrderDetail(String id, Connection connection) throws SQLException {
        ResultSet rst = CrudUtil.executeQuery("SELECT * FROM orderdetail WHERE orderId=?",
                connection,
                id
        );
        ArrayList<OrderDetail> orderDetails = new ArrayList<>();
        while (rst.next()){
            orderDetails.add(new OrderDetail(
                    rst.getString(1),
                    rst.getString(2),
                    rst.getInt(3),
                    rst.getInt(4)
            ));
        }
        return orderDetails;
    }
}
