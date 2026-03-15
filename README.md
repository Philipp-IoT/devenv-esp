# buildenv-esp

Preconfigured Docker image for ESP32 firmware development with [ESP-IDF](https://github.com/espressif/esp-idf). Use it as a VS Code dev container or in CI pipelines.

**Goals:** Unified build environment across dev and CI, reproducible builds with pinned dependencies, zero host setup required.

## Why

- **Reproducibility** — All toolchains, SDKs, and dependencies are version-pinned inside the image. Builds produce identical results regardless of where they run.
- **Simplification** — No need to install and configure the complex ESP-IDF toolchain on the host. Pull the image and start building.
- **Unification** — The same image is used locally in VS Code and in CI, eliminating "works on my machine" issues.
- **Speed** — A single `docker pull` replaces lengthy per-machine setup. CI runners start building immediately.

## What's Included

- **Base image:** `node:23.11-bookworm-slim`
- **ESP-IDF:** v5.4 (targets: `esp32`, `esp32c6`)
- **Tools:** git, cmake, ninja, ccache, pipenv, zsh, dfu-util

## Usage

### Build

```sh
docker build -t buildenv-esp .
```

### Run

```sh
docker run --rm -v $(pwd)/your-project:/workspace/your-project -it buildenv-esp /bin/bash
```

ESP-IDF is automatically sourced via the entrypoint (`idf.py` and toolchains are available immediately).

## Creating a Project-Specific Build Environment

Fork or clone this repo and adapt the `Dockerfile` to your project's needs (e.g. change `IDF_GIT_TAG`, `IDF_TARGETS`, or add extra dependencies).

### VS Code Dev Container

1. Install the **Dev Containers** extension.
2. Add a `.devcontainer/devcontainer.json` to your firmware project pointing to your customized image:
   ```json
   {
     "image": "your-registry/buildenv-esp:latest"
   }
   ```
3. Open your project and run **Dev Containers: Reopen in Container** (`Ctrl+Shift+P`).

VS Code will start the container and attach to it. The integrated terminal, IntelliSense, and build tasks all run inside the container.

Use **Dev Containers: Rebuild Container** after image updates.

## License

MIT
