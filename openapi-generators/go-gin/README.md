# Generating an OpenAPI specification with Optic and Go

An example API written with the Go Gin web framework to demonstrate generating an OpenAPI v3 specification.

## Dependencies
- [Go](https://go.dev/doc/install)
- [Optic](https://www.useoptic.com/docs)
- [Curl](https://curl.se) (optional)
- [Hurl](https://hurl.dev) (optional)
- [HTTPie](https://httpie.io) (optional)


## Generating an OpenAPI file with Optic Capture

1. Install deps, `go mod tidy`.
1. Run capture, `optic capture --update automatic`.

If you take a look at newly generated `openapi.yml` file. You'll see 3 documented endpoints that correspond to the requests made in the `requests.send` section of the `optic.yml` file.

You can experiment with generating the traffic from external commands or scripts by uncommenting any of the `requests.run` blocks.
