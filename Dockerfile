FROM oven/bun:1.1.16-alpine AS build
WORKDIR /usr/src
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun build --target=bun --sourcemap=inline --outdir=build index.js

FROM oven/bun:1.1.16-alpine
WORKDIR /opt/app
COPY --from=build /usr/src/build/ ./
ENTRYPOINT ["/usr/local/bin/bun", "index.js"]
CMD []
