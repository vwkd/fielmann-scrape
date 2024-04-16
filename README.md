# README

Scrape products from Fielmann



## Features

- parse products
- download images
- render images with face



## Requirements

- Deno



## Usage

- open https://www.fielmann.de/brillen/ in a browser, create the desired filters, and show results
- note: recommends to run script multiple times for multiple specific filters to get multiple separate ouput directories, rather than single time for single unspecific filter to get single output directory
- copy the filters from the URL into `.env`
- parse products

```sh
deno task products
```

- note: can browse with Nushell
- note: beware of empty cells, throws error if row has empty cell for selected column
- note: price is for rim only, needs to add price for lenses (e.g. 17€ for basic lenses), website shows price with basic lenses

```sh
open out/productsParsed.json | select ean brand modelName frameColor shape rimType bridgeType hingeType headWidth lensWidth bridgeWidth templeLength price
```

- download images

```sh
deno task images
```

- render images

```sh
deno task render
```
