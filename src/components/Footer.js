import React from 'react';
import '../assets/sass/footer.sass';

const SRC_REPOS = {
  frontend: 'https://github.com/jimmychu0807/parity-ha-ui',
  backend: 'https://github.com/jimmychu0807/parity-ha-runtime',
};

const Footer = (props) => {
  return <footer className="footer text-center">
    <hr/>
    <div>
      Built with
      <span role='img' aria-label='love'> ❤️ </span>
      by Jimmy Chu  | &nbsp;
      <i className="fab fa-github fa-lg fa-fw"/>&nbsp;
      <a href={SRC_REPOS.frontend} target="_blank"
        rel="noopener noreferrer">frontend</a>,&nbsp;
      <a href={SRC_REPOS.backend} target="_blank"
        rel="noopener noreferrer">backend</a>
    </div>
  </footer>
}

export default Footer;
