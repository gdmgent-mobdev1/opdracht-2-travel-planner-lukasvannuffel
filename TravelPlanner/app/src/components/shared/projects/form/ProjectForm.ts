import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles, formStyles } from "@components/style/styles";
import { Router } from "@vaadin/router";
import { Project, ProjectBody } from "@core/modules/projects/Project.types";
import { AxiosResponse } from "axios";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import { getTrips } from "@core/modules/trips/Trip.api";
import { Trip } from "@core/modules/trips/Trip.types";

@customElement("project-form")
class ProjectForm extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: ProjectBody = {
    destination: "",
    tripId: "",
  };
  @property()
  trips: Array<Trip> | null = null;
  @property()
  submitLabel: String = "Toevoegen";
  @property()
  method: ((project: ProjectBody) => Promise<AxiosResponse<Project>>) | null = null;
  @property()
  onSuccess: (() => void) | null = null;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchTrips();
  }

  fetchTrips() {
    getTrips()
      .then(({ data }) => {
        this.trips = data;
      })
      .catch((error) => {
        this.error = error;
      });
  }

  handleSubmit = (event: Event) => {
    if (!this.method) {
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const project = {
      destination: formData.get("name") as string,
      tripId: formData.get("tripId") as string,
    };

    this.isLoading = true;

    this.method(project)
      .then(({ data }) => {
        if (this.onSuccess) {
          this.onSuccess();
        }
        Router.go(`/projects/${data._id}`);
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, error, submitLabel, handleSubmit, data } = this;

    return html` ${error ? html`<error-view error=${error} />` : ""}
      <form @submit=${handleSubmit}>
        <div class="form-control">
          <label class="form-control__label" for="name">Project naam</label>
          <input
            class="form-control__input"
            type="text"
            name="name"
            id="name"
            .value=${data.destination}
            placeholder="Project awesome"
            ?disabled=${isLoading}
            required
          />
        </div>
        <div class="form-control">
          <label class="form-control__label" for="name">Klant</label>
          <select
            class="form-control__input"
            type="text"
            name="tripId"
            id="tripId"
            .value=${data.tripId}
            ?disabled=${isLoading}
            required
          >
            <option>--</option>
            ${this.trips?.map((c) => {
              return html`<option value=${c._id} .selected=${c._id === data.tripId}>${c.destination}</option>`;
            })}
          </select>
        </div>
        <button class="btn-primary" type="submit" ?disabled=${isLoading}>${submitLabel}</button>
      </form>`;
  }

  static styles = [defaultStyles, formStyles, buttonStyles];
}

export default ProjectForm;