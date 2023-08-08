import React from 'react'
import '../assets/style.css';
const Navbar = () => {
    return(
    <div className="navbar navbar-expand border-bottom">
    <div class="logo">
        <h1 class="text-light"><b>UBB</b></h1>
    </div>
    <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
    </div>
    </div>
    );
}
export default Navbar; 
