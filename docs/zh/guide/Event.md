# Event 事件

> 内置一份零依赖的 mitt 实现，SSR 安全。

共 1 个函数、7 个类型。

## 函数

### mitt

Mitt: Tiny (~200b) functional event emitter / pubsub.

**签名**

```ts
function mitt<Events extends Record<EventType, unknown>>( all?: EventHandlerMap<Events> ): Emitter<Events>
```

**返回** `Mitt`

## 类型定义

### EventType

mitt 事件订阅发布及调度中心

```ts
type EventType = string | symbol;
```

### Handler


```ts
type Handler<T = unknown> = (event: T) => void;
```

### WildcardHandler


```ts
type WildcardHandler<T = Record<string, unknown>> = (
	type: keyof T,
	event: T[keyof T]
) => void;
```

### EventHandlerList


```ts
type EventHandlerList<T = unknown> = Array<Handler<T>>;
```

### WildCardEventHandlerList


```ts
type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>;
```

### EventHandlerMap


```ts
type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
	keyof Events | '*',
	EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>;
```

### Emitter


```ts
interface Emitter<Events extends Record<EventType, unknown>> {
	all: EventHandlerMap<Events>;

	on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
	on(type: '*', handler: WildcardHandler<Events>): void;

	off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void;
	off(type: '*', handler: WildcardHandler<Events>): void;

	emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
	emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void;
}
```
