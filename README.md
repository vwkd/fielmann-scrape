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
  | select artikelnummer marke modell fassungsfarbe herstellerfarbcode price anchor-href images
  | rename -c {anchor-href: url}
  | sort-by marke modell fassungsfarbe
  | update price {|row| $row.price | str replace -r ' €$' '' }
  | update images {|row| $row.images | from json | get images-src | to json -r }
  | save data.csv
```

- download images

```nu
# note: don't use `par-each` because doesn't download all without failing, probably server silently drops requests due to overload
open data.csv
| each {|row|
  let foldername = $"($row.marke) ($row.modell) ($row.fassungsfarbe) ($row.artikelnummer)";
  let folderpath = $"images/($foldername)";
  mkdir $folderpath;
  cd $folderpath;
  $row.images
  | from json
  | enumerate
  | each {|it| 
  let filename = $"($it.index).($it.item
    | url parse
    | get path
    | path parse
    | get extension)";
  print $"Downloading '($foldername)/($filename)'"
  if ($filename | path exists) {
    print $"Skipping since already exists"
  } else {
    http get -H ['User-Agent' 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.3'] -r $it.item | save -r $filename
  }
  }
}
```
