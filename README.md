# OpenBikeSensor Leihe

If you rent OpenBikeSensors, this is the application for you!

Manage all your devices and where they currently are.

## Installation

### Usage with docker

The easiest was to use this is to run it in a [docker environment](https://www.docker.com/).
You can copy the `config-template.yaml` to `config.yaml`, adapt the JWT token secret in this file to something random, take the pre-built docker image `joschi64/obs-leihe` and run it like this:

```bash
docker run -v ./.data:/app/.data -v ./config.yaml:/app/config.yaml joschi64/obs-leihe
```

### Create docker image yourself

To build the image on your machine, you need to install (if you don't have them yet)

- a current [Git command line tool](https://git-scm.com/downloads)
- a current [Node.js runtime environment](https://nodejs.org/en/)

and use these commands:

```bash
git clone git@github.com:jschirrmacher/obs-leihe.git
cd obs-leihe
npm install
npm run config
npm run build
docker build .
```

### Development environment

For this, you also need to install a current [Git command line tool](https://git-scm.com/downloads) and a Node.js runtime environment](https://nodejs.org/en/) like above.
After cloning the repository, install dependencies, setup configuration and run the development server:

```bash
npm install
npm run config
npm run dev
```
