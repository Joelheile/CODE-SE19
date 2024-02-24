class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
      <div class="icon">
      <img src="../assets/YFN icon.png" />
      <h1>Success Tracker</h1>
    </div>
        <nav class="navbar">

            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="/index.html" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="/pages/about.html" class="nav-link">About YFN</a>
                </li>
                <li class="nav-item">
                    <a href="/pages/team.html" class="nav-link">Team</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Be Part of</a>
                </li>
            </ul>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </nav>
</header>

      `;
  }
}
customElements.define("main-header", Header);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `    
    <footer>
    <span
      >Made with 💛 by
      <a href="https://github.com/Joelheile"> Joel Heil Escobar</a></span
    >
  </footer>  
      `;
  }
}

customElements.define("main-footer", Footer);
