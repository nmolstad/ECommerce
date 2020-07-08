package trinity.randomitemcreation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item")
public class ItemRestController {

        @Autowired
        private ItemJPARepository itemJPARepository;

        private void addItems(int amount) {

            for(int i = 0; i < amount; i++) {
                Item item = new Item();

                StringBuilder itemSB = new StringBuilder();
                itemSB.append("item ").append(i);
                item.setTitle(itemSB.toString());

                StringBuilder descSB = new StringBuilder();
                descSB.append("This is ").append(itemSB.toString());
                item.setDescription(descSB.toString());

                double price = (int) ((Math.random() * 9000) + 100) / 100.0;
                item.setUnitPrice(price);

                itemJPARepository.save(item);

            }
        }

        @RequestMapping(path = "/{amount}", method = RequestMethod.POST)
        public void creatItem(@PathVariable("amount") int amount) {
            addItems(amount);
        }
}
