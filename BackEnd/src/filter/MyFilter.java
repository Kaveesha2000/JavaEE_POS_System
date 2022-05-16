package filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebFilter(urlPatterns = "/*")
public class MyFilter implements Filter {

    public MyFilter() {

        System.out.println("Object Created from MyFilter");
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("My Filter Initialized");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("doFilter method invoked in MyFilter class");

        //HttpServletRequest req = (HttpServletRequest)servletRequest;// not used
        HttpServletResponse res = (HttpServletResponse)servletResponse;

        filterChain.doFilter(servletRequest, servletResponse);

        PrintWriter writer = servletResponse.getWriter();
        //writer.write("Added from MyFilter");

        res.addHeader("MyCompany","IJSE");
    }

    @Override
    public void destroy() {
        System.out.println("Destroy method invoked");
    }
}
