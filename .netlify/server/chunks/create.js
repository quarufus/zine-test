import { dequal } from "dequal";
import { d as derived, w as writable, r as readable } from "./index2.js";
import { o as onDestroy, k as get_store_value } from "./ssr.js";
import { nanoid } from "nanoid/non-secure";
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function stripValues(inputObject, toStrip, recursive) {
  return Object.fromEntries(Object.entries(inputObject).filter(([_, value]) => !dequal(value, toStrip)));
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function lightable(value) {
  function subscribe(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe };
}
function getElementByMeltId(id) {
  if (!isBrowser)
    return null;
  const el = document.querySelector(`[data-melt-id="${id}"]`);
  return isHTMLElement(el) ? el : null;
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction(removeUndefined({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop
            }));
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction(removeUndefined({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop
        }));
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction(removeUndefined({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop
          }));
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction(removeUndefined({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop
      })));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function makeElementArray(name2, args) {
  const { stores, returned, action } = args;
  const { subscribe } = derived(stores, (values) => returned(values).map((value) => hiddenAction({
    ...value,
    [`data-melt-${name2}`]: "",
    action: action ?? noop
  })));
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name2 = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector(part));
  return {
    name: name2,
    attribute,
    selector,
    getEl
  };
}
const isBrowser = typeof document !== "undefined";
const isFunction = (v) => typeof v === "function";
function isElement(element) {
  return element instanceof Element;
}
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function isHTMLInputElement(element) {
  return element instanceof HTMLInputElement;
}
function isHTMLLabelElement(element) {
  return element instanceof HTMLLabelElement;
}
function isHTMLButtonElement(element) {
  return element instanceof HTMLButtonElement;
}
function isElementDisabled(element) {
  const ariaDisabled = element.getAttribute("aria-disabled");
  const disabled = element.getAttribute("disabled");
  const dataDisabled = element.hasAttribute("data-disabled");
  if (ariaDisabled === "true" || disabled !== null || dataDisabled) {
    return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isReadable(value) {
  return isObject(value) && "subscribe" in value;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn;
  }
};
function withGet(store) {
  return {
    ...store,
    get: () => get_store_value(store)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get = () => {
    const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
    return fn(values);
  };
  const subscribe = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store) => {
      unsubscribers.push(store.subscribe(() => {
        subscriber(get());
      }));
    });
    subscriber(get());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get,
    subscribe
  };
};
function generateId() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId();
    return acc;
  }, {});
}
const kbd = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*",
  A: "a",
  P: "p"
};
const FIRST_KEYS = [kbd.ARROW_DOWN, kbd.PAGE_UP, kbd.HOME];
const LAST_KEYS = [kbd.ARROW_UP, kbd.PAGE_DOWN, kbd.END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
const ua = (v) => isDom() && v.test(navigator.userAgent);
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^mac/) && !isTouchDevice();
const isFirefox = () => ua(/firefox\//i);
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();
function effect(stores, fn, opts = {}) {
  const { skipFirstRun } = opts;
  let isFirstRun = true;
  let cb = void 0;
  const destroy = derived(stores, (stores2) => {
    cb?.();
    if (isFirstRun && skipFirstRun) {
      isFirstRun = false;
    } else {
      cb = fn(stores2);
    }
  }).subscribe(noop);
  const unsub = () => {
    destroy();
    cb?.();
  };
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
function snapValueToStep(value, min, max, step) {
  const remainder = (value - (isNaN(min) ? 0 : min)) % step;
  let snappedValue = Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder;
  if (!isNaN(min)) {
    if (snappedValue < min) {
      snappedValue = min;
    } else if (!isNaN(max) && snappedValue > max) {
      snappedValue = min + Math.floor((max - min) / step) * step;
    }
  } else if (!isNaN(max) && snappedValue > max) {
    snappedValue = Math.floor(max / step) * step;
  }
  const string = step.toString();
  const index = string.indexOf(".");
  const precision = index >= 0 ? string.length - index : 0;
  if (precision > 0) {
    const pow = Math.pow(10, precision);
    snappedValue = Math.round(snappedValue * pow) / pow;
  }
  return snappedValue;
}
function clamp(min, value, max) {
  return Math.max(min, Math.min(value, max));
}
readable(void 0, (set) => {
  function clicked(event) {
    set(event);
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "pointerup", clicked, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
const documentEscapeKeyStore = readable(void 0, (set) => {
  function keydown(event) {
    if (event && event.key === kbd.ESCAPE) {
      set(event);
    }
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "keydown", keydown, {
    passive: false
  });
  return unsubscribe;
});
const useEscapeKeydown = (node, config = {}) => {
  let unsub = noop;
  function update(config2 = {}) {
    unsub();
    const options = { enabled: true, ...config2 };
    const enabled = isReadable(options.enabled) ? options.enabled : readable(options.enabled);
    unsub = executeCallbacks(
      // Handle escape keydowns
      documentEscapeKeyStore.subscribe((e) => {
        if (!e || !get_store_value(enabled))
          return;
        const target = e.target;
        if (!isHTMLElement(target) || target.closest("[data-escapee]") !== node) {
          return;
        }
        e.preventDefault();
        if (shouldIgnoreEvent(e, options.ignore))
          return;
        options.handler?.(e);
      }),
      effect(enabled, ($enabled) => {
        if ($enabled) {
          node.dataset.escapee = "";
        } else {
          delete node.dataset.escapee;
        }
      })
    );
  }
  update(config);
  return {
    update,
    destroy() {
      node.removeAttribute("data-escapee");
      unsub();
    }
  };
};
const shouldIgnoreEvent = (e, ignore) => {
  if (!ignore)
    return false;
  if (isFunction(ignore) && ignore(e))
    return true;
  if (Array.isArray(ignore) && ignore.some((ignoreEl) => e.target === ignoreEl)) {
    return true;
  }
  return false;
};
function toReadableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    if (isReadable(value)) {
      result[propertyKey] = withGet(value);
    } else {
      result[propertyKey] = withGet(readable(value));
    }
  });
  return result;
}
const defaults$2 = {
  prefix: "",
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0)
};
function createHiddenInput(props) {
  const withDefaults = {
    ...defaults$2,
    ...removeUndefined(props)
  };
  const { name: elName } = createElHelpers(withDefaults.prefix);
  const { value, name: name2, disabled, required } = toReadableStores(omit(withDefaults, "prefix"));
  const nameStore = name2;
  const hiddenInput = makeElement(elName("hidden-input"), {
    stores: [value, nameStore, disabled, required],
    returned: ([$value, $name, $disabled, $required]) => {
      return {
        name: $name,
        value: $value?.toString(),
        "aria-hidden": "true",
        hidden: true,
        disabled: $disabled,
        required: $required,
        tabIndex: -1,
        style: styleToString({
          position: "absolute",
          opacity: 0,
          "pointer-events": "none",
          margin: 0,
          transform: "translateX(-100%)"
        })
      };
    },
    action: (node) => {
      const unsub = value.subscribe((newValue) => {
        node.value = newValue;
        node.dispatchEvent(new Event("change", { bubbles: true }));
      });
      return {
        destroy: unsub
      };
    }
  });
  return hiddenInput;
}
const defaults$1 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
({
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  positioning: {
    placement: "bottom"
  },
  closeOnEscape: true,
  closeOnOutsideClick: true,
  onOutsideClick: void 0,
  preventScroll: false,
  forceVisible: false,
  locale: "en",
  granularity: void 0,
  disabled: false,
  readonly: false,
  minValue: void 0,
  maxValue: void 0,
  weekdayFormat: "narrow",
  ...omit(defaults$1, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
function debounceCallback(cb, delay) {
  let debounceTimer = 0;
  safeOnDestroy(() => {
    clearTimeout(debounceTimer);
  });
  return () => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(cb, delay);
  };
}
function resizeObserver(node, handleResize) {
  let animationFrame = 0;
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(handleResize);
  });
  observer.observe(node);
  return () => {
    window.cancelAnimationFrame(animationFrame);
    observer.unobserve(node);
  };
}
function addUnlinkedScrollListener(node, handler = noop) {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll)
      handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const [scrollClampMin, scrollClampMax] = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollClampMin, scrollPos, scrollClampMax);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function createStateMachine(initialState, machine) {
  const state = withGet.writable(initialState);
  function reducer(event) {
    const $state = state.get();
    const nextState = machine[$state][event];
    return nextState ?? $state;
  }
  const dispatch = (event) => {
    state.set(reducer(event));
  };
  return {
    state,
    dispatch
  };
}
function createBaseScrollbarAction(state) {
  const { rootState, scrollbarState } = state;
  scrollbarState.isVisible.set(true);
  function handleDragScroll(e) {
    const $domRect = scrollbarState.domRect.get();
    if (!$domRect)
      return;
    const x = e.clientX - $domRect.left;
    const y = e.clientY - $domRect.top;
    const $isHorizontal = scrollbarState.isHorizontal.get();
    if ($isHorizontal) {
      scrollbarState.onDragScroll(x);
    } else {
      scrollbarState.onDragScroll(y);
    }
  }
  function handlePointerDown(e) {
    if (e.button !== 0)
      return;
    const target = e.target;
    if (!isHTMLElement(target))
      return;
    target.setPointerCapture(e.pointerId);
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget))
      return;
    scrollbarState.domRect.set(currentTarget.getBoundingClientRect());
    scrollbarState.prevWebkitUserSelect.set(document.body.style.webkitUserSelect);
    document.body.style.webkitUserSelect = "none";
    const $viewportEl = rootState.viewportEl.get();
    if ($viewportEl) {
      $viewportEl.style.scrollBehavior = "auto";
    }
    handleDragScroll(e);
  }
  function handlePointerMove(e) {
    handleDragScroll(e);
  }
  function handlePointerUp(e) {
    const target = e.target;
    if (!isHTMLElement(target))
      return;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
    document.body.style.webkitUserSelect = scrollbarState.prevWebkitUserSelect.get();
    const $viewportEl = rootState.viewportEl.get();
    if ($viewportEl) {
      $viewportEl.style.scrollBehavior = "";
    }
    scrollbarState.domRect.set(null);
  }
  function handleWheel(e) {
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(target) || !isHTMLElement(currentTarget))
      return;
    const isScrollbarWheel = currentTarget.contains(target);
    if (!isScrollbarWheel)
      return;
    const $sizes = scrollbarState.sizes.get();
    if (!$sizes)
      return;
    const maxScrollPos = $sizes.content - $sizes.viewport;
    scrollbarState.handleWheelScroll(e, maxScrollPos);
  }
  function baseAction(node) {
    scrollbarState.scrollbarEl.set(node);
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "pointerdown", handlePointerDown), addMeltEventListener(node, "pointermove", handlePointerMove), addMeltEventListener(node, "pointerup", handlePointerUp), addEventListener(document, "wheel", handleWheel, { passive: false }));
    const unsubResizeContent = effect([rootState.contentEl], ([$contentEl]) => {
      if (!$contentEl)
        return noop;
      return resizeObserver($contentEl, scrollbarState.handleSizeChange);
    });
    return {
      destroy() {
        unsubEvents();
        unsubResizeContent();
      }
    };
  }
  return baseAction;
}
function createAutoScrollbarAction(state) {
  const baseAction = createBaseScrollbarAction(state);
  const { rootState, scrollbarState } = state;
  const handleResize = debounceCallback(() => {
    const $viewportEl = rootState.viewportEl.get();
    if (!$viewportEl)
      return;
    const isOverflowX = $viewportEl.offsetWidth < $viewportEl.scrollWidth;
    const isOverflowY = $viewportEl.offsetHeight < $viewportEl.scrollHeight;
    scrollbarState.isVisible.set(scrollbarState.isHorizontal.get() ? isOverflowX : isOverflowY);
  }, 10);
  function scrollbarAutoAction(node) {
    const unsubBaseAction = baseAction(node)?.destroy;
    handleResize();
    const unsubObservers = [];
    const $viewportEl = rootState.viewportEl.get();
    if ($viewportEl) {
      unsubObservers.push(resizeObserver($viewportEl, handleResize));
    }
    const $contentEl = rootState.contentEl.get();
    if ($contentEl) {
      unsubObservers.push(resizeObserver($contentEl, handleResize));
    }
    return {
      destroy() {
        unsubObservers.forEach((unsub) => unsub());
        unsubBaseAction();
      }
    };
  }
  return scrollbarAutoAction;
}
function createHoverScrollbarAction(state) {
  const baseAction = createBaseScrollbarAction(state);
  const { rootState, scrollbarState } = state;
  scrollbarState.isVisible.set(false);
  let timeout;
  function handlePointerEnter() {
    window.clearTimeout(timeout);
    if (scrollbarState.isVisible.get())
      return;
    const $viewportEl = rootState.viewportEl.get();
    if (!$viewportEl)
      return;
    const isOverflowX = $viewportEl.offsetWidth < $viewportEl.scrollWidth;
    const isOverflowY = $viewportEl.offsetHeight < $viewportEl.scrollHeight;
    scrollbarState.isVisible.set(scrollbarState.isHorizontal.get() ? isOverflowX : isOverflowY);
  }
  function handlePointerLeave() {
    timeout = window.setTimeout(() => {
      if (!scrollbarState.isVisible.get())
        return;
      scrollbarState.isVisible.set(false);
    }, rootState.options.hideDelay.get());
  }
  function scrollbarHoverAction(node) {
    const unsubBaseAction = baseAction(node)?.destroy;
    const scrollAreaEl = node.closest("[data-melt-scroll-area]");
    let unsubScrollAreaListeners = noop;
    if (scrollAreaEl) {
      if (isTouchDevice()) {
        unsubScrollAreaListeners = executeCallbacks(addEventListener(scrollAreaEl, "touchstart", handlePointerEnter), addEventListener(scrollAreaEl, "touchend", handlePointerLeave));
      } else if (isFirefox()) {
        unsubScrollAreaListeners = executeCallbacks(addEventListener(scrollAreaEl, "pointerenter", handlePointerEnter), addEventListener(scrollAreaEl, "mouseenter", handlePointerEnter), addEventListener(scrollAreaEl, "mouseleave", handlePointerLeave));
      } else {
        unsubScrollAreaListeners = executeCallbacks(addEventListener(scrollAreaEl, "pointerenter", handlePointerEnter), addEventListener(scrollAreaEl, "pointerleave", handlePointerLeave));
      }
    }
    return {
      destroy() {
        unsubBaseAction?.();
        unsubScrollAreaListeners();
      }
    };
  }
  return scrollbarHoverAction;
}
function createScrollScrollbarAction(state) {
  const baseAction = createBaseScrollbarAction(state);
  const { rootState, scrollbarState } = state;
  const machine = createStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  effect([machine.state], ([$status]) => {
    if ($status === "idle") {
      window.setTimeout(() => {
        machine.dispatch("HIDE");
      }, rootState.options.hideDelay.get());
    }
    if ($status === "hidden") {
      scrollbarState.isVisible.set(false);
    } else {
      scrollbarState.isVisible.set(true);
    }
  });
  const debounceScrollEnd = debounceCallback(() => machine.dispatch("SCROLL_END"), 100);
  effect([rootState.viewportEl, scrollbarState.isHorizontal], ([$viewportEl, $isHorizontal]) => {
    const scrollDirection = $isHorizontal ? "scrollLeft" : "scrollTop";
    let unsub = noop;
    if ($viewportEl) {
      let prevScrollPos = $viewportEl[scrollDirection];
      const handleScroll = () => {
        const scrollPos = $viewportEl[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          machine.dispatch("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      unsub = addEventListener($viewportEl, "scroll", handleScroll);
    }
    return () => {
      unsub();
    };
  });
  function scrollbarScrollAction(node) {
    const unsubBaseAction = baseAction(node)?.destroy;
    const unsubListeners = executeCallbacks(addEventListener(node, "pointerenter", () => machine.dispatch("POINTER_ENTER")), addEventListener(node, "pointerleave", () => machine.dispatch("POINTER_LEAVE")));
    return {
      destroy() {
        unsubBaseAction?.();
        unsubListeners();
      }
    };
  }
  return scrollbarScrollAction;
}
function createScrollbarX(state, createAction) {
  const action = createAction(state);
  const { rootState, scrollbarState } = state;
  return makeElement(name("scrollbar"), {
    stores: [scrollbarState.sizes, rootState.options.dir, scrollbarState.isVisible],
    returned: ([$sizes, $dir, $isVisible]) => {
      return {
        style: styleToString({
          position: "absolute",
          bottom: 0,
          left: $dir === "rtl" ? "var(--melt-scroll-area-corner-width)" : 0,
          right: $dir === "ltr" ? "var(--melt-scroll-area-corner-width)" : 0,
          "--melt-scroll-area-thumb-width": `${getThumbSize($sizes)}px`,
          visibility: !$isVisible ? "hidden" : void 0
        }),
        "data-state": $isVisible ? "visible" : "hidden"
      };
    },
    action: (node) => {
      const unsubAction = action(node)?.destroy;
      rootState.scrollbarXEl.set(node);
      rootState.scrollbarXEnabled.set(true);
      return {
        destroy() {
          unsubAction?.();
          rootState.scrollbarXEl.set(null);
        }
      };
    }
  });
}
function createScrollbarY(state, createAction) {
  const action = createAction(state);
  const { rootState, scrollbarState } = state;
  return makeElement(name("scrollbar"), {
    stores: [scrollbarState.sizes, rootState.options.dir, scrollbarState.isVisible],
    returned: ([$sizes, $dir, $isVisible]) => {
      return {
        style: styleToString({
          position: "absolute",
          top: 0,
          right: $dir === "ltr" ? 0 : void 0,
          left: $dir === "rtl" ? 0 : void 0,
          bottom: "var(--melt-scroll-area-corner-height)",
          "--melt-scroll-area-thumb-height": `${getThumbSize($sizes)}px`,
          visibility: !$isVisible ? "hidden" : void 0
        }),
        "data-state": $isVisible ? "visible" : "hidden"
      };
    },
    action: (node) => {
      const unsubAction = action(node)?.destroy;
      rootState.scrollbarYEl.set(node);
      rootState.scrollbarYEnabled.set(true);
      return {
        destroy() {
          unsubAction?.();
          rootState.scrollbarYEl.set(null);
        }
      };
    }
  });
}
function getScrollbarActionByType(type) {
  switch (type) {
    case "always":
      return createBaseScrollbarAction;
    case "auto":
      return createAutoScrollbarAction;
    case "hover":
      return createHoverScrollbarAction;
    case "scroll":
      return createScrollScrollbarAction;
    default:
      return createBaseScrollbarAction;
  }
}
const { name } = createElHelpers("scroll-area");
const scrollAreaIdParts = [
  "root",
  "viewport",
  "content",
  "scrollbarX",
  "scrollbarY",
  "thumbX",
  "thumbY"
];
const defaults = {
  type: "hover",
  hideDelay: 600,
  dir: "ltr"
};
function createScrollArea(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "ids"));
  const cornerWidth = withGet.writable(0);
  const cornerHeight = withGet.writable(0);
  const scrollbarXEnabled = withGet.writable(false);
  const scrollbarYEnabled = withGet.writable(false);
  const scrollAreaEl = withGet.writable(null);
  const viewportEl = withGet.writable(null);
  const contentEl = withGet.writable(null);
  const scrollbarXEl = withGet.writable(null);
  const scrollbarYEl = withGet.writable(null);
  const ids = toWritableStores({ ...generateIds(scrollAreaIdParts), ...withDefaults.ids });
  const rootState = {
    cornerWidth,
    cornerHeight,
    scrollbarXEnabled,
    scrollbarYEnabled,
    viewportEl,
    contentEl,
    options,
    scrollbarXEl,
    scrollbarYEl,
    scrollAreaEl,
    ids
  };
  const root = makeElement(name(), {
    stores: [cornerWidth, cornerHeight, ids.root],
    returned: ([$cornerWidth, $cornderHeight, $rootId]) => {
      return {
        style: styleToString({
          position: "relative",
          "--melt-scroll-area-corner-width": `${$cornerWidth}px`,
          "--melt-scroll-area-corner-height": `${$cornderHeight}px`
        }),
        id: $rootId
      };
    },
    action: (node) => {
      scrollAreaEl.set(node);
      return {
        destroy() {
          scrollAreaEl.set(null);
        }
      };
    }
  });
  const viewport = makeElement(name("viewport"), {
    stores: [scrollbarXEnabled, scrollbarYEnabled, ids.viewport],
    returned: ([$scrollbarXEnabled, $scrollbarYEnabled, $viewportId]) => {
      return {
        style: styleToString({
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
          "-webkit-overflow-scrolling": "touch",
          "-webkit-scrollbar": "none",
          "overflow-x": $scrollbarXEnabled ? "scroll" : "hidden",
          "overflow-y": $scrollbarYEnabled ? "scroll" : "hidden"
        }),
        id: $viewportId
      };
    },
    action: (node) => {
      const styleNode = document.createElement("style");
      styleNode.innerHTML = `
				/* Hide scrollbars cross-browser and enable momentum scroll for touch
					devices */
				[data-melt-scroll-area-viewport] {
					scrollbar-width: none;
					-ms-overflow-style: none;
					-webkit-overflow-scrolling: touch;
				}

				[data-melt-scroll-area-viewport]::-webkit-scrollbar {
					display: none;
				}
			`;
      node.parentElement?.insertBefore(styleNode, node);
      viewportEl.set(node);
      return {
        destroy() {
          styleNode.remove();
          viewportEl.set(null);
        }
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: [ids.content],
    returned: ([$contentId]) => {
      return {
        style: styleToString({
          "min-width": "100%",
          display: "table"
        }),
        id: $contentId
      };
    },
    action: (node) => {
      contentEl.set(node);
      return {
        destroy() {
          contentEl.set(null);
        }
      };
    }
  });
  function createScrollbar(orientationProp = "vertical") {
    const orientation = withGet.writable(orientationProp);
    const isHorizontal = withGet.writable(orientationProp === "horizontal");
    const domRect = withGet.writable(null);
    const prevWebkitUserSelect = withGet.writable("");
    const pointerOffset = withGet.writable(0);
    const thumbEl = withGet.writable(null);
    const thumbOffset = withGet.writable(0);
    const scrollbarEl = withGet.writable(null);
    const sizes = withGet.writable({
      content: 0,
      viewport: 0,
      scrollbar: {
        size: 0,
        paddingStart: 0,
        paddingEnd: 0
      }
    });
    const isVisible = withGet.writable(false);
    const hasThumb = withGet.derived(sizes, ($sizes) => {
      const thumbRatio = getThumbRatio($sizes.viewport, $sizes.content);
      return Boolean(thumbRatio > 0 && thumbRatio < 1);
    });
    function getScrollPosition(pointerPos, dir) {
      return getScrollPositionFromPointer(pointerPos, pointerOffset.get(), sizes.get(), dir);
    }
    function handleWheelScroll(e, payload) {
      const $viewportEl = viewportEl.get();
      if (!$viewportEl)
        return;
      if (isHorizontal.get()) {
        const scrollPos = $viewportEl.scrollLeft + e.deltaY;
        $viewportEl.scrollLeft = scrollPos;
        if (isScrollingWithinScrollbarBounds(scrollPos, payload)) {
          e.preventDefault();
        }
      } else {
        const scrollPos = $viewportEl.scrollTop + e.deltaY;
        $viewportEl.scrollTop = scrollPos;
        if (isScrollingWithinScrollbarBounds(scrollPos, payload)) {
          e.preventDefault();
        }
      }
    }
    function handleThumbDown(payload) {
      if (isHorizontal.get()) {
        pointerOffset.set(payload.x);
      } else {
        pointerOffset.set(payload.y);
      }
    }
    function handleThumbUp() {
      pointerOffset.set(0);
    }
    function onThumbPositionChange() {
      const $viewportEl = viewportEl.get();
      const $thumbEl = thumbEl.get();
      if (!$viewportEl || !$thumbEl)
        return;
      const scrollPos = isHorizontal.get() ? $viewportEl.scrollLeft : $viewportEl.scrollTop;
      const offset = getThumbOffsetFromScroll(scrollPos, sizes.get(), rootState.options.dir.get());
      thumbOffset.set(offset);
    }
    function onDragScroll(payload) {
      const $viewportEl = viewportEl.get();
      if (!$viewportEl)
        return;
      if (isHorizontal.get()) {
        $viewportEl.scrollLeft = getScrollPosition(payload, rootState.options.dir.get());
      } else {
        $viewportEl.scrollTop = getScrollPosition(payload);
      }
    }
    function handleSizeChange() {
      const $scrollbarEl = scrollbarState.scrollbarEl.get();
      if (!$scrollbarEl)
        return;
      const $isHorizontal = scrollbarState.isHorizontal.get();
      const $viewportEl = rootState.viewportEl.get();
      if ($isHorizontal) {
        scrollbarState.sizes.set({
          content: $viewportEl?.scrollWidth ?? 0,
          viewport: $viewportEl?.offsetWidth ?? 0,
          scrollbar: {
            size: $scrollbarEl.clientWidth ?? 0,
            paddingStart: toInt(getComputedStyle($scrollbarEl).paddingLeft),
            paddingEnd: toInt(getComputedStyle($scrollbarEl).paddingRight)
          }
        });
      } else {
        scrollbarState.sizes.set({
          content: $viewportEl?.scrollHeight ?? 0,
          viewport: $viewportEl?.offsetHeight ?? 0,
          scrollbar: {
            size: $scrollbarEl.clientHeight ?? 0,
            paddingStart: toInt(getComputedStyle($scrollbarEl).paddingLeft),
            paddingEnd: toInt(getComputedStyle($scrollbarEl).paddingRight)
          }
        });
      }
    }
    const scrollbarState = {
      isHorizontal,
      domRect,
      prevWebkitUserSelect,
      pointerOffset,
      thumbEl,
      thumbOffset,
      sizes,
      orientation,
      handleThumbDown,
      handleThumbUp,
      onThumbPositionChange,
      onDragScroll,
      handleWheelScroll,
      hasThumb,
      scrollbarEl,
      isVisible,
      handleSizeChange
    };
    const scrollbarActionByType = getScrollbarActionByType(options.type.get());
    const scrollAreaState = { rootState, scrollbarState };
    const scrollbar = orientationProp === "horizontal" ? createScrollbarX(scrollAreaState, scrollbarActionByType) : createScrollbarY(scrollAreaState, scrollbarActionByType);
    const thumb = createScrollbarThumb(scrollAreaState);
    return {
      scrollbar,
      thumb
    };
  }
  const { scrollbar: scrollbarX, thumb: thumbX } = createScrollbar("horizontal");
  const { scrollbar: scrollbarY, thumb: thumbY } = createScrollbar("vertical");
  const corner = createScrollAreaCorner(rootState);
  return {
    options,
    elements: {
      root,
      viewport,
      content,
      corner,
      scrollbarX,
      scrollbarY,
      thumbX,
      thumbY
    }
  };
}
function createScrollbarThumb(state) {
  const { scrollbarState, rootState } = state;
  function handlePointerDown(e) {
    const thumb2 = e.target;
    if (!isHTMLElement(thumb2))
      return;
    const thumbRect = thumb2.getBoundingClientRect();
    const x = e.clientX - thumbRect.left;
    const y = e.clientY - thumbRect.top;
    scrollbarState.handleThumbDown({ x, y });
  }
  function handlePointerUp(e) {
    scrollbarState.handleThumbUp(e);
  }
  let unsubListener = void 0;
  function handleScroll() {
    if (unsubListener)
      return;
    const $viewportEl = rootState.viewportEl.get();
    if ($viewportEl) {
      unsubListener = addUnlinkedScrollListener($viewportEl, scrollbarState.onThumbPositionChange);
    }
    scrollbarState.onThumbPositionChange();
  }
  const thumb = makeElement(name("thumb"), {
    stores: [scrollbarState.hasThumb, scrollbarState.isHorizontal, scrollbarState.thumbOffset],
    returned: ([$hasThumb, $isHorizontal, $offset]) => {
      return {
        style: styleToString({
          width: "var(--melt-scroll-area-thumb-width)",
          height: "var(--melt-scroll-area-thumb-height)",
          transform: $isHorizontal ? `translate3d(${Math.round($offset)}px, 0, 0)` : `translate3d(0, ${Math.round($offset)}px, 0)`
        }),
        "data-state": $hasThumb ? "visible" : "hidden"
      };
    },
    action: (node) => {
      scrollbarState.thumbEl.set(node);
      const unsubEffect = effect([scrollbarState.sizes], ([_]) => {
        const $viewportEl = rootState.viewportEl.get();
        if (!$viewportEl)
          return noop;
        scrollbarState.onThumbPositionChange();
        return addEventListener($viewportEl, "scroll", handleScroll);
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "pointerdown", handlePointerDown), addMeltEventListener(node, "pointerup", handlePointerUp));
      return {
        destroy() {
          unsubListener?.();
          unsubEvents();
          unsubEffect();
        }
      };
    }
  });
  return thumb;
}
function createScrollAreaCorner(rootState) {
  const width = writable(0);
  const height = writable(0);
  const hasSize = derived([width, height], ([$width, $height]) => !!$width && !!$height);
  function setCornerHeight() {
    const offsetHeight = rootState.scrollbarXEl.get()?.offsetHeight || 0;
    rootState.cornerHeight.set(offsetHeight);
    height.set(offsetHeight);
  }
  function setCornerWidth() {
    const offsetWidth = rootState.scrollbarYEl.get()?.offsetWidth || 0;
    rootState.cornerWidth.set(offsetWidth);
    width.set(offsetWidth);
  }
  effect([rootState.scrollbarXEl], ([$scrollbarXEl]) => {
    if ($scrollbarXEl) {
      setCornerHeight();
    }
  });
  effect([rootState.scrollbarYEl], ([$scrollbarYEl]) => {
    if ($scrollbarYEl) {
      setCornerWidth();
    }
  });
  const hasBothScrollbarsVisible = derived([rootState.scrollbarXEl, rootState.scrollbarYEl], ([$scrollbarXEl, $scrollbarYEl]) => {
    return !!$scrollbarXEl && !!$scrollbarYEl;
  });
  const hasCorner = derived([rootState.options.type, hasBothScrollbarsVisible], ([$type, $hasBoth]) => {
    return $type !== "scroll" && $hasBoth;
  });
  const shouldDisplay = derived([hasCorner, hasSize], ([$hasCorner, $hasSize]) => $hasCorner && $hasSize);
  const corner = makeElement(name("corner"), {
    stores: [width, height, rootState.options.dir, shouldDisplay],
    returned: ([$width, $height, $dir, $shouldDisplay]) => {
      return {
        style: styleToString({
          display: $shouldDisplay ? "block" : "none",
          width: `${$width}px`,
          height: `${$height}px`,
          position: "absolute",
          right: $dir === "ltr" ? 0 : void 0,
          left: $dir === "rtl" ? 0 : void 0,
          bottom: 0
        })
      };
    }
  });
  return corner;
}
export {
  generateId as A,
  createHiddenInput as B,
  isHTMLInputElement as C,
  makeElementArray as D,
  snapValueToStep as E,
  FIRST_LAST_KEYS as F,
  isIos as a,
  isBrowser as b,
  createScrollArea as c,
  isElement as d,
  isHTMLLabelElement as e,
  executeCallbacks as f,
  getElementByMeltId as g,
  addEventListener as h,
  isHTMLElement as i,
  addMeltEventListener as j,
  createElHelpers as k,
  generateIds as l,
  makeElement as m,
  noop as n,
  omit as o,
  isObject as p,
  disabledAttr as q,
  kbd as r,
  stripValues as s,
  toWritableStores as t,
  useEscapeKeydown as u,
  isHTMLButtonElement as v,
  withGet as w,
  isElementDisabled as x,
  styleToString as y,
  effect as z
};
