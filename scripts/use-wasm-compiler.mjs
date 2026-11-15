// Astro's native compiler needs AVX instructions. On CPUs without them (for example the
// Celeron 2955U this site is developed on) loading it crashes the whole build with SIGILL.
// The compiler tries the native binary before its WebAssembly fallback, so on those CPUs we
// remove the native package after every install and Astro falls back to WebAssembly.
import { existsSync, readFileSync, rmSync } from "node:fs";

const cpuInfo = existsSync("/proc/cpuinfo") ? readFileSync("/proc/cpuinfo", "utf8") : "";
const native = "node_modules/@astrojs/compiler-binding-linux-x64-gnu";

if (cpuInfo && !/\bavx2\b/.test(cpuInfo) && existsSync(native)) {
  rmSync(native, { recursive: true, force: true });
  console.log("CPU without AVX2: using Astro's WebAssembly compiler.");
}
