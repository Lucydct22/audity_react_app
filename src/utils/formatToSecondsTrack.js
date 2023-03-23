export function formatToSecondsTrack(secs) {
  secs = parseInt(secs);
  let ss = secs % 60;
  const mm = Math.floor(secs / 60.0);
  if (ss < 10) { ss = "0" + ss }
  // if (mm < 10) { mm = "0" + mm }
  const fmt = mm + ":" + ss;
  return fmt;
}