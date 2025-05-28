import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from "@opennextjs/cloudflare/config";

const config = defineCloudflareConfig({
  // Uncomment to enable R2 cache,
  // It should be imported as:
  // `import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";`
  // See https://opennext.js.org/cloudflare/caching for more details
  // incrementalCache: r2IncrementalCache,
});

export default {
  ...config,
  dangerous: {
    // workaround for https://github.com/opennextjs/opennextjs-cloudflare/issues/606
    headersAndCookiesPriority(event) {
      if (event.method === "POST" && event.headers["next-action"]) {
        return "handler";
      }
      return "middleware";
    },
  },
} satisfies OpenNextConfig;
