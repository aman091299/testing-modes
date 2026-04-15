//components/Sidebar.js

import React from 'react';
import Link from 'next/link';
const Sidebar = () => {
    console.log("Inside side bar")
    return (
        <section id="sidebar">
            <a href="#" className="brand">
                <img src=
"https://media.geeksforgeeks.org/gfg-gg-logo.svg" alt="GFG Logo" />
                <span className="text"> admin Panel</span>
            </a>
            <ul className="side-menu top">
                <li className="active">
                 
                        <i className="bx bxs-dashboard"></i>
                        <span className="text">
                        <Link href="/register">
                        User Register link
                          </Link>  
                        </span>
                   
                </li>
                <li>
                    <Link href="#">
                        <i className="bx bxs-cart-add"></i>
                        <span className="text">
                            Orders
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <i className="bx bxs-store"></i>
                        <span className="text">
                            Products
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <i className="bx bxs-user"></i>
                        <span className="text">
                            Customers
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <i className="bx bxs-chart"></i>
                        <span className="text">
                            Analytics
                        </span>
                    </Link>
                </li>
            </ul>
            <ul className="side-menu">
                <li>
                    <Link href="#">
                        <i className="bx bxs-cog"></i>
                        <span className="text">
                            Settings
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="#" className="logout">
                        <i className="bx bxs-log-out-circle"></i>
                        <span className="text">
                            Logout
                        </span>
                    </Link>
                </li>
            </ul>
        </section>
    );
};

export default Sidebar;