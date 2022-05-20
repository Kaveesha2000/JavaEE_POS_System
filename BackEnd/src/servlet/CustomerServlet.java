package servlet;

import bo.impl.CustomerBOImpl;
import dto.CustomerDTO;

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

@WebServlet(urlPatterns = "/customer")
public class CustomerServlet extends HttpServlet {

    CustomerBOImpl customerBO = new CustomerBOImpl();

    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            //System.out.println("Request Received from Customer");
            String option = req.getParameter("option");
            String custId = req.getParameter("custId");
            resp.setContentType("application/json");
            Connection connection = ds.getConnection();
            PrintWriter writer = resp.getWriter();

            switch (option) {
                case "SEARCH":

                    CustomerDTO customer = customerBO.searchCustomer(custId, connection);

                    JsonObjectBuilder objectBuilder1 = Json.createObjectBuilder();
                    objectBuilder1.add("custId",customer.getCustomerId());
                    objectBuilder1.add("custName",customer.getCustomerName());
                    objectBuilder1.add("custAddress",customer.getCustomerAddress());
                    objectBuilder1.add("custContact",customer.getCustomerContact());

                    writer.write(String.valueOf(objectBuilder1.build()));

                    break;
                case "GETALL":
                    ArrayList<CustomerDTO> allCustomer = customerBO.getAllCustomers(connection);
                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

                    for (CustomerDTO c : allCustomer) {
                        JsonObjectBuilder ob = Json.createObjectBuilder();
                        ob.add("custId",c.getCustomerId());
                        ob.add("custName",c.getCustomerName());
                        ob.add("custAddress",c.getCustomerAddress());
                        ob.add("custContact",c.getCustomerContact());
                        arrayBuilder.add(ob.build());
                    }
                    writer.write(String.valueOf(arrayBuilder.build()));

                    break;
                case "GENERATECUSTOMERID":
                    List<String> ids = customerBO.getCustomerIds(connection);
                    for (String id : ids) {
                        JsonObjectBuilder objectBuilder2 = Json.createObjectBuilder();
                        objectBuilder2.add("custId",id);
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

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        try {
            Connection connection = ds.getConnection();

            CustomerDTO customer = new CustomerDTO(
                    jsonObject.getString("custId"),
                    jsonObject.getString("custName"),
                    jsonObject.getString("custAddress"),
                    jsonObject.getString("custContact")
            );

            if (customerBO.saveCustomer(customer,connection)) {
                resp.setStatus(HttpServletResponse.SC_OK);
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message", "Customer Successfully Added.");
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
        String customerID = req.getParameter("custId");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();

            if (customerBO.deleteCustomer(customerID,connection)) {

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

            CustomerDTO customer = new CustomerDTO(
                    jsonObject.getString("custId"),
                    jsonObject.getString("custName"),
                    jsonObject.getString("custAddress"),
                    jsonObject.getString("custContact")
            );

            if (customerBO.updateCustomer(customer,connection)) {
                resp.setStatus(HttpServletResponse.SC_OK);
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message","Customer Successfully Updated.");
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