import React from "react";
import '../styles/Navbar.css'

const Navbar = ({ user }) => {

    function burgerClick(e) {
        document.querySelector('body').classList.toggle('lock')
        document.getElementById('header__menu').classList.toggle('active')
        document.getElementById('header__burger').classList.toggle('active')
    }

    function onClickLogout(e) {
        window.open("http://localhost:5000/auth/logout", "_self");
    }

    return (
        <>
            <header class="header">
                <div class="container">
                    <div class="header__body">
                        {  user ? (
                                <a href="" class="header__logo">
                                    <img class="img__logo" src={user.photos[0].value}/>
                                </a>
                            ) : (
                                <a href="" class="header__logo">
                                    <img class="img__logo" src='https://previews.123rf.com/images/maclife/maclife1502/maclife150200154/36909150-giraffe-logo-vector.jpg'/>
                                </a>
                            )
                        }
                        <div onClick={e => burgerClick(e)} id="header__burger" class="header__burger">
                            <span></span>
                        </div>
                        <nav id="header__menu" class="header__menu">
                            <ul class="headerl__list">
                                {
                                    user ? (
                                        <div className="li__container">
                                            <li>
                                                <a id="sort__by-name" href="/table" class="header__link">Table</a>
                                            </li> 
                                            <li>
                                                <a onClick={e => onClickLogout(e)} id="sort__by-name" href="#" class="header__link">Logout</a>
                                            </li> 
                                        </div>
                                    ) : (
                                        <>
                                            <li>
                                                <a id="sort__by-name" href="/" class="header__link">Home</a>
                                            </li>
                                            <li>
                                                <a id="sort__by-name" href="/table" class="header__link">Table</a>
                                            </li>
                                            <li>
                                                <a id="sort__by-name" href="/login" class="header__link">Login</a>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar