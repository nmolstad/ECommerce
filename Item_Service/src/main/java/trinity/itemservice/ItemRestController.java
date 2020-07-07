package trinity.itemservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemRestController {

    @Autowired
    private ItemJPARepository itemJPARepository;

    @RequestMapping(path = "", method = RequestMethod.POST)
    public void createItem(@RequestBody Item item) {
        itemJPARepository.save(item);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PATCH)
    public void updateItem(@RequestBody Item newItem, @PathVariable("id") int itemID) {
        Item oldItem = itemJPARepository.findByItemId(itemID);
        itemJPARepository.delete(oldItem);
        itemJPARepository.save(newItem);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Item getItem(@PathVariable("id") int id) {
        System.out.println(itemJPARepository.findByItemId(id).toString());
        return itemJPARepository.findByItemId(id);
    }

    @RequestMapping(path = "/all", method = RequestMethod.GET)
    public List<Item> getAllItems() {
        return itemJPARepository.findAll();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void deleteItem(@PathVariable("id") int id) {
        itemJPARepository.delete((itemJPARepository.findByItemId(id)));
    }



}
