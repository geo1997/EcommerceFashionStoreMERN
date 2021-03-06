import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {signOut, isValidated} from "../../validators";
import {itemTotal,deleteCart} from "./cartHandler";
import {deleteWishlist, itemWishTotal} from "./WishlistHandler";


const isActive = (history,path) => {
    if(history.location.pathname === path){
        return {color:'#ff6d00', textDecoration: 'none'}
    }else{
        return {color:'#fafafa' , textDecoration: 'none'}
    }
}

function Menus({history}) {
    return (
        <div>

        <Navbar className="py-3 dark bg-dark fixed-top "  style={{height:50}}>

            <Nav className="mr-auto  py-0">
                    <Nav.Link
                        as={Link} style={isActive(history,"/")} to="/"> Home
                    </Nav.Link>

                    <Nav.Link
                        as={Link} style={isActive(history,"/productshop")} to="/productshop"> Store
                    </Nav.Link>

                    {/*Show link to user dashboard when signed in*/}
                    {isValidated() && isValidated().user.userType === "user" && (
                        <Nav.Link
                            as={Link} style={isActive(history,"/user/userdashboard")} to="/user/userdashboard">Dashboard
                        </Nav.Link>
                    )}

                    {/*Show link to manager dashboard if user type is manager*/}
                    {isValidated() && isValidated().user.userType === "manager" && (
                        <Nav.Link
                            as={Link} style={isActive(history,"/manager/managerdashboard")} to="/manager/managerdashboard">Dashboard
                        </Nav.Link>
                    )}

                    {/*Show link to admin dashboard if user type is admin*/}
                    {isValidated() && isValidated().user.userType === "admin" && (
                        <Nav.Link
                            as={Link} style={isActive(history,"/admin/admindashboard")} to="/admin/admindashboard">Dashboard
                        </Nav.Link>
                    )}

                    {isValidated() && isValidated().user.userType === "user" && (
                    <Nav.Link
                        as={Link}style={isActive(history,"/cart")} to="/cart">Cart <sup><small>{itemTotal()}</small></sup>
                    </Nav.Link>
                    )}

                    {isValidated() && isValidated().user.userType === "user" && (
                        <Nav.Link
                            as={Link} style={isActive(history,"/wishlist")} to="/wishlist">Wishlist <sup><small>{itemWishTotal()}</small></sup>
                        </Nav.Link>
                    )}


                <Nav.Link
                    as={Link} style={{color:'#fafafa' , textDecoration: 'none' }} className="nav abs-center-x  rainbow" to="/"> <b><i>AUBRELLA </i></b>
                </Nav.Link>
            </Nav>

            {/*Hide signout when user not logged in*/}
            {!isValidated() && (
                <Fragment>
                    <Nav.Link
                        as={Link}  to="/signin" style={isActive(history,"/signin")} className="nav ml-auto" >Sign In
                    </Nav.Link>

                    <Nav.Link
                        as={Link} to="/signup" style={isActive(history,"/signup")}>Sign Up
                    </Nav.Link>
                </Fragment>
            )}

            {/*Hide signin and signup when logged in*/}
            {isValidated() && (
                <Nav.Link
                    as={Link} to="/" style={isActive(history,"/")} onClick={() => signOut(() => {
                        deleteCart();
                    deleteWishlist()})}>Sign Out
                </Nav.Link>
            )}
        </Navbar>
        </div>
    );
}

export default withRouter(Menus);
