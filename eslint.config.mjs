import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // react-hooks/immutability (React Compiler rule) assumes hook return
    // values are never mutated, but react-three-fiber's useFrame contract is
    // exactly the opposite: it runs outside React's render/commit cycle and
    // is meant for direct, per-frame mutation of three.js objects (camera,
    // meshes, materials) for performance. This is the documented R3F
    // pattern, not a bug, so the rule is scoped off for WebGL code.
    files: [
      "src/components/webgl/**/*.{ts,tsx}",
      "src/lib/three/**/*.{ts,tsx}",
      "src/lib/stages/**/*.{ts,tsx}",
    ],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
