package bo.impl;

import bo.custom.ItemBO;
import dao.DAOFactory;
import dao.custom.ItemDAO;
import dto.ItemDTO;
import entity.Item;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemBOImpl implements ItemBO {

    private ItemDAO itemDAO = (ItemDAO) DAOFactory.getDAOFactory().getDAO(DAOFactory.DAOTypes.ITEM);

    @Override
    public boolean saveItem(ItemDTO itemDTO, Connection connection) throws SQLException {
        return itemDAO.add(new Item(
                        itemDTO.getItemId(),
                        itemDTO.getItemName(),
                        itemDTO.getUnitPrice(),
                        itemDTO.getQtyOnHand()),
                connection
        );
    }

    @Override
    public boolean updateItem(ItemDTO itemDTO, Connection connection) throws SQLException {
        return itemDAO.update(new Item(
                        itemDTO.getItemId(),
                        itemDTO.getItemName(),
                        itemDTO.getUnitPrice(),
                        itemDTO.getQtyOnHand()),
                connection
        );
    }

    @Override
    public boolean deleteItem(String id, Connection connection) throws SQLException {
        return itemDAO.delete(id, connection);
    }

    @Override
    public ItemDTO searchItem(String id, Connection connection) throws SQLException {
        Item search = itemDAO.search(id, connection);
        if (search == null){
            return null;
        }else {
            return new ItemDTO(
                    search.getItemId(),
                    search.getItemName(),
                    search.getUnitPrice(),
                    search.getQtyOnHand()
            );
        }
    }

    @Override
    public ArrayList<ItemDTO> getAllItems(Connection connection) throws SQLException {
        ArrayList<Item> all = itemDAO.getAll(connection);
        ArrayList<ItemDTO> allItem = new ArrayList<>();
        for (Item item : all) {
            allItem.add(new ItemDTO(
                    item.getItemId(),
                    item.getItemName(),
                    item.getUnitPrice(),
                    item.getQtyOnHand()
            ));
        }
        return allItem;
    }

    @Override
    public List<String> getItemCodes(Connection connection) throws SQLException {
        return itemDAO.getCodes(connection);
    }
}
