import Link from 'next/link'
import React, { useRef } from 'react'

const Navbar = (props) => {
    const inputSearch = useRef("")
    const getSearchValue = () => {
        props.searchHandler(inputSearch.current.value)
    }
    return (
        <div>
            {/* <!-- Navbar --> */}
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                {/* <!-- Container wrapper --> */}
                <div className="container-fluid">
                    {/* <!-- Navbar brand --> */}
                    <a className="navbar-brand" href="#">
                        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" height="23" alt="" loading="lazy" />
                    </a>

                    {/* <!-- Toggle button --> */}
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* <!-- Collapsible wrapper --> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* <!-- Left links --> */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" passHref href={`/`}>
                                    <span className="nav-link active" aria-current="page" style={{ cursor: "pointer" }}>Home</span>
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">TV Shows</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Movies</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Recently Added</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">My List</a>
                            </li> */}
                        </ul>

                        <form className="d-flex input-group w-auto">
                            <input onChange={getSearchValue} ref={inputSearch} value={props.term} type="search" className="form-control" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar