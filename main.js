class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="icon">
          <img src="assets/YFN icon.png" />
          <h1>Success Tracker</h1>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/pages/addSuccess.html">Add Success</a>
          <a href="/pages/about.html">About YFN</a>
          <a href="/pages/team.html">Team</a>
          <a href="www.youngfounders.network">Be part of</a>
          <div class="animation start-home"></div>
        </nav>
      </header>
      `;
  }
}
customElements.define("main-header", Header);

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
