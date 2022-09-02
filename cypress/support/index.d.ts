declare namespace Cypress {
  interface Chainable {
    sr(): Chainable<JQuery<HTMLElement>>;
    getByAutomationId<E extends Node = HTMLElement>(id: string): Chainable<JQuery<E>>;
    getInputByLabel<E extends Node = HTMLElement>(label: string): Chainable<JQuery<E>>;
    getSelectByLabel<E extends Node = HTMLElement>(label: string): Chainable<JQuery<E>>;
  }
}
