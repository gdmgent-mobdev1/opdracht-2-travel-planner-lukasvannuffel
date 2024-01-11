import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@components/style/styles";
import { consume } from "@lit/context";
import { TripContext, tripContext } from "./TripDetailContainer";

import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";
import "@components/design/Button/Button";

@customElement("trip-detail")
class TripDetail extends LitElement {
  @consume({ context: tripContext, subscribe: true })
  @property({ attribute: false })
  public tripContextValue?: TripContext | null;

  render() {
    const { tripContextValue } = this;

    if (!tripContextValue || !tripContextValue.trip) {
      return html``;
    }

    const { trip } = tripContextValue;

    if (!trip) {
      return html``;
    }

    return html`
      <app-page-header>
        <app-page-title>${trip.destination}</app-page-title>
        <app-button href="/trips/${trip._id}/edit" color="secondary">Aanpassen</app-button>
      </app-page-header>
    `;
  }

  static styles = [defaultStyles];
}

export default TripDetail;