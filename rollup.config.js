import { nodeResolve } from '@rollup/plugin-node-resolve';
import { lezer } from "@lezer/generator/rollup"

export default {
  input: "src/index.js",
  external: id => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
  output: [ { file: "dist/index.cjs", format: "cjs" },
            { dir: "./dist", format: "es" } ],
  plugins: [ lezer(), nodeResolve() ]
}
