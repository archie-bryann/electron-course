1. Create React Typescript Project

```bash
npm create vite .
```

2. Install electron

```bash
npm install --save-dev electron
```

<!-- OR

```bash
npm install -g cnpm --registry=http://registry.npm.taobao.org
```

```bash
cnpm install --save-dev electron
``` -->

3. Install electron-builder

```bash
npm i --save-dev electron-builder
```

<!-- OR

```bash
cnpm i --save-dev electron-builder
``` -->

4. Install cross-env

```bash
npm i --save-dev cross-env
```

5. Install npm-run-all to run multiple commands in parallel

```bash
npm i --save-dev npm-run-all
```

6.

Make app draggable with the element when `frame` is set to `false` in `main.ts`

```css
header {
  -webkit-app-region: drag;
}
```

Make element undraggable

```css
header button {
  -webkit-app-region: no-drag;
}
```

2:16:21
