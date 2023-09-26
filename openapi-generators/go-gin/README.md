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

If you take a look at the newly generated `openapi.yml` file you'll see 3 documented endpoints. Explore the `optic.yml` file for details on various ways you can generate traffic to Optic.
