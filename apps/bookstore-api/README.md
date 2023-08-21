# Bookstore API

Bookstore API built using Fastify and Typescript with Optic. Generates an OpenAPI spec using `@fastify/swagger` and tracks changes using Optic. We have set up Optic to:
- [preview API changes in PRs](#preview-api-changes-in-prs)
- [test for breaking changes](https://github.com/opticdev/bookstore-api/pull/1)
- [enforce the API style guide](https://github.com/opticdev/bookstore-api/pull/3)
- [share our API changelog and documentation with consumers](#accurate-documentation-and-changelogs)

Take a look at the guides or just dig around the repo. You can start a server or generate an OpenAPI spec from the code.

## Running this repo locally

To run this locally, you will need [node >= 16](https://nodejs.org/en) and [yarn](https://yarnpkg.com/getting-started/install).

Get started by installing dependencies:

`yarn install`

And then run one of the following commands:
- `yarn start:local` - starts the server
- `yarn generate-spec` - generates an OpenAPI spec from code definitions

## Preview API changes in PRs

Take a look at the [open pull requests of the repo](https://github.com/opticdev/bookstore-api/pulls). It's difficult to know how the code changes will impact your API. Optic adds preview documentation and an API changelog to each PR so every developer on your team knows exactly what changes to the API have been proposed. 

Here are a couple of examples of what Optic can do:
- [Optic caught a breaking change](https://github.com/opticdev/bookstore-api/pull/1)
- A small line of code can change multiple endpoints. [Optic makes it easy to see the effective API changes being proposed](https://github.com/opticdev/bookstore-api/pull/2)
- [Adding 2 new query parameters that do not follow our team's naming conventions](https://github.com/opticdev/bookstore-api/pull/3)

## Accurate documentation and changelogs

Every time this repositories main branch is updated, a new version of your API is pushed to Optic. Developers on your team, or your consumers (if public), can see a complete API changelog, and accurate documentation for the API. 

- [View the Optic Changelog](https://app.useoptic.com/organizations/32613bcd-704e-4661-85f0-7b3d75613fb0/apis/Ru2Me4G-2nIro-cj4Bbib)
![optic changelog](/images/changelog.png)
- [View diffs between different API versions](https://app.useoptic.com/organizations/32613bcd-704e-4661-85f0-7b3d75613fb0/apis/Ru2Me4G-2nIro-cj4Bbib/operations/get.%2Fauthors%2F%7BauthorId%7D?diffTag=fyXT_OAvfLfjlipBFl2Xw)
![diff two versions](/images/diff-versions.png)
- [Preview documentation and changes in pull requests](https://github.com/opticdev/bookstore-api/pull/2#issuecomment-1613615164)
![preview changes](/images/preview-changes.png)

You can also add badges to your repository that show you how often your API is changing and the number of endpoints you have.

[![Optic badge of documentation](https://app.useoptic.com/organizations/32613bcd-704e-4661-85f0-7b3d75613fb0/public/apis/Ru2Me4G-2nIro-cj4Bbib/badge.svg?type=documentation&code=O3UVmk3goSaVOxxbSTHxu.hiMaTkrqNRj8dEb41awZRxdn0iUZ9UhT)](https://app.useoptic.com/organizations/32613bcd-704e-4661-85f0-7b3d75613fb0/apis/Ru2Me4G-2nIro-cj4Bbib?ref=badge) [![Optic badge of changes](https://app.useoptic.com/organizations/32613bcd-704e-4661-85f0-7b3d75613fb0/public/apis/Ru2Me4G-2nIro-cj4Bbib/badge.svg?type=changes&code=a5dN_bRR7n6-MEutVOj8f.jdaniuNKGOz-CgAf_R5YfQIR3UvNYcWK)](https://app.useoptic.com/organizations/32613bcd-704e-4661-85f0-7b3d75613fb0/apis/Ru2Me4G-2nIro-cj4Bbib?ref=badge)

## Set up Optic Cloud

You can follow instructions on how to set up Optic Cloud on [our website](https://www.useoptic.com/docs/cloud-get-started). If you generate an OpenAPI spec from your code (just like this repo), you should follow our [generated spec set up guide](https://www.useoptic.com/docs/setup-ci-generated).
