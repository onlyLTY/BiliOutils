export function scf_handler() {
  return require('./index.scf').main_handler;
}

export function fc_handler() {
  return require('./index.fc').handler;
}

export function cfc_handler() {
  return require('./index.cfc').handler;
}

export function run() {
  require('./index');
}

export const agc_handler = cfc_handler;
export const fg_handler = cfc_handler;

export default run;
