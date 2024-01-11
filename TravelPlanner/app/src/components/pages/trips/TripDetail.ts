import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@components/style/styles";
import { consume } from "@lit/context";
import { Trip } from "@core/modules/trips/Trip.types";
import { tripContext } from "./TripDetailContainer";

import "@components/design/Typography/PageTitle";

@customElement("trip-detail")
class TripDetail extends LitElement {
  @consume({ context: tripContext, subscribe: true })
  @property({ attribute: false })
  public trip?: Trip | null;

  render() {
    const { trip } = this;

    if (!trip) {
      return html``;
    }

    return html`
      <app-page-title>${trip.destination}</app-page-title>
      <a href="/trips/${trip._id}/edit">Edit</a>
    `;
  }

  static styles = [defaultStyles];
}

export default TripDetail;