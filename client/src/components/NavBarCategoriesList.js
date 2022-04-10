import React from 'react';
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

const NavBarCategoriesList = ({categories}) => {
    return (
        <DropdownMenu className={"dropdown-submenu"}>
            {categories.map(value =>
                <DropdownItem>
                    {value}
                </DropdownItem>
            )}
        </DropdownMenu>
    );
};

export default NavBarCategoriesList;