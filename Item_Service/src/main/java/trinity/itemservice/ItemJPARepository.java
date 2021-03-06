package trinity.itemservice;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemJPARepository extends JpaRepository<Item, Integer> {

    Item findByItemId(int itemId);
}
