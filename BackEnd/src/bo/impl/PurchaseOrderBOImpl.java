package bo.impl;

import bo.custom.PurchaseOrderBO;
import dto.CustomerDTO;
import dto.ItemDTO;
import dto.OrderDTO;
import dto.OrderDetailDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class PurchaseOrderBOImpl implements PurchaseOrderBO {

    @Override
    public boolean placeOrder(OrderDTO orderDTO, Connection connection) {
        return false;
    }

    @Override
    public boolean saveOrderDetail(OrderDTO orderDTO, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public boolean updateQtyOnHand(String code, int qty, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public String getOrderId(Connection connection) throws SQLException {
        return null;
    }

    @Override
    public ArrayList<OrderDetailDTO> searchOrderDetail(String id, Connection connection) throws SQLException {
        return null;
    }

    @Override
    public OrderDTO searchOrder(String id, Connection connection) throws SQLException {
        return null;
    }
}
