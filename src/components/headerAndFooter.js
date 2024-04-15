class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
      <div class="icon">
      <a href="/">
      <img src="/assets/YFN icon.png" />
      </a>
    </div>
        <nav class="navbar">

            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="/" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                <a href="/addSuccess" class="nav-link">Add Success</a>
            </li>
                <li class="nav-item">
                    <a href="/about" class="nav-link">About YFN</a>
                </li>
                <li class="nav-item">
                    <a href="/team" class="nav-link">Team</a>
                </li>
                <li class="nav-item">
                    <a href="https://youngfounders.network" class="nav-link">Be part of YFN</a>
                </li>
                <li class="nav-item">
                <a href="/auth/logout" class="nav-link">Logout</a>
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
      >Made with 💛 in Berlin by
      <a href="https://github.com/Joelheile"> Joel Heil Escobar</a></span
    >
  </footer>  
      `;
  }
}

customElements.define("main-footer", Footer);
