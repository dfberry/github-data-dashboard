import packageInfo from '../package.json';

const Footer = () => {
    return (
      <div className='container'>
        <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
        <a href="https://github.com/dfberry/github-data-dashboard">v{packageInfo.version}</a>
        </footer>
      </div>
    )
  }
  
  export default Footer