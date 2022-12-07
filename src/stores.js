import { writable } from "svelte/store";

export const password = writable(undefined);
export let notify = writable(undefined);
export let notifyMessage = writable(undefined);
