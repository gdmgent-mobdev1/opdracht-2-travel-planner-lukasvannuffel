import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@components/style/styles";

import "@components/pages/trips/form/TripForm";
import "@components/design/Typography/PageTitle";
import { consume } from "@lit/context";
import { tripContext } from "./TripDetailContainer";
import { Trip, TripBody } from "@core/modules/trips/Trip.types";
import { updateTrip } from "@core/modules/trips/Trip.api";

@customElement("trip-edit")
class TripEdit extends LitElement {
  @consume({ context: tripContext, subscribe: true })
  @property({ attribute: false })
  public trip?: Trip | null;

  render() {
    const { trip } = this;

    if (!trip) {
      return html``;
    }

    return html` <app-page-title>Klant aanpassen</app-page-title>
      <trip-form
        submitLabel="Aanpassen"
        .data=${trip}
        .method=${(body: TripBody) => updateTrip(trip._id, body)}
      ></trip-form>`;
  }

  static styles = [defaultStyles];
}

export default TripEdit;