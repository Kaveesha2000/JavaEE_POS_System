package listeners;

import org.apache.commons.dbcp2.BasicDataSource;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.sql.SQLException;

public class MyListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {

        System.out.println("Context listener Invoked");

        BasicDataSource bds = new BasicDataSource();
        bds.setDriverClassName("com.mysql.jdbc.Driver");
        bds.setUrl("jdbc:mysql://localhost:3306/company");
        bds.setUsername("root");
        bds.setPassword("1234");
        bds.setMaxTotal(5);
        bds.setInitialSize(5);

        ServletContext servletContext = servletContextEvent.getServletContext();
        servletContext.setAttribute("bds", bds);

    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

        try {
            System.out.println("Context Destroyed Invoked");
            ServletContext servletContext = servletContextEvent.getServletContext();
            BasicDataSource bds = (BasicDataSource) servletContext.getAttribute("bds");
            bds.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

    }
}
