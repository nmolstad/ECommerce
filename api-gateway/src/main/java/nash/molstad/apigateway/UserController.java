package nash.molstad.apigateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user-repository")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(path = "/{username}/{password}", method = RequestMethod.GET)
    public boolean checkUser(@PathVariable String username, @PathVariable String password) {
        User u = userRepository.findById(username).orElse(null);

        if(u != null) {
            return u.getPassword().equals(password);
        }

        return false;
    }

    @RequestMapping(path = "/")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
