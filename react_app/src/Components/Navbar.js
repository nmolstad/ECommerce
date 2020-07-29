import React from "react";
import { Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar bg-dark mb-4 fixed-top">
            <div className="mb-3 d-flex w-100 justify-content-center">
                <div className="w-100 d-flex flex-column">
                    <Link to={`/`} className="btn text-light"><h1><strong>E-Commerce</strong></h1></Link>
                    <div className="w-100 d-flex justify-content-between">
                        <Link to={`/add-item`} className="btn btn-light float-left">
                            Create item
                        </Link>
                        <Link to={`/cart`} className="btn btn-light float-right">
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;