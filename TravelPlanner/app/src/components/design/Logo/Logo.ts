import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@components/style/styles";

@customElement("app-logo")
class Logo extends LitElement {
  render() {
    return html`<img class="logo" src="/logo.png" alt="Travellerz" />`;
  }

  static styles = [
    defaultStyles,
    css`
      .logo {
        width: 100%;
        max-width: 10.8125rem;
      }
    `,
  ];
}

export default Logo;