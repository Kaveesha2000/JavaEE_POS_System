package dao.impl;

import dao.custom.QueryDAO;
import dto.CustomDTO;

import java.sql.SQLException;
import java.util.ArrayList;

public class QueryDAOImpl implements QueryDAO {
    @Override
    public ArrayList<CustomDTO> getOrderDetailsFromOrderID(String oid) throws SQLException, ClassNotFoundException {
        return null;
    }
}
