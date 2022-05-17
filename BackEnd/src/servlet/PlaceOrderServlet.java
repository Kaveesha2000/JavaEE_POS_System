package servlet;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
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
                case "SEARCH":

                    break;
                case "GETALL":

                    break;
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
        try {
            //System.out.println("Request Received from Customer");
            String option = req.getParameter("option");
            PrintWriter writer = resp.getWriter();
            resp.setContentType("application/json");
            Connection connection = ds.getConnection();

            switch (option) {
                case "ADDOREDER":
                    String orderId = req.getParameter("orderId");
                    String custId = req.getParameter("customerComboBox");
                    String orderDate = req.getParameter("orderDate");
                    String cost = req.getParameter("cost");

                    try {
                        PreparedStatement pstm = connection.prepareStatement("Insert into `Order` values(?,?,?,?)");
                        pstm.setObject(1, orderId);
                        pstm.setObject(2, custId);
                        pstm.setObject(3, orderDate);
                        pstm.setObject(4, cost);

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
                    break;
                case "UPDATEQTYONHAND":

                    break;
            }
            connection.close();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
