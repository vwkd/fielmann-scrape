# README

Scrape products from Fielmann



## Features

- parse products
- download images
- render images with face



## Requirements

- Deno



## Usage

- open [URL](https://www.fielmann.de/brillen/) in a browser, create the desired filters, and show results
- set `BRAND`, `TARGET_GROUP`, `SHAPE`, `FACE_SHAPE` in `.env` with filter values from URL
- note: recommends to run script several times for multiple specific filters rather than single time for one unspecific filter to get multiple separate output directories instead of one commingled.

### Parse products

- run

```sh
deno task products
```

- can browse with Nushell
- beware: throws error if row has empty cell for selected column!
- beware: price is for rim only, needs to add price for lenses (e.g. 17€ for basic lenses), website shows price with basic lenses

```nu
open out/productsParsed.json | select ean brand modelName frameColor shape rimType bridgeType hingeType headWidth lensWidth bridgeWidth templeLength price
```

### Download images

- run

```sh
deno task images
```

### Render images

- set `FACE_PIC_FILEPATH` in `.env`
- run

```sh
deno task render
```
