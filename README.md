# README

Scrape products from Fielmann



## Requirements

- Google Chrome and [Webscraper](https://webscraper.io/) Chrome extension
- Nushell



## Usage

- (optional) replace `startUrl` in sitemap with filtered one
- scrape website using sitemap and Webscraper
- export data as CSV
- clean data

```nu
open fielmann.csv
  | select model color price anchor-href images
  | rename -c {anchor-href: url}
  | sort-by model color
  | update price {|row| $row.price | str replace -r ' €$' '' }
  | update images {|row| $row.images | from json | get images-src | to json -r }
  | save data.csv
```
