package servlet;

import bo.BOFactory;
import bo.custom.PurchaseOrderBO;
import dto.OrderDTO;
import dto.OrderDetailDTO;

import javax.annotation.Resource;
import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(urlPatterns = "/placeorder")
public class PlaceOrderServlet extends HttpServlet {

    private PurchaseOrderBO placeOrderBO = (PurchaseOrderBO) BOFactory.getBOFactory().getBO(BOFactory.BoTypes.PURCHASE_ORDER);

    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            String option = req.getParameter("option");
            String orderId = req.getParameter("orderId");
            resp.setContentType("application/json");
            Connection connection = ds.getConnection();
            PrintWriter writer = resp.getWriter();

            switch (option) {
                case "SEARCH":
                    OrderDTO order = placeOrderBO.searchOrder(orderId, connection);

                    JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                    objectBuilder.add("orderId",order.getOrderId());
                    objectBuilder.add("custId",order.getCustId());
                    objectBuilder.add("orderDate",order.getOrderDate());
                    objectBuilder.add("discount",order.getDiscount());
                    objectBuilder.add("cost",order.getCost());

                    writer.write(String.valueOf(objectBuilder.build()));
                    break;
                case "SEARCHDETAILS":

                    ArrayList<OrderDetailDTO> orderDetails = placeOrderBO.searchOrderDetail(orderId, connection);

                    JsonArrayBuilder arrayBuilder1 = Json.createArrayBuilder();

                    for (OrderDetailDTO orderDetail : orderDetails) {
                        JsonObjectBuilder ob = Json.createObjectBuilder();
                        ob.add("itemId",orderDetail.getItemId());
                        ob.add("orderId",orderDetail.getOrderId());
                        ob.add("qty",orderDetail.getQty());
                        ob.add("unitPrice",orderDetail.getUnitPrice());

                        arrayBuilder1.add(ob.build());
                    }
                    writer.write(String.valueOf(arrayBuilder1.build()));

                    break;

                case "GENERATEORDERID":

                    JsonObjectBuilder obj = Json.createObjectBuilder();
                    obj.add("orderId",placeOrderBO.getOrderId(connection));
                    writer.print(obj.build());

                    break;

            }
            connection.close();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException    {

        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        JsonArray items = jsonObject.getJsonArray("itemDetails");

        try {

            Connection  connection = ds.getConnection();
            ArrayList<OrderDetailDTO> orderDetailDTO = new ArrayList<>();
            for (JsonValue item : items) {
                JsonObject jo = item.asJsonObject();
                        orderDetailDTO.add(new OrderDetailDTO(
                                jo.getString("itemId"),
                                jo.getString("orderId"),
                                Integer.parseInt(jo.getString("qty")),
                                Integer.parseInt(jo.getString("unitPrice"))
                        ));
            }

            OrderDTO orderDTO = new OrderDTO(
                    jsonObject.getString("orderId"),
                    jsonObject.getString("custId"),
                    jsonObject.getString("orderDate"),
                    jsonObject.getInt("discount"),
                    jsonObject.getInt("cost"),
                    orderDetailDTO
            );

            if (placeOrderBO.placeOrder(orderDTO,connection)) {
                resp.setStatus(HttpServletResponse.SC_OK);
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message", "Successfully Purchased Order.");
                objectBuilder.add("status", resp.getStatus());
                writer.print(objectBuilder.build());

            }

            connection.close();

        } catch (SQLException e) {
            resp.setStatus(HttpServletResponse.SC_OK);

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("data",e.getLocalizedMessage());
            objectBuilder.add("message","Error");
            objectBuilder.add("status",resp.getStatus());
            writer.print(objectBuilder.build());

            e.printStackTrace();
        }
    }

}
