package servlet;

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

@WebServlet(urlPatterns = "/placeorder")
public class PlaceOrderServlet extends HttpServlet {

    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            //System.out.println("Request Received from Customer");
            String option = req.getParameter("option");
            resp.setContentType("application/json");
            Connection connection = ds.getConnection();
            PrintWriter writer = resp.getWriter();

            switch (option) {
                /*case "SEARCH":

                    break;
                case "GETALL":

                    break;*/
                case "GENERATEORDERID":
                    ResultSet rst3 = connection.prepareStatement("select orderId FROM `order` ORDER BY orderId DESC LIMIT 1").executeQuery();
                    while (rst3.next()){
                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("orderId",rst3.getString(1));
                        writer.print(objectBuilder.build());
                    }
                    break;
            }
            connection.close();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        PrintWriter writer = resp.getWriter();
        Connection connection = null;
        try {

            resp.setContentType("application/json");
            connection = ds.getConnection();

            JsonReader reader = Json.createReader(req.getReader());
            JsonObject jsonObject = reader.readObject();
            JsonArray items = jsonObject.getJsonArray("itemDetails");

            connection.setAutoCommit(false);

            PreparedStatement pstm = connection.prepareStatement("Insert into `Order` values(?,?,?,?,?)");
            pstm.setObject(1,jsonObject.getString("oId"));
            pstm.setObject(2,jsonObject.getString("cId"));
            pstm.setObject(3,jsonObject.getString("date"));
            pstm.setObject(4,jsonObject.getInt("discount"));
            pstm.setObject(5,jsonObject.getInt("fullTotal"));

            if (pstm.executeUpdate()>0) {

                for (JsonValue item : items) {

                    JsonObject jasonObject2 = item.asJsonObject();

                    PreparedStatement pstm1 = connection.prepareStatement("Insert into orderdetail values(?,?,?,?)");
                    pstm1.setObject(1,jasonObject2.getString("itemId"));
                    pstm1.setObject(2,jasonObject2.getString("oId"));
                    pstm1.setObject(3,jasonObject2.getString("qty"));
                    pstm1.setObject(4,jasonObject2.getString("unitPrice"));

                    String itemId = jasonObject2.getString("itemId");
                    int qty = Integer.parseInt(jasonObject2.getString("qty"));

                    if (pstm1.executeUpdate()>0){
                        PreparedStatement ptm = connection.prepareStatement("update Item set qtyOnHand = (qtyOnHand - qty)  where itemId= itemId");
                        if (ptm.executeUpdate()>0){
                            connection.setAutoCommit(true);
                        }else {
                            connection.rollback();
                        }
                    }else {
                        connection.rollback();
                    }

                }
                connection.commit();

                resp.setStatus(HttpServletResponse.SC_OK);
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message", "Successfully Purchased Order.");
                objectBuilder.add("status", resp.getStatus());
                writer.print(objectBuilder.build());
            }else {
                connection.rollback();
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

        }finally {
            try {

                connection.setAutoCommit(true);

            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
