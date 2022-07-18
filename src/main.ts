export function scf_handler() {
  return require('./index.scf').main_handler;
}

export function fc_handler() {
  return require('./index.fc').handler;
}

export function cfc_handler() {
  return require('./index.cfc').handler;
}

export function qinglong() {
  require('./index.ql');
}

export function run() {
  require('./index');
}

export function runInputTasks(task: string) {
  return require('./task').runInputBiliTask(task);
}

export const agc_handler = cfc_handler;
export const fg_handler = cfc_handler;
export const ql = qinglong;

export default run;
