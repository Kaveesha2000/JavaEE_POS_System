package servlet;

import bo.impl.CustomerBOImpl;
import bo.impl.ItemBOImpl;
import dto.CustomerDTO;
import dto.ItemDTO;

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
import java.util.List;

@WebServlet(urlPatterns = "/item")
public class ItemServlet extends HttpServlet {

    ItemBOImpl itemBO = new ItemBOImpl();

    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            String option = req.getParameter("option");
            String itemId = req.getParameter("itemId");
            resp.setContentType("application/json");
            Connection connection = ds.getConnection();
            PrintWriter writer = resp.getWriter();

            switch (option) {
                case "SEARCH":
                    ItemDTO item = itemBO.searchItem(itemId, connection);

                    JsonObjectBuilder objectBuilder1 = Json.createObjectBuilder();
                    objectBuilder1.add("itemId",item.getItemId());
                    objectBuilder1.add("itemName",item.getItemName());
                    objectBuilder1.add("unitPrice",item.getUnitPrice());
                    objectBuilder1.add("qtyOnHand",item.getQtyOnHand());

                    writer.write(String.valueOf(objectBuilder1.build()));

                    break;

                case "GETALL":
                    ArrayList<ItemDTO> allItem = itemBO.getAllItems(connection);
                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

                    for (ItemDTO c : allItem) {
                        JsonObjectBuilder ob = Json.createObjectBuilder();
                        ob.add("itemId",c.getItemId());
                        ob.add("itemName",c.getItemName());
                        ob.add("unitPrice",c.getUnitPrice());
                        ob.add("qtyOnHand",c.getQtyOnHand());
                        arrayBuilder.add(ob.build());
                    }
                    writer.write(String.valueOf(arrayBuilder.build()));

                    break;
                case "GENERATEITEMID":
                    List<String> ids = itemBO.getItemCodes(connection);
                    for (String id : ids) {
                        JsonObjectBuilder objectBuilder2 = Json.createObjectBuilder();
                        objectBuilder2.add("itemId",id);
                        writer.print(objectBuilder2.build());
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
        //System.out.println("from customer servlet doPost method: " +req.getParameter("customerId"));

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        try {
            Connection connection = ds.getConnection();

            ItemDTO item = new ItemDTO(
                    jsonObject.getString("itemId"),
                    jsonObject.getString("itemName"),
                    Integer.parseInt(jsonObject.getString("unitPrice")),
                    Integer.parseInt(jsonObject.getString("qtyOnHand"))
            );

            if (itemBO.saveItem(item,connection)) {
                resp.setStatus(HttpServletResponse.SC_OK);
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message", "Item Successfully Added.");
                objectBuilder.add("status", resp.getStatus());
                writer.print(objectBuilder.build());
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

            if (itemBO.deleteItem(itemId,connection)) {

                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("message","Customer Successfully Deleted.");
                objectBuilder.add("status",resp.getStatus());
                writer.print(objectBuilder.build());

            }else {

                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message","Wrong Id Inserted.");
                objectBuilder.add("status",400);
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

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();

            ItemDTO item = new ItemDTO(
                    jsonObject.getString("itemId"),
                    jsonObject.getString("itemName"),
                    Integer.parseInt(jsonObject.getString("unitPrice")),
                    Integer.parseInt(jsonObject.getString("qtyOnHand"))
            );

            if (itemBO.updateItem(item,connection)) {
                resp.setStatus(HttpServletResponse.SC_OK);
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message","Item Successfully Updated.");
                objectBuilder.add("status",resp.getStatus());
                writer.print(objectBuilder.build());

            }else{
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message","Update Failed.");
                objectBuilder.add("status",400);
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
