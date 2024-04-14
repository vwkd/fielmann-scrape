# README

Scrape products from Fielmann



## Requirements

- Deno



## Usage

- open https://www.fielmann.de/brillen/ in a browser, create the desired filters, and show results
- note: recommends to run script multiple times for multiple specific filters to get multiple separate ouput directories, rather than single time for single unspecific filter to get single output directory
- copy the filters from the URL into `.env`
- fetch products

```sh
deno task products
```
