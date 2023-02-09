import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to="/">Azure-sample</Link> &nbsp;|&nbsp;
            <Link to="/orgmeta">Good & Bad</Link> &nbsp;|&nbsp;
            <Link to="/repo?name=js-e2e">Repos</Link> &nbsp;|&nbsp;
            <Link to="/summary">Summary</Link>&nbsp;
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
