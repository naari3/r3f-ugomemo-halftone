# r3f-ugomemo-halftone

- https://naari3.github.io/r3f-ugomemo-halftone
- 輝度のような情報から、うごメモのような塗りをする何かが作れると思って shader を書いてみた
  - [./src/components/postprocessing/HalftonePass.tsx](./src/components/postprocessing/HalftonePass.tsx)
- https://github.com/nemutas/r3f-homunculus から fork
  - つまり、画面上のうにょうにょ(Distortion と Ripple)は @nemutas さんのコードを使用しています
  - あとは CRA を脱して vite で動くように
