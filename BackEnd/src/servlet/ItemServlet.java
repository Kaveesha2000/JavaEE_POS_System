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

@WebServlet(urlPatterns = "/item")
public class ItemServlet extends HttpServlet {

    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            String option = req.getParameter("option");
            resp.setContentType("application/json");
            Connection connection = ds.getConnection();
            PrintWriter writer = resp.getWriter();

            switch (option) {
                case "SEARCH":
                    String itemId = req.getParameter("itemId");
                    PreparedStatement pstm = connection.prepareStatement("select * from item where itemId=?");
                    pstm.setObject(1, itemId);

                    ResultSet rst1 = pstm.executeQuery();

                    while (rst1.next()) {
                        String id = rst1.getString(1);
                        String itemName = rst1.getString(2);
                        String unitPrice = rst1.getString(3);
                        String qtyOnHand = rst1.getString(4);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

                        objectBuilder.add("itemId", id);
                        objectBuilder.add("itemName", itemName);
                        objectBuilder.add("unitPrice", unitPrice);
                        objectBuilder.add("qtyOnHand", qtyOnHand);

                    }

                    resp.setStatus(HttpServletResponse.SC_OK);

                    JsonObjectBuilder response1 = Json.createObjectBuilder();

                    response1.add("status", 200);
                    response1.add("message", "Done");
                    response1.add("data", "");

                    writer.print(response1.build());
                    break;

                case "GETALL":
                    ResultSet rst = connection.prepareStatement("select * from item").executeQuery();
                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder(); // json array
                    while (rst.next()) {
                        String id = rst.getString(1);
                        String itemName = rst.getString(2);
                        String unitPrice = rst.getString(3);
                        String qtyOnHand = rst.getString(4);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

                        objectBuilder.add("itemId", id);
                        objectBuilder.add("itemName", itemName);
                        objectBuilder.add("unitPrice", unitPrice);
                        objectBuilder.add("qtyOnHand", qtyOnHand);

                        arrayBuilder.add(objectBuilder.build());
                    }

                    resp.setStatus(HttpServletResponse.SC_OK);

                    JsonObjectBuilder response = Json.createObjectBuilder();

                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", arrayBuilder.build());

                    writer.print(response.build());
                    break;
            }
            connection.close();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //System.out.println("from customer servlet doPost method: " +req.getParameter("customerId"));
        String itemId = req.getParameter("itemId");
        String itemName = req.getParameter("itemName");
        String unitPrice = req.getParameter("unitPrice");
        String qtyOnHand = req.getParameter("qtyOnHand");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        try {
            Connection connection = ds.getConnection();
            PreparedStatement pstm = connection.prepareStatement("Insert into item values(?,?,?,?)");
            pstm.setObject(1, itemId);
            pstm.setObject(2, itemName);
            pstm.setObject(3, unitPrice);
            pstm.setObject(4, qtyOnHand);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder response = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                response.add("status", 200);
                response.add("message", "Successfully Added");
                response.add("data", "");
                writer.print(response.build());
            }
            connection.close();
        } catch (SQLException throwables) {
            resp.setStatus(HttpServletResponse.SC_OK); //200
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", resp.getStatus());
            response.add("message", "Error");
            response.add("data", throwables.getLocalizedMessage());
            writer.print(response.build());

            throwables.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String itemId = req.getParameter("itemId");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();
            PreparedStatement pstm = connection.prepareStatement("Delete from item where itemId=?");
            pstm.setObject(1, itemId);

            //System.out.println(itemId);
            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("data", "");
                objectBuilder.add("message", "Successfully Deleted");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("data", "Wrong Id Inserted");
                objectBuilder.add("message", "");
                writer.print(objectBuilder.build());
            }
            connection.close();

        } catch (SQLException throwables) {
            resp.setStatus(200);
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Error");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
        }

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        String itemId = jsonObject.getString("id");
        String itemName = jsonObject.getString("name");
        String unitPrice = jsonObject.getString("unitPrice");
        String qtyOnHand = jsonObject.getString("qtyOnHand");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();
            PreparedStatement pstm = connection.prepareStatement("Update item set itemName=?,unitPrice=?,qtyOnHand=? where  itemId=?");
            pstm.setObject(1, itemId);
            pstm.setObject(2, itemName);
            pstm.setObject(3, unitPrice);
            pstm.setObject(4, qtyOnHand);
            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Successfully Updated");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Update Failed");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }
            connection.close();
        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Update Failed");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
        }
    }

}
