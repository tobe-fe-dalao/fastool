// import { nanoid } from 'nanoid'
// 不要重复造轮子，要学会使用
// 特点：130 bytes，它比 UUID 快 60%
// https://github.com/ai/nanoid/blob/main/README.zh-CN.md
// const uuid = nanoid()
const nanoid = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce(((t, e) => t += (e &= 63) < 36 ? e.toString(36) : e < 62 ? (e - 26).toString(36).toUpperCase() : e > 62 ? "-" : "_"), "");
export { nanoid };