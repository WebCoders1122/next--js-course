import { RateLimiter } from "limiter";

export const limiter = new RateLimiter({
  tokensPerInterval: 3,
  interval: "hour",
  fireImmediately: true,
});
