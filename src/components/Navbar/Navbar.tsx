import React from 'react'

type NavbarProps = {

}

const Navbar:React.FunctionComponent<NavbarProps> = (props) => {

    return(
        <div className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid p-0">
                <a className="navbar-brand mr-5">OMDb</a>
                <form className="d-flex">
                    <input 
                        className="form-control mr-0" 
                        id="searchTitle" type="text" 
                        placeholder="Busca tu película o serie"
                        aria-label="Buscar" 
                    />
                    <button 
                        className="btn" 
                        id="button-search-title" 
                        type="submit"
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            {/* BOTÓN CARRITO */}
            {/* <!-- X --> */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">  
            </div>
            </div>
        </div>
    )
}

export default Navbar