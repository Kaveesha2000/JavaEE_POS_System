package bo.impl;

import bo.custom.PurchaseOrderBO;
import dao.DAOFactory;
import dao.custom.ItemDAO;
import dao.custom.OrderDAO;
import dao.custom.OrderDetailDAO;
import dto.OrderDTO;
import dto.OrderDetailDTO;
import entity.Order;
import entity.OrderDetail;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class PurchaseOrderBOImpl implements PurchaseOrderBO {

    private OrderDetailDAO orderDetailDAO = (OrderDetailDAO) DAOFactory.getDAOFactory().getDAO(DAOFactory.DAOTypes.ORDERDETAILS);
    private OrderDAO orderDAO = (OrderDAO) DAOFactory.getDAOFactory().getDAO(DAOFactory.DAOTypes.ORDER);
    private ItemDAO itemDAO = (ItemDAO) DAOFactory.getDAOFactory().getDAO(DAOFactory.DAOTypes.ITEM);

    @Override
    public boolean placeOrder(OrderDTO orderDTO, Connection connection) {
        Connection con = null;
        try {
            con = connection;
            con.setAutoCommit(false);

            boolean ifSaveOrder = orderDAO.add(new Order(
                            orderDTO.getOrderId(),
                            orderDTO.getCustId(),
                            orderDTO.getOrderDate(),
                            orderDTO.getDiscount(),
                            orderDTO.getCost()),
                    connection
            );

            if (ifSaveOrder){
                if (saveOrderDetail(orderDTO,connection)){
                    con.commit();
                    return true;
                }else {
                    con.rollback();
                    return false;
                }
            }else {
                con.rollback();
                return false;
            }
        } catch (SQLException throwables) {
        } finally {
            try {

                con.setAutoCommit(true);

            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }

        return true;
    }

    @Override
    public boolean saveOrderDetail(OrderDTO orderDTO, Connection connection) throws SQLException {
        for (OrderDetailDTO item : orderDTO.getItems()) {
            boolean ifOrderDetailSaved = orderDetailDAO.add(new OrderDetail(
                            item.getItemId(), item.getOrderId(), item.getQty(), item.getUnitPrice()),
                    connection
            );
            if (ifOrderDetailSaved){
                if (updateQtyOnHand(item.getItemId(),item.getQty(),connection)){

                }else {
                    return false;
                }
            }else {
                return false;
            }
        }

        return false;
    }

    @Override
    public boolean updateQtyOnHand(String code, int qty, Connection connection) throws SQLException {
        return itemDAO.updateQtyOnHand(code,qty,connection);
    }

    @Override
    public String getOrderId(Connection connection) throws SQLException {
        return orderDAO.getOrderId(connection);
    }

    @Override
    public int countOrders(Connection connection) throws SQLException {
        return orderDAO.countOrders(connection);
    }

    @Override
    public double findNetTotal(Connection connection) throws SQLException {
        return orderDAO.findNetTotal(connection);
    }

    @Override
    public ArrayList<OrderDetailDTO> searchOrderDetail(String id, Connection connection) throws SQLException {
        ArrayList<OrderDetail> orderDetails = orderDetailDAO.searchOrderDetail(id, connection);
        ArrayList<OrderDetailDTO> orderDetailDTOS = new ArrayList<>();

        for (OrderDetail orderDetail : orderDetails) {
            orderDetailDTOS.add(new OrderDetailDTO(
                    orderDetail.getOrderId(),
                    orderDetail.getItemId(),
                    orderDetail.getQty(),
                    orderDetail.getUnitPrice()
            ));
        }
        return orderDetailDTOS;
    }

    @Override
    public OrderDTO searchOrder(String id, Connection connection) throws SQLException {
        Order search = orderDAO.search(id, connection);
        return new OrderDTO(
                search.getOrderId(),
                search.getCustId(),
                search.getOrderDate(),
                search.getDiscount(),
                search.getCost()
        );
    }

    @Override
    public int countQtyOnHand(String code, Connection connection) throws SQLException {
        return orderDetailDAO.countQtyOnHand(code,connection);
    }

}
