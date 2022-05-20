package bo.impl;

import bo.custom.ItemBO;
import dto.ItemDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemBOImpl implements ItemBO {

    @Override
    public boolean saveItem(ItemDTO itemDTO, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public boolean updateItem(ItemDTO itemDTO, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public boolean deleteItem(String id, Connection connection) throws SQLException {
        return false;
    }

    @Override
    public ItemDTO searchItem(String id, Connection connection) throws SQLException {
        return null;
    }

    @Override
    public ArrayList<ItemDTO> getAllItems(Connection connection) throws SQLException {
        return null;
    }

    @Override
    public int countItem(Connection connection) throws SQLException {
        return 0;
    }

    @Override
    public List<String> getItemCodes(Connection connection) throws SQLException {
        return null;
    }
}
