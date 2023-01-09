const Navigation = () => {
    return (
      <div>
        <nav className='navbar navbar-expand-lg bg-light'>
          <div className='container-fluid'>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <a className='nav-link active' aria-current='page' href='/'>
                    Orgs
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/repo?name=js-e2e'>
                    Repos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
  
  export default Navigation