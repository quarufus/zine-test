import { i as set_current_component, r as run_all, j as current_component, c as create_ssr_component, v as validate_component, k as get_store_value, a as subscribe, f as spread, h as escape_object, e as escape, d as each, b as add_attribute, o as onDestroy } from "../../../../../chunks/ssr.js";
import { a as Icon, I as IssueaNav } from "../../../../../chunks/IssueaNav.js";
import { dequal } from "dequal";
import { i as isHTMLElement, w as withGet, n as noop, a as isIos, b as isBrowser, g as getElementByMeltId, d as isElement, e as isHTMLLabelElement, u as useEscapeKeydown, f as executeCallbacks, h as addEventListener, m as makeElement, j as addMeltEventListener, t as toWritableStores, o as omit, k as createElHelpers, l as generateIds, p as isObject, s as stripValues, q as disabledAttr, r as kbd, v as isHTMLButtonElement, F as FIRST_LAST_KEYS, x as isElementDisabled, y as styleToString, z as effect, A as generateId, B as createHiddenInput, C as isHTMLInputElement, D as makeElementArray, E as snapValueToStep, c as createScrollArea } from "../../../../../chunks/create.js";
import { d as derived, w as writable, a as readonly } from "../../../../../chunks/index2.js";
import { flip, offset, shift, arrow, size, autoUpdate, computePosition } from "@floating-ui/dom";
import { createFocusTrap } from "focus-trap";
import { r as readerSettings } from "../../../../../chunks/stores2.js";
import { V as VerticalRule, M as MobileTop } from "../../../../../chunks/VerticalRule.js";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const Dot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["circle", { "cx": "12.1", "cy": "12.1", "r": "1" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "dot" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Dot$1 = Dot;
function back(array, index, increment, loop = true) {
  const previousIndex = index - increment;
  if (previousIndex <= 0) {
    return loop ? array[array.length - 1] : array[0];
  }
  return array[previousIndex];
}
function forward(array, index, increment, loop = true) {
  const nextIndex = index + increment;
  if (nextIndex > array.length - 1) {
    return loop ? array[0] : array[array.length - 1];
  }
  return array[nextIndex];
}
function next(array, index, loop = true) {
  if (index === array.length - 1) {
    return loop ? array[0] : array[index];
  }
  return array[index + 1];
}
function prev(array, currentIndex, loop = true) {
  if (currentIndex <= 0) {
    return loop ? array[array.length - 1] : array[0];
  }
  return array[currentIndex - 1];
}
function last(array) {
  return array[array.length - 1];
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function toggle(item, array, compare = dequal) {
  const itemIdx = array.findIndex((innerItem) => compare(innerItem, item));
  if (itemIdx !== -1) {
    array.splice(itemIdx, 1);
  } else {
    array.push(item);
  }
  return array;
}
function addHighlight(element) {
  element.setAttribute("data-highlighted", "");
}
function removeHighlight(element) {
  element.removeAttribute("data-highlighted");
}
function getOptions(el) {
  return Array.from(el.querySelectorAll('[role="option"]:not([data-disabled])')).filter((el2) => isHTMLElement(el2));
}
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update2 = (updater, sideEffect) => {
    store.update((curr) => {
      const next2 = updater(curr);
      let res = next2;
      if (onChange) {
        res = onChange({ curr, next: next2 });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update2(() => curr);
  };
  return {
    ...store,
    update: update2,
    set
  };
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function debounce(fn, wait = 500) {
  let timeout;
  const debounced = (...args) => {
    clearTimeout(timeout);
    const later = () => fn(...args);
    timeout = setTimeout(later, wait);
  };
  debounced.destroy = () => clearTimeout(timeout);
  return debounced;
}
const LOCK_CLASSNAME = "data-melt-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = _document ?? document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  const setStyle = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn?.());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj;
  return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}
function handleRovingFocus(nextElement) {
  if (!isBrowser)
    return;
  sleep(1).then(() => {
    const currentFocusedElement = document.activeElement;
    if (!isHTMLElement(currentFocusedElement) || currentFocusedElement === nextElement)
      return;
    currentFocusedElement.tabIndex = -1;
    if (nextElement) {
      nextElement.tabIndex = 0;
      nextElement.focus();
    }
  });
}
const ignoredKeys = /* @__PURE__ */ new Set(["Shift", "Control", "Alt", "Meta", "CapsLock", "NumLock"]);
const defaults$2 = {
  onMatch: handleRovingFocus,
  getCurrentItem: () => document.activeElement
};
function createTypeaheadSearch(args = {}) {
  const withDefaults = { ...defaults$2, ...args };
  const typed = withGet(writable([]));
  const resetTyped = debounce(() => {
    typed.update(() => []);
  });
  const handleTypeaheadSearch = (key, items) => {
    if (ignoredKeys.has(key))
      return;
    const currentItem = withDefaults.getCurrentItem();
    const $typed = get_store_value(typed);
    if (!Array.isArray($typed)) {
      return;
    }
    $typed.push(key.toLowerCase());
    typed.set($typed);
    const candidateItems = items.filter((item) => {
      if (item.getAttribute("disabled") === "true" || item.getAttribute("aria-disabled") === "true" || item.hasAttribute("data-disabled")) {
        return false;
      }
      return true;
    });
    const isRepeated = $typed.length > 1 && $typed.every((char) => char === $typed[0]);
    const normalizeSearch = isRepeated ? $typed[0] : $typed.join("");
    const currentItemIndex = isHTMLElement(currentItem) ? candidateItems.indexOf(currentItem) : -1;
    let wrappedItems = wrapArray(candidateItems, Math.max(currentItemIndex, 0));
    const excludeCurrentItem = normalizeSearch.length === 1;
    if (excludeCurrentItem) {
      wrappedItems = wrappedItems.filter((v) => v !== currentItem);
    }
    const nextItem = wrappedItems.find((item) => item?.innerText && item.innerText.toLowerCase().startsWith(normalizeSearch.toLowerCase()));
    if (isHTMLElement(nextItem) && nextItem !== currentItem) {
      withDefaults.onMatch(nextItem);
    }
    resetTyped();
  };
  return {
    typed,
    resetTyped,
    handleTypeaheadSearch
  };
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0)
    return portalProp;
  const portalParent = getPortalParent(node);
  if (portalParent === "body")
    return document.body;
  return null;
}
function createClickOutsideIgnore(meltId) {
  return (e) => {
    const target = e.target;
    const triggerEl = getElementByMeltId(meltId);
    if (!triggerEl || !isElement(target))
      return false;
    const id = triggerEl.id;
    if (isHTMLLabelElement(target) && id === target.htmlFor) {
      return true;
    }
    if (target.closest(`label[for="${id}"]`)) {
      return true;
    }
    return false;
  };
}
const defaultConfig$1 = {
  strategy: "absolute",
  placement: "top",
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
const ARROW_TRANSFORM = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null)
    return {
      destroy: noop
    };
  const options = { ...defaultConfig$1, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options.flip) {
    middleware.push(flip({
      boundary: options.boundary,
      padding: options.overflowPadding
    }));
  }
  const arrowOffset = isHTMLElement(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if (data?.mainAxis != null) {
      data.mainAxis += arrowOffset;
    }
    middleware.push(offset(data));
  }
  middleware.push(shift({
    boundary: options.boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    if (isHTMLElement(reference) && !reference.ownerDocument.documentElement.contains(reference))
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data) => {
      const x = Math.round(data.x);
      const y = Math.round(data.y);
      const [side, align] = getSideAndAlignFromPlacement(data.placement);
      floating.setAttribute("data-side", side);
      floating.setAttribute("data-align", align);
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x}px`
      });
      if (isHTMLElement(arrowEl) && data.middlewareData.arrow) {
        const { x: x2, y: y2 } = data.middlewareData.arrow;
        const dir = data.placement.split("-")[0];
        arrowEl.setAttribute("data-side", dir);
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x2 != null ? `${x2}px` : "",
          top: y2 != null ? `${y2}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data;
    });
  }
  Object.assign(floating.style, {
    position: options.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
const useFocusTrap = (node, config = {}) => {
  let unsub = noop;
  const update2 = (config2) => {
    unsub();
    const trap = createFocusTrap(node, {
      returnFocusOnDeactivate: false,
      allowOutsideClick: true,
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
      ...config2
    });
    unsub = trap.deactivate;
    trap.activate();
  };
  update2(config);
  return { destroy: unsub, update: update2 };
};
const visibleModals = [];
const useModal = (node, config) => {
  let unsubInteractOutside = noop;
  visibleModals.push(node);
  function removeNodeFromVisibleModals() {
    const index = visibleModals.indexOf(node);
    if (index >= 0) {
      visibleModals.splice(index, 1);
    }
  }
  function isLastModal() {
    return last(visibleModals) === node;
  }
  function update2(config2) {
    unsubInteractOutside();
    const { onClose, shouldCloseOnInteractOutside, closeOnInteractOutside } = config2;
    function closeModal() {
      if (isLastModal() && onClose) {
        onClose();
        removeNodeFromVisibleModals();
      }
    }
    function onInteractOutsideStart(e) {
      const target = e.target;
      if (!isElement(target))
        return;
      if (target && isLastModal()) {
        e.stopImmediatePropagation();
      }
    }
    function onInteractOutside(e) {
      if (shouldCloseOnInteractOutside?.(e) && isLastModal()) {
        e.stopImmediatePropagation();
        closeModal();
      }
    }
    unsubInteractOutside = useInteractOutside(node, {
      onInteractOutsideStart,
      onInteractOutside: closeOnInteractOutside ? onInteractOutside : void 0
    }).destroy;
  }
  update2(config);
  return {
    update: update2,
    destroy() {
      removeNodeFromVisibleModals();
      unsubInteractOutside();
    }
  };
};
const defaultConfig = {
  floating: {},
  focusTrap: {},
  modal: {},
  escapeKeydown: {},
  portal: "body"
};
const usePopper = (popperElement, args) => {
  popperElement.dataset.escapee = "";
  const { anchorElement, open, options } = args;
  if (!anchorElement || !open || !options) {
    return { destroy: noop };
  }
  const opts = { ...defaultConfig, ...options };
  const callbacks = [];
  if (opts.portal !== null) {
    callbacks.push(usePortal(popperElement, opts.portal).destroy);
  }
  callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
  if (opts.focusTrap !== null) {
    callbacks.push(useFocusTrap(popperElement, {
      fallbackFocus: popperElement,
      ...opts.focusTrap
    }).destroy);
  }
  if (opts.modal !== null) {
    callbacks.push(useModal(popperElement, {
      onClose: () => {
        if (isHTMLElement(anchorElement)) {
          open.set(false);
          anchorElement.focus();
        }
      },
      shouldCloseOnInteractOutside: (e) => {
        if (e.defaultPrevented)
          return false;
        if (isHTMLElement(anchorElement) && anchorElement.contains(e.target)) {
          return false;
        }
        return true;
      },
      ...opts.modal
    }).destroy);
  }
  if (opts.escapeKeydown !== null) {
    callbacks.push(useEscapeKeydown(popperElement, {
      enabled: open,
      handler: () => {
        open.set(false);
      },
      ...opts.escapeKeydown
    }).destroy);
  }
  const unsubscribe = executeCallbacks(...callbacks);
  return {
    destroy() {
      unsubscribe();
    }
  };
};
const usePortal = (el, target = "body") => {
  let targetEl;
  if (!isHTMLElement(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update2(newTarget) {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update2(target);
  return {
    update: update2,
    destroy
  };
};
const useInteractOutside = (node, config) => {
  let unsubEvents = noop;
  let unsubPointerDown = noop;
  let unsubPointerUp = noop;
  let unsubResetInterceptedEvents = noop;
  const documentObj = getOwnerDocument(node);
  let isPointerDown = false;
  let isPointerDownInside = false;
  const interceptedEvents = {
    pointerdown: false,
    pointerup: false,
    mousedown: false,
    mouseup: false,
    touchstart: false,
    touchend: false,
    click: false
  };
  const resetInterceptedEvents = () => {
    for (const eventType in interceptedEvents) {
      interceptedEvents[eventType] = false;
    }
  };
  const isAnyEventIntercepted = () => {
    for (const isIntercepted of Object.values(interceptedEvents)) {
      if (isIntercepted)
        return true;
    }
    return false;
  };
  const setupCapturePhaseHandlerAndMarkAsIntercepted = (eventType, handler) => {
    return addEventListener(documentObj, eventType, (e) => {
      interceptedEvents[eventType] = true;
      handler?.(e);
    }, true);
  };
  const setupBubblePhaseHandlerAndMarkAsNotIntercepted = (eventType, handler) => {
    return addEventListener(documentObj, eventType, (e) => {
      interceptedEvents[eventType] = false;
      handler?.(e);
    });
  };
  function update2(config2) {
    unsubEvents();
    unsubPointerDown();
    unsubPointerUp();
    unsubResetInterceptedEvents();
    resetInterceptedEvents();
    const { onInteractOutside, onInteractOutsideStart, enabled } = { enabled: true, ...config2 };
    if (!enabled)
      return;
    const onPointerDownDebounced = debounce((e) => {
      if (isAnyEventIntercepted())
        return;
      if (onInteractOutside && isValidEvent(e, node))
        onInteractOutsideStart?.(e);
      const target = e.target;
      if (isElement(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }, 10);
    unsubPointerDown = onPointerDownDebounced.destroy;
    const onPointerUpDebounced = debounce((e) => {
      if (isAnyEventIntercepted())
        return;
      if (shouldTriggerInteractOutside(e))
        onInteractOutside?.(e);
      resetPointerState();
    }, 10);
    unsubPointerUp = onPointerUpDebounced.destroy;
    const resetInterceptedEventsDebounced = debounce(resetInterceptedEvents, 20);
    unsubResetInterceptedEvents = resetInterceptedEventsDebounced.destroy;
    unsubEvents = executeCallbacks(
      /** Capture Events For Interaction Start */
      setupCapturePhaseHandlerAndMarkAsIntercepted("pointerdown"),
      setupCapturePhaseHandlerAndMarkAsIntercepted("mousedown"),
      setupCapturePhaseHandlerAndMarkAsIntercepted("touchstart"),
      /**
       * Intercepted events are reset only at the end of an interaction, allowing
       * interception at the start while still capturing the entire interaction.
       * Additionally, intercepted events are reset in the capture phase with `resetInterceptedEventsDebounced`,
       * accommodating events not invoked in the bubbling phase due to user interception.
       */
      setupCapturePhaseHandlerAndMarkAsIntercepted("pointerup", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("mouseup", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("touchend", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("click", resetInterceptedEventsDebounced),
      /** Bubbling Events For Interaction Start */
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("pointerdown", onPointerDownDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("mousedown", onPointerDownDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("touchstart", onPointerDownDebounced),
      /**
       * To effectively detect an end of an interaction, we must monitor all relevant events,
       * not just `click` events. This is because on touch devices, actions like pressing,
       * moving the finger, and lifting it off the screen may not trigger a `click` event,
       * but should still invoke `onPointerUp` to properly handle the interaction.
       */
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("pointerup", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("mouseup", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("touchend", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("click", onPointerUpDebounced)
    );
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update2(config);
  return {
    update: update2,
    destroy() {
      unsubEvents();
      unsubPointerDown();
      unsubPointerUp();
      unsubResetInterceptedEvents();
    }
  };
};
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
function createLabel() {
  const root = makeElement("label", {
    action: (node) => {
      const mouseDown = addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      });
      return {
        destroy: mouseDown
      };
    }
  });
  return {
    elements: {
      root
    }
  };
}
const INTERACTION_KEYS = [kbd.ARROW_LEFT, kbd.ESCAPE, kbd.ARROW_RIGHT, kbd.SHIFT, kbd.CAPS_LOCK, kbd.CONTROL, kbd.ALT, kbd.META, kbd.ENTER, kbd.F1, kbd.F2, kbd.F3, kbd.F4, kbd.F5, kbd.F6, kbd.F7, kbd.F8, kbd.F9, kbd.F10, kbd.F11, kbd.F12];
const defaults$1 = {
  positioning: {
    placement: "bottom",
    sameWidth: true
  },
  scrollAlignment: "nearest",
  loop: true,
  defaultOpen: false,
  closeOnOutsideClick: true,
  preventScroll: true,
  closeOnEscape: true,
  forceVisible: false,
  portal: void 0,
  builder: "listbox",
  disabled: false,
  required: false,
  name: void 0,
  typeahead: true,
  highlightOnHover: true,
  onOutsideClick: void 0
};
const listboxIdParts = ["trigger", "menu", "label"];
function createListbox(props) {
  const withDefaults = { ...defaults$1, ...props };
  const activeTrigger = withGet(writable(null));
  const highlightedItem = withGet(writable(null));
  const selectedWritable = withDefaults.selected ?? writable(withDefaults.defaultSelected);
  const selected = overridable(selectedWritable, withDefaults?.onSelectedChange);
  const highlighted = derived(highlightedItem, ($highlightedItem) => $highlightedItem ? getOptionProps($highlightedItem) : void 0);
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const options = toWritableStores({
    ...omit(withDefaults, "open", "defaultOpen", "builder", "ids"),
    multiple: withDefaults.multiple ?? false
  });
  const { scrollAlignment, loop, closeOnOutsideClick, closeOnEscape, preventScroll, portal, forceVisible, positioning, multiple, arrowSize, disabled, required, typeahead, name: nameProp, highlightOnHover, onOutsideClick } = options;
  const { name: name2, selector } = createElHelpers(withDefaults.builder);
  const ids = toWritableStores({ ...generateIds(listboxIdParts), ...withDefaults.ids });
  const { handleTypeaheadSearch } = createTypeaheadSearch({
    onMatch: (element) => {
      highlightedItem.set(element);
      element.scrollIntoView({ block: scrollAlignment.get() });
    },
    getCurrentItem() {
      return highlightedItem.get();
    }
  });
  function getOptionProps(el) {
    const value = el.getAttribute("data-value");
    const label2 = el.getAttribute("data-label");
    const disabled2 = el.hasAttribute("data-disabled");
    return {
      value: value ? JSON.parse(value) : value,
      label: label2 ?? el.textContent ?? void 0,
      disabled: disabled2 ? true : false
    };
  }
  const setOption = (newOption) => {
    selected.update(($option) => {
      const $multiple = multiple.get();
      if ($multiple) {
        const optionArr = Array.isArray($option) ? [...$option] : [];
        return toggle(newOption, optionArr, (itemA, itemB) => dequal(itemA.value, itemB.value));
      }
      return newOption;
    });
  };
  function selectItem(item) {
    const props2 = getOptionProps(item);
    setOption(props2);
  }
  async function openMenu() {
    open.set(true);
    await tick();
    const menuElement = document.getElementById(ids.menu.get());
    if (!isHTMLElement(menuElement))
      return;
    const selectedItem = menuElement.querySelector("[aria-selected=true]");
    if (!isHTMLElement(selectedItem))
      return;
    highlightedItem.set(selectedItem);
  }
  function closeMenu() {
    open.set(false);
    highlightedItem.set(null);
  }
  const isVisible = derivedVisible({ open, forceVisible, activeTrigger });
  const isSelected = derived([selected], ([$selected]) => {
    return (value) => {
      if (Array.isArray($selected)) {
        return $selected.some((o) => dequal(o.value, value));
      }
      if (isObject(value)) {
        return dequal($selected?.value, stripValues(value, void 0));
      }
      return dequal($selected?.value, value);
    };
  });
  const isHighlighted = derived([highlighted], ([$value]) => {
    return (item) => {
      return dequal($value?.value, item);
    };
  });
  const trigger = makeElement(name2("trigger"), {
    stores: [open, highlightedItem, disabled, ids.menu, ids.trigger, ids.label],
    returned: ([$open, $highlightedItem, $disabled, $menuId, $triggerId, $labelId]) => {
      return {
        "aria-activedescendant": $highlightedItem?.id,
        "aria-autocomplete": "list",
        "aria-controls": $menuId,
        "aria-expanded": $open,
        "aria-labelledby": $labelId,
        // autocomplete: 'off',
        id: $triggerId,
        role: "combobox",
        disabled: disabledAttr($disabled),
        type: withDefaults.builder === "select" ? "button" : void 0
      };
    },
    action: (node) => {
      activeTrigger.set(node);
      const isInput = isHTMLInputElement(node);
      const unsubscribe = executeCallbacks(
        addMeltEventListener(node, "click", () => {
          node.focus();
          const $open = open.get();
          if ($open) {
            closeMenu();
          } else {
            openMenu();
          }
        }),
        // Handle all input key events including typing, meta, and navigation.
        addMeltEventListener(node, "keydown", (e) => {
          const $open = open.get();
          if (!$open) {
            if (INTERACTION_KEYS.includes(e.key)) {
              return;
            }
            if (e.key === kbd.TAB) {
              return;
            }
            if (e.key === kbd.BACKSPACE && isInput && node.value === "") {
              return;
            }
            if (e.key === kbd.SPACE && isHTMLButtonElement(node)) {
              return;
            }
            openMenu();
            tick().then(() => {
              const $selectedItem = selected.get();
              if ($selectedItem)
                return;
              const menuEl = document.getElementById(ids.menu.get());
              if (!isHTMLElement(menuEl))
                return;
              const enabledItems = Array.from(menuEl.querySelectorAll(`${selector("item")}:not([data-disabled]):not([data-hidden])`)).filter((item) => isHTMLElement(item));
              if (!enabledItems.length)
                return;
              if (e.key === kbd.ARROW_DOWN) {
                highlightedItem.set(enabledItems[0]);
                enabledItems[0].scrollIntoView({ block: scrollAlignment.get() });
              } else if (e.key === kbd.ARROW_UP) {
                highlightedItem.set(last(enabledItems));
                last(enabledItems).scrollIntoView({ block: scrollAlignment.get() });
              }
            });
          }
          if (e.key === kbd.TAB) {
            closeMenu();
            return;
          }
          if (e.key === kbd.ENTER && !e.isComposing || e.key === kbd.SPACE && isHTMLButtonElement(node)) {
            e.preventDefault();
            const $highlightedItem = highlightedItem.get();
            if ($highlightedItem) {
              selectItem($highlightedItem);
            }
            if (!multiple.get()) {
              closeMenu();
            }
          }
          if (e.key === kbd.ARROW_UP && e.altKey) {
            closeMenu();
          }
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.preventDefault();
            const menuElement = document.getElementById(ids.menu.get());
            if (!isHTMLElement(menuElement))
              return;
            const itemElements = getOptions(menuElement);
            if (!itemElements.length)
              return;
            const candidateNodes = itemElements.filter((opt) => !isElementDisabled(opt) && opt.dataset.hidden === void 0);
            const $currentItem = highlightedItem.get();
            const currentIndex = $currentItem ? candidateNodes.indexOf($currentItem) : -1;
            const $loop = loop.get();
            const $scrollAlignment = scrollAlignment.get();
            let nextItem;
            switch (e.key) {
              case kbd.ARROW_DOWN:
                nextItem = next(candidateNodes, currentIndex, $loop);
                break;
              case kbd.ARROW_UP:
                nextItem = prev(candidateNodes, currentIndex, $loop);
                break;
              case kbd.PAGE_DOWN:
                nextItem = forward(candidateNodes, currentIndex, 10, $loop);
                break;
              case kbd.PAGE_UP:
                nextItem = back(candidateNodes, currentIndex, 10, $loop);
                break;
              case kbd.HOME:
                nextItem = candidateNodes[0];
                break;
              case kbd.END:
                nextItem = last(candidateNodes);
                break;
              default:
                return;
            }
            highlightedItem.set(nextItem);
            nextItem?.scrollIntoView({ block: $scrollAlignment });
          } else if (typeahead.get()) {
            const menuEl = document.getElementById(ids.menu.get());
            if (!isHTMLElement(menuEl))
              return;
            handleTypeaheadSearch(e.key, getOptions(menuEl));
          }
        })
      );
      let unsubEscapeKeydown = noop;
      const escape2 = useEscapeKeydown(node, {
        handler: closeMenu,
        enabled: derived([open, closeOnEscape], ([$open, $closeOnEscape]) => {
          return $open && $closeOnEscape;
        })
      });
      if (escape2 && escape2.destroy) {
        unsubEscapeKeydown = escape2.destroy;
      }
      return {
        destroy() {
          activeTrigger.set(null);
          unsubscribe();
          unsubEscapeKeydown();
        }
      };
    }
  });
  const menu = makeElement(name2("menu"), {
    stores: [isVisible, ids.menu],
    returned: ([$isVisible, $menuId]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        id: $menuId,
        role: "listbox",
        style: $isVisible ? void 0 : styleToString({ display: "none" })
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubscribe = executeCallbacks(
        // Bind the popper portal to the input element.
        effect([isVisible, portal, closeOnOutsideClick, positioning, activeTrigger], ([$isVisible, $portal, $closeOnOutsideClick, $positioning, $activeTrigger]) => {
          unsubPopper();
          if (!$isVisible || !$activeTrigger)
            return;
          tick().then(() => {
            unsubPopper();
            const ignoreHandler = createClickOutsideIgnore(ids.trigger.get());
            unsubPopper = usePopper(node, {
              anchorElement: $activeTrigger,
              open,
              options: {
                floating: $positioning,
                focusTrap: null,
                modal: {
                  closeOnInteractOutside: $closeOnOutsideClick,
                  onClose: closeMenu,
                  shouldCloseOnInteractOutside: (e) => {
                    onOutsideClick.get()?.(e);
                    if (e.defaultPrevented)
                      return false;
                    const target = e.target;
                    if (!isElement(target))
                      return false;
                    if (target === $activeTrigger || $activeTrigger.contains(target)) {
                      return false;
                    }
                    if (ignoreHandler(e))
                      return false;
                    return true;
                  }
                },
                escapeKeydown: null,
                portal: getPortalDestination(node, $portal)
              }
            }).destroy;
          });
        })
      );
      return {
        destroy: () => {
          unsubscribe();
          unsubPopper();
        }
      };
    }
  });
  const { elements: { root: labelBuilder } } = createLabel();
  const { action: labelAction } = get_store_value(labelBuilder);
  const label = makeElement(name2("label"), {
    stores: [ids.label, ids.trigger],
    returned: ([$labelId, $triggerId]) => {
      return {
        id: $labelId,
        for: $triggerId
      };
    },
    action: labelAction
  });
  const option = makeElement(name2("option"), {
    stores: [isSelected],
    returned: ([$isSelected]) => (props2) => {
      const selected2 = $isSelected(props2.value);
      return {
        "data-value": JSON.stringify(props2.value),
        "data-label": props2.label,
        "data-disabled": disabledAttr(props2.disabled),
        "aria-disabled": props2.disabled ? true : void 0,
        "aria-selected": selected2,
        "data-selected": selected2 ? "" : void 0,
        id: generateId(),
        role: "option"
      };
    },
    action: (node) => {
      const unsubscribe = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        if (isElementDisabled(node)) {
          e.preventDefault();
          return;
        }
        selectItem(node);
        if (!multiple.get()) {
          closeMenu();
        }
      }), effect(highlightOnHover, ($highlightOnHover) => {
        if (!$highlightOnHover)
          return;
        const unsub = executeCallbacks(addMeltEventListener(node, "mouseover", () => {
          highlightedItem.set(node);
        }), addMeltEventListener(node, "mouseleave", () => {
          highlightedItem.set(null);
        }));
        return unsub;
      }));
      return { destroy: unsubscribe };
    }
  });
  const group = makeElement(name2("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = makeElement(name2("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const hiddenInput = createHiddenInput({
    value: derived([selected], ([$selected]) => {
      const value = Array.isArray($selected) ? $selected.map((o) => o.value) : $selected?.value;
      return typeof value === "string" ? value : JSON.stringify(value);
    }),
    name: readonly(nameProp),
    required,
    prefix: withDefaults.builder
  });
  const arrow2 = makeElement(name2("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  effect([highlightedItem], ([$highlightedItem]) => {
    if (!isBrowser)
      return;
    const menuElement = document.getElementById(ids.menu.get());
    if (!isHTMLElement(menuElement))
      return;
    getOptions(menuElement).forEach((node) => {
      if (node === $highlightedItem) {
        addHighlight(node);
      } else {
        removeHighlight(node);
      }
    });
  });
  effect([open, preventScroll], ([$open, $preventScroll]) => {
    if (!isBrowser || !$open || !$preventScroll)
      return;
    return removeScroll();
  });
  return {
    ids,
    elements: {
      trigger,
      group,
      option,
      menu,
      groupLabel,
      label,
      hiddenInput,
      arrow: arrow2
    },
    states: {
      open,
      selected,
      highlighted,
      highlightedItem
    },
    helpers: {
      isSelected,
      isHighlighted,
      closeMenu
    },
    options
  };
}
function createSelect(props) {
  const listbox = createListbox({ ...props, builder: "select" });
  const selectedLabel = derived(listbox.states.selected, ($selected) => {
    if (Array.isArray($selected)) {
      return $selected.map((o) => o.label).join(", ");
    }
    return $selected?.label ?? "";
  });
  return {
    ...listbox,
    elements: {
      ...listbox.elements
    },
    states: {
      ...listbox.states,
      selectedLabel
    }
  };
}
const defaults = {
  defaultValue: [],
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
  dir: "ltr",
  disabled: false
};
const { name } = createElHelpers("slider");
const createSlider = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "onValueChange", "defaultValue"));
  const { min, max, step, orientation, dir, disabled } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const isActive = withGet(writable(false));
  const currentThumbIndex = withGet(writable(0));
  const activeThumb = withGet(writable(null));
  const meltIds = generateIds(["root"]);
  const updatePosition = (val, index) => {
    value.update((prev2) => {
      if (!prev2)
        return [val];
      if (prev2[index] === val)
        return prev2;
      const newValue = [...prev2];
      const direction2 = newValue[index] > val ? -1 : 1;
      function swap() {
        newValue[index] = newValue[index + direction2];
        newValue[index + direction2] = val;
        const thumbs2 = getAllThumbs();
        if (thumbs2) {
          thumbs2[index + direction2].focus();
          activeThumb.set({ thumb: thumbs2[index + direction2], index: index + direction2 });
        }
      }
      if (direction2 === -1 && val < newValue[index - 1]) {
        swap();
        return newValue;
      } else if (direction2 === 1 && val > newValue[index + 1]) {
        swap();
        return newValue;
      }
      const $min = min.get();
      const $max = max.get();
      const $step = step.get();
      newValue[index] = snapValueToStep(val, $min, $max, $step);
      return newValue;
    });
  };
  const getAllThumbs = () => {
    const root2 = getElementByMeltId(meltIds.root);
    if (!root2)
      return null;
    return Array.from(root2.querySelectorAll('[data-melt-part="thumb"]')).filter((thumb) => isHTMLElement(thumb));
  };
  const position = derived([min, max], ([$min, $max]) => {
    return (val) => {
      const pos = (val - $min) / ($max - $min) * 100;
      return pos;
    };
  });
  const direction = withGet.derived([orientation, dir], ([$orientation, $dir]) => {
    if ($orientation === "horizontal") {
      return $dir === "rtl" ? "rl" : "lr";
    } else {
      return $dir === "rtl" ? "tb" : "bt";
    }
  });
  const root = makeElement(name(), {
    stores: [disabled, orientation, dir],
    returned: ([$disabled, $orientation, $dir]) => {
      return {
        dir: $dir,
        disabled: disabledAttr($disabled),
        "data-disabled": disabledAttr($disabled),
        "data-orientation": $orientation,
        style: $disabled ? void 0 : `touch-action: ${$orientation === "horizontal" ? "pan-y" : "pan-x"}`,
        "data-melt-id": meltIds.root
      };
    }
  });
  const range = makeElement(name("range"), {
    stores: [value, direction, position],
    returned: ([$value, $direction, $position]) => {
      const minimum = $value.length > 1 ? $position(Math.min(...$value) ?? 0) : 0;
      const maximum = 100 - $position(Math.max(...$value) ?? 0);
      const style = {
        position: "absolute"
      };
      switch ($direction) {
        case "lr": {
          style.left = `${minimum}%`;
          style.right = `${maximum}%`;
          break;
        }
        case "rl": {
          style.right = `${minimum}%`;
          style.left = `${maximum}%`;
          break;
        }
        case "bt": {
          style.bottom = `${minimum}%`;
          style.top = `${maximum}%`;
          break;
        }
        case "tb": {
          style.top = `${minimum}%`;
          style.bottom = `${maximum}%`;
          break;
        }
      }
      return {
        style: styleToString(style)
      };
    }
  });
  const thumbs = makeElementArray(name("thumb"), {
    stores: [value, position, min, max, disabled, orientation, direction],
    returned: ([$value, $position, $min, $max, $disabled, $orientation, $direction]) => {
      const result = Array.from({ length: $value.length || 1 }, (_, i) => {
        const currentThumb = currentThumbIndex.get();
        if (currentThumb < $value.length) {
          currentThumbIndex.update((prev2) => prev2 + 1);
        }
        const thumbValue = $value[i];
        const thumbPosition = `${$position(thumbValue)}%`;
        const style = {
          position: "absolute"
        };
        switch ($direction) {
          case "lr": {
            style.left = thumbPosition;
            style.translate = "-50% 0";
            break;
          }
          case "rl": {
            style.right = thumbPosition;
            style.translate = "50% 0";
            break;
          }
          case "bt": {
            style.bottom = thumbPosition;
            style.translate = "0 50%";
            break;
          }
          case "tb": {
            style.top = thumbPosition;
            style.translate = "0 -50%";
            break;
          }
        }
        return {
          role: "slider",
          "aria-valuemin": $min,
          "aria-valuemax": $max,
          "aria-valuenow": thumbValue,
          "aria-disabled": disabledAttr($disabled),
          "aria-orientation": $orientation,
          "data-melt-part": "thumb",
          "data-value": thumbValue,
          style: styleToString(style),
          tabindex: $disabled ? -1 : 0
        };
      });
      return result;
    },
    action: (node) => {
      const unsub = addMeltEventListener(node, "keydown", (event) => {
        if (disabled.get())
          return;
        const target = event.currentTarget;
        if (!isHTMLElement(target))
          return;
        const thumbs2 = getAllThumbs();
        if (!thumbs2?.length)
          return;
        const index = thumbs2.indexOf(target);
        currentThumbIndex.set(index);
        if (![
          kbd.ARROW_LEFT,
          kbd.ARROW_RIGHT,
          kbd.ARROW_UP,
          kbd.ARROW_DOWN,
          kbd.HOME,
          kbd.END
        ].includes(event.key)) {
          return;
        }
        event.preventDefault();
        const $min = min.get();
        const $max = max.get();
        const $step = step.get();
        const $value = value.get();
        const $orientation = orientation.get();
        const $direction = direction.get();
        const thumbValue = $value[index];
        switch (event.key) {
          case kbd.HOME: {
            updatePosition($min, index);
            break;
          }
          case kbd.END: {
            updatePosition($max, index);
            break;
          }
          case kbd.ARROW_LEFT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              const newValue = $direction === "rl" ? $max : $min;
              updatePosition(newValue, index);
            } else if ($direction === "rl" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            } else if ($direction === "lr" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            }
            break;
          }
          case kbd.ARROW_RIGHT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              const newValue = $direction === "rl" ? $min : $max;
              updatePosition(newValue, index);
            } else if ($direction === "rl" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            } else if ($direction === "lr" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            }
            break;
          }
          case kbd.ARROW_UP: {
            if (event.metaKey) {
              const newValue = $direction === "tb" ? $min : $max;
              updatePosition(newValue, index);
            } else if ($direction === "tb" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            } else if ($direction !== "tb" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            }
            break;
          }
          case kbd.ARROW_DOWN: {
            if (event.metaKey) {
              const newValue = $direction === "tb" ? $max : $min;
              updatePosition(newValue, index);
            } else if ($direction === "tb" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            } else if ($direction !== "tb" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            }
            break;
          }
        }
      });
      return {
        destroy: unsub
      };
    }
  });
  const ticks = makeElementArray(name("tick"), {
    stores: [value, min, max, step, direction],
    returned: ([$value, $min, $max, $step, $direction]) => {
      const difference = $max - $min;
      let count = Math.ceil(difference / $step);
      if (difference % $step == 0) {
        count++;
      }
      return Array.from({ length: count }, (_, i) => {
        const tickPosition = `${i * ($step / ($max - $min)) * 100}%`;
        const isFirst = i === 0;
        const isLast = i === count - 1;
        const offsetPercentage = isFirst ? 0 : isLast ? -100 : -50;
        const style = {
          position: "absolute"
        };
        switch ($direction) {
          case "lr": {
            style.left = tickPosition;
            style.translate = `${offsetPercentage}% 0`;
            break;
          }
          case "rl": {
            style.right = tickPosition;
            style.translate = `${-offsetPercentage}% 0`;
            break;
          }
          case "bt": {
            style.bottom = tickPosition;
            style.translate = `0 ${-offsetPercentage}%`;
            break;
          }
          case "tb": {
            style.top = tickPosition;
            style.translate = `0 ${offsetPercentage}%`;
            break;
          }
        }
        const tickValue = $min + i * $step;
        const bounded = $value.length === 1 ? tickValue <= $value[0] : $value[0] <= tickValue && tickValue <= $value[$value.length - 1];
        return {
          "data-bounded": bounded ? true : void 0,
          "data-value": tickValue,
          style: styleToString(style)
        };
      });
    }
  });
  effect([root, min, max, disabled, orientation, direction, step], ([$root, $min, $max, $disabled, $orientation, $direction, $step]) => {
    if (!isBrowser || $disabled)
      return;
    const applyPosition = (clientXY, activeThumbIdx, start, end) => {
      const percent = (clientXY - start) / (end - start);
      const val = percent * ($max - $min) + $min;
      if (val < $min) {
        updatePosition($min, activeThumbIdx);
      } else if (val > $max) {
        updatePosition($max, activeThumbIdx);
      } else {
        const step2 = $step;
        const min2 = $min;
        const currentStep = Math.floor((val - min2) / step2);
        const midpointOfCurrentStep = min2 + currentStep * step2 + step2 / 2;
        const midpointOfNextStep = min2 + (currentStep + 1) * step2 + step2 / 2;
        const newValue = val >= midpointOfCurrentStep && val < midpointOfNextStep ? (currentStep + 1) * step2 + min2 : currentStep * step2 + min2;
        if (newValue <= $max) {
          updatePosition(newValue, activeThumbIdx);
        }
      }
    };
    const getClosestThumb = (e) => {
      const thumbs2 = getAllThumbs();
      if (!thumbs2)
        return;
      thumbs2.forEach((thumb2) => thumb2.blur());
      const distances = thumbs2.map((thumb2) => {
        if ($orientation === "horizontal") {
          const { left, right } = thumb2.getBoundingClientRect();
          return Math.abs(e.clientX - (left + right) / 2);
        } else {
          const { top, bottom } = thumb2.getBoundingClientRect();
          return Math.abs(e.clientY - (top + bottom) / 2);
        }
      });
      const thumb = thumbs2[distances.indexOf(Math.min(...distances))];
      const index = thumbs2.indexOf(thumb);
      return { thumb, index };
    };
    const pointerMove = (e) => {
      if (!isActive.get())
        return;
      e.preventDefault();
      e.stopPropagation();
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = activeThumb.get();
      if (!sliderEl || !closestThumb)
        return;
      closestThumb.thumb.focus();
      const { left, right, top, bottom } = sliderEl.getBoundingClientRect();
      switch ($direction) {
        case "lr": {
          applyPosition(e.clientX, closestThumb.index, left, right);
          break;
        }
        case "rl": {
          applyPosition(e.clientX, closestThumb.index, right, left);
          break;
        }
        case "bt": {
          applyPosition(e.clientY, closestThumb.index, bottom, top);
          break;
        }
        case "tb": {
          applyPosition(e.clientY, closestThumb.index, top, bottom);
          break;
        }
      }
    };
    const pointerDown = (e) => {
      if (e.button !== 0)
        return;
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = getClosestThumb(e);
      if (!closestThumb || !sliderEl)
        return;
      const target = e.target;
      if (!isHTMLElement(target) || !sliderEl.contains(target)) {
        return;
      }
      e.preventDefault();
      activeThumb.set(closestThumb);
      closestThumb.thumb.focus();
      isActive.set(true);
      pointerMove(e);
    };
    const pointerUp = () => {
      isActive.set(false);
    };
    const unsub = executeCallbacks(addEventListener(document, "pointerdown", pointerDown), addEventListener(document, "pointerup", pointerUp), addEventListener(document, "pointerleave", pointerUp), addEventListener(document, "pointermove", pointerMove));
    return () => {
      unsub();
    };
  });
  effect([step, min, max, value], function fixValue([$step, $min, $max, $value]) {
    const isValidValue = (v) => {
      const snappedValue = snapValueToStep(v, $min, $max, $step);
      return snappedValue === v;
    };
    const gcv = (v) => {
      return snapValueToStep(v, $min, $max, $step);
    };
    if ($value.some((v) => !isValidValue(v))) {
      value.update((prev2) => {
        return prev2.map(gcv);
      });
    }
  });
  return {
    elements: {
      root,
      thumbs,
      range,
      ticks
    },
    states: {
      value
    },
    options
  };
};
const css$4 = {
  code: ".check.svelte-1bri1q7{position:absolute;left:0.5rem;top:50%;z-index:14;translate:0 calc(-50% + 1px)}button.svelte-1bri1q7{border:none}div.svelte-1bri1q7{z-index:12}",
  map: `{"version":3,"file":"FontSelect.svelte","sources":["FontSelect.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { createSelect, melt } from \\"@melt-ui/svelte\\";\\nimport Dot from \\"lucide-svelte/icons/dot\\";\\nexport let selections = [];\\nexport let selected;\\nexport let title;\\nconst {\\n  elements: { trigger, menu, option, label },\\n  states: { selectedLabel, open },\\n  helpers: { isSelected }\\n} = createSelect({\\n  forceVisible: true,\\n  positioning: {\\n    placement: \\"bottom\\",\\n    fitViewport: true,\\n    sameWidth: true\\n  },\\n  defaultSelected: { value: selected, label: selected }\\n});\\n$:\\n  selected = $selectedLabel;\\n<\/script>\\n\\n<div class=\\"flex flex-col gap-1\\">\\n  <!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->\\n  <label class=\\"block text-[2em]\\" {...$label} use:$label.action>{title}</label>\\n  <button\\n    class=\\"flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-black text-white px-3 py-2\\n  text-magnum-700 shadow transition-opacity hover:opacity-90\\"\\n    {...$trigger} use:$trigger.action\\n    aria-label=\\"Food\\"\\n  >\\n    {$selectedLabel || \\"Inter\\"}\\n  </button>\\n  {#if $open}\\n    <div\\n      class=\\"z-12 flex max-h-[300px] flex-col\\n    overflow-y-auto rounded-lg bg-black text-white p-1\\n    shadow focus:!ring-0\\"\\n      {...$menu} use:$menu.action\\n    >\\n      {#each selections as item}\\n        {@const __MELTUI_BUILDER_0__ = $option({ value: item, label: item })}\\n        <div\\n          class=\\"relative cursor-pointer rounded-lg py-1 pl-8 pr-4\\n              hover:bg-magnum-100 focus:z-12\\n              focus:text-magnum-700\\n              data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900\\n              data-[disabled]:opacity-50\\"\\n          {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action\\n        >\\n          <div class=\\"check {$isSelected(item) ? 'block' : 'hidden'}\\">\\n            <Dot />\\n          </div>\\n\\n          {item}\\n        </div>\\n      {/each}\\n    </div>\\n  {/if}\\n</div>\\n\\n<style>\\n  .check {\\n    position: absolute;\\n    left: 0.5rem;\\n    top: 50%;\\n    z-index: 14;\\n    translate: 0 calc(-50% + 1px);\\n  }\\n  button {\\n    border: none;\\n  }\\n  div {\\n    z-index: 12;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA8DE,qBAAO,CACL,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,MAAM,CACZ,GAAG,CAAE,GAAG,CACR,OAAO,CAAE,EAAE,CACX,SAAS,CAAE,CAAC,CAAC,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAC9B,CACA,qBAAO,CACL,MAAM,CAAE,IACV,CACA,kBAAI,CACF,OAAO,CAAE,EACX"}`
};
const FontSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedLabel, $$unsubscribe_selectedLabel;
  let $label, $$unsubscribe_label;
  let $trigger, $$unsubscribe_trigger;
  let $open, $$unsubscribe_open;
  let $menu, $$unsubscribe_menu;
  let $option, $$unsubscribe_option;
  let $isSelected, $$unsubscribe_isSelected;
  let { selections = [] } = $$props;
  let { selected } = $$props;
  let { title } = $$props;
  const { elements: { trigger, menu, option, label }, states: { selectedLabel, open }, helpers: { isSelected } } = createSelect({
    forceVisible: true,
    positioning: {
      placement: "bottom",
      fitViewport: true,
      sameWidth: true
    },
    defaultSelected: { value: selected, label: selected }
  });
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  $$unsubscribe_menu = subscribe(menu, (value) => $menu = value);
  $$unsubscribe_option = subscribe(option, (value) => $option = value);
  $$unsubscribe_label = subscribe(label, (value) => $label = value);
  $$unsubscribe_selectedLabel = subscribe(selectedLabel, (value) => $selectedLabel = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  $$unsubscribe_isSelected = subscribe(isSelected, (value) => $isSelected = value);
  if ($$props.selections === void 0 && $$bindings.selections && selections !== void 0)
    $$bindings.selections(selections);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css$4);
  selected = $selectedLabel;
  $$unsubscribe_selectedLabel();
  $$unsubscribe_label();
  $$unsubscribe_trigger();
  $$unsubscribe_open();
  $$unsubscribe_menu();
  $$unsubscribe_option();
  $$unsubscribe_isSelected();
  return `<div class="flex flex-col gap-1 svelte-1bri1q7"> <label${spread([{ class: "block text-[2em]" }, escape_object($label)], { classes: "svelte-1bri1q7" })}>${escape(title)}</label> <button${spread(
    [
      {
        class: "flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-black text-white px-3 py-2 text-magnum-700 shadow transition-opacity hover:opacity-90"
      },
      escape_object($trigger),
      { "aria-label": "Food" }
    ],
    { classes: "svelte-1bri1q7" }
  )}>${escape($selectedLabel || "Inter")}</button> ${$open ? `<div${spread(
    [
      {
        class: "z-12 flex max-h-[300px] flex-col overflow-y-auto rounded-lg bg-black text-white p-1 shadow focus:!ring-0"
      },
      escape_object($menu)
    ],
    { classes: "svelte-1bri1q7" }
  )}>${each(selections, (item) => {
    let __MELTUI_BUILDER_0__ = $option({ value: item, label: item });
    return ` <div${spread(
      [
        {
          class: "relative cursor-pointer rounded-lg py-1 pl-8 pr-4 hover:bg-magnum-100 focus:z-12 focus:text-magnum-700 data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900 data-[disabled]:opacity-50"
        },
        escape_object(__MELTUI_BUILDER_0__)
      ],
      { classes: "svelte-1bri1q7" }
    )}><div class="${"check " + escape($isSelected(item) ? "block" : "hidden", true) + " svelte-1bri1q7"}">${validate_component(Dot$1, "Dot").$$render($$result, {}, {}, {})}</div> ${escape(item)} </div>`;
  })}</div>` : ``} </div>`;
});
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let __MELTUI_BUILDER_0__;
  let $thumbs, $$unsubscribe_thumbs;
  let $value, $$unsubscribe_value;
  let $root, $$unsubscribe_root;
  let $range, $$unsubscribe_range;
  let { defaultValue } = $$props;
  let { min } = $$props;
  let { max } = $$props;
  const { elements: { root, range, thumbs }, states: { value } } = createSlider({ defaultValue: [defaultValue], min, max });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  $$unsubscribe_range = subscribe(range, (value2) => $range = value2);
  $$unsubscribe_thumbs = subscribe(thumbs, (value2) => $thumbs = value2);
  $$unsubscribe_value = subscribe(value, (value2) => $value = value2);
  if ($$props.defaultValue === void 0 && $$bindings.defaultValue && defaultValue !== void 0)
    $$bindings.defaultValue(defaultValue);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  defaultValue = $value[0];
  __MELTUI_BUILDER_0__ = $thumbs[0];
  $$unsubscribe_thumbs();
  $$unsubscribe_value();
  $$unsubscribe_root();
  $$unsubscribe_range();
  return `<span${spread(
    [
      escape_object($root),
      {
        class: "relative flex h-[20px] w-full items-center"
      }
    ],
    {}
  )}><span class="h-[3px] w-full bg-black"><span${spread([escape_object($range), { class: "h-[3px] bg-black" }], {})}></span></span> <span${spread(
    [
      escape_object(__MELTUI_BUILDER_0__),
      { "aria-label": "Text size" },
      {
        class: "h-5 w-5 rounded-full bg-black cursor-pointer"
      }
    ],
    {}
  )}></span></span>`;
});
const css$3 = {
  code: "#fuck.svelte-1jy4rmv{height:calc(100dvh - 71px)}",
  map: '{"version":3,"file":"ScrollArea.svelte","sources":["ScrollArea.svelte"],"sourcesContent":["<script>\\n  import { createScrollArea, melt } from \\"@melt-ui/svelte\\";\\n\\n  const {\\n    elements: { root, content, viewport, corner, scrollbarY, thumbY },\\n  } = createScrollArea({\\n    type: \\"scroll\\",\\n    dir: \\"ltr\\",\\n  });\\n<\/script>\\n\\n<div\\n  {...$root} use:$root.action\\n  id=\\"fuck\\"\\n  class=\\"relative h-[calc(100dvh - 71px)] w-full overflow-hidden\\"\\n>\\n  <div {...$viewport} use:$viewport.action class=\\"h-full w-full\\">\\n    <div {...$content} use:$content.action>\\n      <slot />\\n    </div>\\n  </div>\\n  <div\\n    {...$scrollbarY} use:$scrollbarY.action\\n    class=\\"flex h-full w-2.5 touch-none select-none border-l border-l-transparent bg-neutral-300/10 p-px transition-colors\\"\\n  >\\n    <div {...$thumbY} use:$thumbY.action class=\\"relative flex-1 rounded-full bg-black\\" />\\n  </div>\\n  <div {...$corner} use:$corner.action />\\n</div>\\n\\n<style>\\n  #fuck {\\n    height: calc(100dvh - 71px);\\n  }\\n</style>\\n"],"names":[],"mappings":"AA+BE,oBAAM,CACJ,MAAM,CAAE,KAAK,MAAM,CAAC,CAAC,CAAC,IAAI,CAC5B"}'
};
const ScrollArea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $root, $$unsubscribe_root;
  let $viewport, $$unsubscribe_viewport;
  let $content, $$unsubscribe_content;
  let $scrollbarY, $$unsubscribe_scrollbarY;
  let $thumbY, $$unsubscribe_thumbY;
  let $corner, $$unsubscribe_corner;
  const { elements: { root, content, viewport, corner, scrollbarY, thumbY } } = createScrollArea({ type: "scroll", dir: "ltr" });
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_viewport = subscribe(viewport, (value) => $viewport = value);
  $$unsubscribe_corner = subscribe(corner, (value) => $corner = value);
  $$unsubscribe_scrollbarY = subscribe(scrollbarY, (value) => $scrollbarY = value);
  $$unsubscribe_thumbY = subscribe(thumbY, (value) => $thumbY = value);
  $$result.css.add(css$3);
  $$unsubscribe_root();
  $$unsubscribe_viewport();
  $$unsubscribe_content();
  $$unsubscribe_scrollbarY();
  $$unsubscribe_thumbY();
  $$unsubscribe_corner();
  return `<div${spread(
    [
      escape_object($root),
      { id: "fuck" },
      {
        class: "relative h-[calc(100dvh - 71px)] w-full overflow-hidden"
      }
    ],
    { classes: "svelte-1jy4rmv" }
  )}><div${spread([escape_object($viewport), { class: "h-full w-full" }], { classes: "svelte-1jy4rmv" })}><div${spread([escape_object($content)], { classes: "svelte-1jy4rmv" })}>${slots.default ? slots.default({}) : ``}</div></div> <div${spread(
    [
      escape_object($scrollbarY),
      {
        class: "flex h-full w-2.5 touch-none select-none border-l border-l-transparent bg-neutral-300/10 p-px transition-colors"
      }
    ],
    { classes: "svelte-1jy4rmv" }
  )}><div${spread(
    [
      escape_object($thumbY),
      {
        class: "relative flex-1 rounded-full bg-black"
      }
    ],
    { classes: "svelte-1jy4rmv" }
  )}></div></div> <div${spread([escape_object($corner)], { classes: "svelte-1jy4rmv" })}></div> </div>`;
});
const css$2 = {
  code: "div.svelte-6ys6jc.svelte-6ys6jc{width:calc(var(--width) - 1px);position:absolute;top:64px;height:calc(100% - 64px);background-color:var(--bg);z-index:11;text-align:left;font-family:var(--font)}li.svelte-6ys6jc.svelte-6ys6jc{height:26vh}ul.svelte-6ys6jc.svelte-6ys6jc{margin:26px 50px 0 20%}ul.svelte-6ys6jc>li.svelte-6ys6jc{font-size:0.875rem}h2.svelte-6ys6jc.svelte-6ys6jc{font-size:2em}@media only screen and (max-width: 900px){div.svelte-6ys6jc.svelte-6ys6jc{width:var(--width)}ul.svelte-6ys6jc.svelte-6ys6jc{margin:100px 10%}ul.svelte-6ys6jc>li.svelte-6ys6jc{font-size:var(--size)}}",
  map: '{"version":3,"file":"Settings.svelte","sources":["Settings.svelte"],"sourcesContent":["<script lang=\\"ts\\">import FontSelect from \\"./FontSelect.svelte\\";\\nimport Slider from \\"./Slider.svelte\\";\\nimport { readerSettings } from \\"$lib/stores\\";\\nimport ScrollArea from \\"$lib/ScrollArea.svelte\\";\\nexport let innerWidth;\\nlet width;\\nconsole.log($readerSettings);\\n$:\\n  if (innerWidth > 900) {\\n    width = 50;\\n  } else {\\n    width = 100;\\n  }\\n<\/script>\\n\\n<div\\n\\tstyle=\\"--width: {width}%; --font: {$readerSettings.fontFamily}; --size: calc({$readerSettings.fontSize}px * 0.7)\\"\\n\\tclass=\\"\\"\\n>\\n\\t<ScrollArea>\\n\\t\\t<ul class=\\"text-[11vmin]\\">\\n\\t\\t\\t<li>\\n\\t\\t\\t\\t<FontSelect\\n\\t\\t\\t\\t\\ttitle=\\"Theme\\"\\n\\t\\t\\t\\t\\tbind:selected={$readerSettings.theme}\\n\\t\\t\\t\\t\\tselections={[\\"Default\\", \\"Dark\\", \\"Other\\"]}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</li>\\n\\t\\t\\t<li>\\n\\t\\t\\t\\t<FontSelect\\n\\t\\t\\t\\t\\ttitle=\\"Font\\"\\n\\t\\t\\t\\t\\tbind:selected={$readerSettings.fontFamily}\\n\\t\\t\\t\\t\\tselections={[\\"Inter\\", \\"Fira Code\\", \\"Literata\\"]}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</li>\\n\\t\\t\\t<li>\\n\\t\\t\\t\\t<h2>Text size: {$readerSettings.fontSize}</h2>\\n\\t\\t\\t\\t<Slider\\n\\t\\t\\t\\t\\tmin={10}\\n\\t\\t\\t\\t\\tmax={30}\\n\\t\\t\\t\\t\\tbind:defaultValue={$readerSettings.fontSize}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</li>\\n\\t\\t\\t<li>\\n\\t\\t\\t\\t<h2>Text spacing: {$readerSettings.letterSpacing + 1}</h2>\\n\\t\\t\\t\\t<Slider\\n\\t\\t\\t\\t\\tmin={0}\\n\\t\\t\\t\\t\\tmax={9}\\n\\t\\t\\t\\t\\tbind:defaultValue={$readerSettings.letterSpacing}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</li>\\n\\t\\t</ul>\\n\\t</ScrollArea>\\n</div>\\n\\n<style>\\n\\tdiv {\\n\\t\\twidth: calc(var(--width) - 1px);\\n\\t\\tposition: absolute;\\n\\t\\ttop: 64px;\\n\\t\\theight: calc(100% - 64px);\\n\\t\\tbackground-color: var(--bg);\\n\\t\\tz-index: 11;\\n\\t\\ttext-align: left;\\n\\t\\tfont-family: var(--font);\\n\\t}\\n\\tli {\\n\\t\\theight: 26vh;\\n\\t}\\n\\tul {\\n\\t\\tmargin: 26px 50px 0 20%;\\n\\t}\\n\\tul > li {\\n\\t\\tfont-size: 0.875rem;\\n\\t}\\n\\th2 {\\n\\t\\tfont-size: 2em;\\n\\t}\\n\\t@media only screen and (max-width: 900px) {\\n\\t\\tdiv {\\n\\t\\t\\twidth: var(--width);\\n\\t\\t}\\n\\t\\tul {\\n\\t\\t\\tmargin: 100px 10%;\\n\\t\\t}\\n\\t\\tul > li {\\n\\t\\t\\tfont-size: var(--size);\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwDC,+BAAI,CACH,KAAK,CAAE,KAAK,IAAI,OAAO,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC/B,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CACzB,gBAAgB,CAAE,IAAI,IAAI,CAAC,CAC3B,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,IAAI,MAAM,CACxB,CACA,8BAAG,CACF,MAAM,CAAE,IACT,CACA,8BAAG,CACF,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,GACrB,CACA,gBAAE,CAAG,gBAAG,CACP,SAAS,CAAE,QACZ,CACA,8BAAG,CACF,SAAS,CAAE,GACZ,CACA,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAE,CACzC,+BAAI,CACH,KAAK,CAAE,IAAI,OAAO,CACnB,CACA,8BAAG,CACF,MAAM,CAAE,KAAK,CAAC,GACf,CACA,gBAAE,CAAG,gBAAG,CACP,SAAS,CAAE,IAAI,MAAM,CACtB,CACD"}'
};
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $readerSettings, $$unsubscribe_readerSettings;
  $$unsubscribe_readerSettings = subscribe(readerSettings, (value) => $readerSettings = value);
  let { innerWidth } = $$props;
  let width;
  console.log($readerSettings);
  if ($$props.innerWidth === void 0 && $$bindings.innerWidth && innerWidth !== void 0)
    $$bindings.innerWidth(innerWidth);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (innerWidth > 900) {
        width = 50;
      } else {
        width = 100;
      }
    }
    $$rendered = `<div style="${"--width: " + escape(width, true) + "%; --font: " + escape($readerSettings.fontFamily, true) + "; --size: calc(" + escape($readerSettings.fontSize, true) + "px * 0.7)"}" class=" svelte-6ys6jc">${validate_component(ScrollArea, "ScrollArea").$$render($$result, {}, {}, {
      default: () => {
        return `<ul class="text-[11vmin] svelte-6ys6jc"><li class="svelte-6ys6jc">${validate_component(FontSelect, "FontSelect").$$render(
          $$result,
          {
            title: "Theme",
            selections: ["Default", "Dark", "Other"],
            selected: $readerSettings.theme
          },
          {
            selected: ($$value) => {
              $readerSettings.theme = $$value;
              $$settled = false;
            }
          },
          {}
        )}</li> <li class="svelte-6ys6jc">${validate_component(FontSelect, "FontSelect").$$render(
          $$result,
          {
            title: "Font",
            selections: ["Inter", "Fira Code", "Literata"],
            selected: $readerSettings.fontFamily
          },
          {
            selected: ($$value) => {
              $readerSettings.fontFamily = $$value;
              $$settled = false;
            }
          },
          {}
        )}</li> <li class="svelte-6ys6jc"><h2 class="svelte-6ys6jc">Text size: ${escape($readerSettings.fontSize)}</h2> ${validate_component(Slider, "Slider").$$render(
          $$result,
          {
            min: 10,
            max: 30,
            defaultValue: $readerSettings.fontSize
          },
          {
            defaultValue: ($$value) => {
              $readerSettings.fontSize = $$value;
              $$settled = false;
            }
          },
          {}
        )}</li> <li class="svelte-6ys6jc"><h2 class="svelte-6ys6jc">Text spacing: ${escape($readerSettings.letterSpacing + 1)}</h2> ${validate_component(Slider, "Slider").$$render(
          $$result,
          {
            min: 0,
            max: 9,
            defaultValue: $readerSettings.letterSpacing
          },
          {
            defaultValue: ($$value) => {
              $readerSettings.letterSpacing = $$value;
              $$settled = false;
            }
          },
          {}
        )}</li></ul>`;
      }
    })} </div>`;
  } while (!$$settled);
  $$unsubscribe_readerSettings();
  return $$rendered;
});
const css$1 = {
  code: "ul.svelte-16iv1lh{list-style:none;display:flex;border-top:var(--border);margin:0;padding:0;bottom:0;position:fixed;width:100%;background-color:var(--bg);z-index:1}.left.svelte-16iv1lh{text-align:left}.right.svelte-16iv1lh{text-align:right;align-items:right}li.svelte-16iv1lh{padding:10px;float:left;width:50%;font-weight:500}",
  map: '{"version":3,"file":"MobileZineNav.svelte","sources":["MobileZineNav.svelte"],"sourcesContent":["<script>\\n  export let index;\\n  export let next;\\n  export let previous;\\n  export let length;\\n<\/script>\\n\\n<ul>\\n  <li class=\\"left\\">\\n    {#if index > 0}\\n      <button on:click={previous}>&lt- Previous</button>\\n    {/if}\\n  </li>\\n  <li class=\\"right\\">\\n    {#if index < length - 1}\\n      <button on:click={next}>Next -></button>\\n    {/if}\\n  </li>\\n</ul>\\n\\n<style>\\n  ul {\\n    list-style: none;\\n    display: flex;\\n    border-top: var(--border);\\n    margin: 0;\\n    padding: 0;\\n    bottom: 0;\\n    position: fixed;\\n    width: 100%;\\n    background-color: var(--bg);\\n    z-index: 1;\\n  }\\n  .left {\\n    text-align: left;\\n  }\\n  .right {\\n    text-align: right;\\n    align-items: right;\\n  }\\n  li {\\n    padding: 10px;\\n    float: left;\\n    width: 50%;\\n    font-weight: 500;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAqBE,iBAAG,CACD,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,QAAQ,CAAC,CACzB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,gBAAgB,CAAE,IAAI,IAAI,CAAC,CAC3B,OAAO,CAAE,CACX,CACA,oBAAM,CACJ,UAAU,CAAE,IACd,CACA,qBAAO,CACL,UAAU,CAAE,KAAK,CACjB,WAAW,CAAE,KACf,CACA,iBAAG,CACD,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,GACf"}'
};
const MobileZineNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index } = $$props;
  let { next: next2 } = $$props;
  let { previous } = $$props;
  let { length } = $$props;
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.next === void 0 && $$bindings.next && next2 !== void 0)
    $$bindings.next(next2);
  if ($$props.previous === void 0 && $$bindings.previous && previous !== void 0)
    $$bindings.previous(previous);
  if ($$props.length === void 0 && $$bindings.length && length !== void 0)
    $$bindings.length(length);
  $$result.css.add(css$1);
  return `<ul class="svelte-16iv1lh"><li class="left svelte-16iv1lh">${index > 0 ? `<button data-svelte-h="svelte-14x8q6j">&lt;- Previous</button>` : ``}</li> <li class="right svelte-16iv1lh">${index < length - 1 ? `<button data-svelte-h="svelte-1ihs7v5">Next -&gt;</button>` : ``}</li> </ul>`;
});
const Unnamed = "/_app/immutable/assets/unnamed.1j5DoQnK.png";
const c1 = "/_app/immutable/assets/426576450_423509710342902_8024155096420359053_n.DpK8r_ps.jpg";
const c2 = "/_app/immutable/assets/430305999_3649574111950619_3584413414691286604_n.B-IMoFLt.jpg";
const One = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-lk72wp">Τίτλος</h1> <br> <p data-svelte-h="svelte-1g9c5nx">Τη βλέπεις να περπατάει με φόρα προς τα πάνω σου</p> <p data-svelte-h="svelte-1vpm732">Πετάς ή παλεύεις;</p> <br> <p data-svelte-h="svelte-1bu3sfw">Διάλεξες την πάλη αφού είναι αυτό που ξέρεις να κάνεις χειρότερα.</p> <p data-svelte-h="svelte-1ptj0af">Πού είναι τα όπλα σου Στρατιώτη;</p> <p data-svelte-h="svelte-1v19kwq">Πήρες όλες τις απαραίτητες αποφάσεις;</p> <br> <p data-svelte-h="svelte-13bv3ev">Οκ, επανάσταση 101 για σένα.</p> <br> <p data-svelte-h="svelte-1u6gkyz">Δες ποιοι σε πλαισιώνουν. Αγέλη για τα βουβάλια, affinity group για τους
  ανθρώπους.</p> <br> <p data-svelte-h="svelte-10389xv">Στον πάνω δεξί στήλο, ο Πάντα με τα χνουδωτά πόδια σε τσεκάρει, φυλάει τα νώτα
  σου.</p> <p data-svelte-h="svelte-1kpsdxb">Δίπλα σου όλοι έχουν αρχίσει να φεύγουν, από το Καγιέν μέχρι τη Χαγιαμπούζα.</p> <p data-svelte-h="svelte-18fqnpj">Δεν τρέπονται σε φυγή, ξέρεις: Παίρνουν θέσεις μάχης.</p> <p data-svelte-h="svelte-184qorz">Είναι αυτοί που διασφαλίζουν την ακεραιότητά σου.</p> <br> <p data-svelte-h="svelte-1x2ktfw">Δευτερόλεπτα πριν την οριστική αναμέτρηση αποφασίζεις την παρατηρήσεις.</p> <p data-svelte-h="svelte-zsp5gh">Άλλωστε, μαθαίνοντας τον εχθρό είναι πιο εύκολο να τον αντιμετωπίσουμε, έτσι;</p> <p data-svelte-h="svelte-fbfgug">Μπούρδες! Το μόνο που θέλεις είναι ελευθερία, και το μπέγκελ που κρατάει.</p> <br> <p data-svelte-h="svelte-1nihg90">Ας την παρατηρήσουμε όμως, για χάρη της χαλαρότητας με την οποία
  περιδιαβαίνει...</p> <p data-svelte-h="svelte-1wl2yed">Για αρχή, το μουσκεμένο crop top της με τα μεγάλα ξεβαμμένα γράμματα</p> <br> <p data-svelte-h="svelte-16gvj8r">&quot;OPPOSE/PROPOSE&quot;</p> <br> <p data-svelte-h="svelte-fmuzb1">&quot;Μακάρι να &#39;ξερε&quot; σκέφτεσαι χωρίς ψίχουλο μετριοφροσύνης και σηκώνεις το
  παγερό βλέμμα σου στην φάτσα της.</p> <br> <p data-svelte-h="svelte-1il6lqg">Σκατά</p> <br> <p data-svelte-h="svelte-1nfd8ud">Είναι αυτή</p> <br> <p data-svelte-h="svelte-5s6rr6">Κάνεις να φύγεις αλλά συνεχίζει να έρχεται προς τα πάνω σου.</p> <p data-svelte-h="svelte-1k7f69w">Μια λάθος κίνηση και θα τη φας στο πρόσωπο.</p> <p data-svelte-h="svelte-1muijpd">Δεν σε βλέπει γαμώ;</p> <br> <p data-svelte-h="svelte-1os804m">OPPOSE</p> <br> <p data-svelte-h="svelte-zzyq7m">Σε στιγμή απόλυτης φρενίτιδας περνάει σε στιγμιότυπα όλη η περιστερίσια σου
  ζωή μπροστά από τα cyborg-αχανή σου μάτια:</p> <br> <p data-svelte-h="svelte-1m6tfny">Μεγάλωσες πέριξ του κέντρου.</p> <br> <p data-svelte-h="svelte-vh03f1">Η γέννησή σου αθύμητη κι έτσι να μείνει.</p> <br> <p data-svelte-h="svelte-br0in2">Πρώτες σου μνήμες τα παιχνίδια στο συντριβάνι της Ναυαρίνου με τα μεγάλα
  σπουργίτια.</p> <br> <p data-svelte-h="svelte-rexcbt">Μεγαλώνοντας άρχισες να τα διώχνεις.</p> <br> <p data-svelte-h="svelte-1mwcw6w">Μετά μεγάλωσες πραγματικά.</p> <br> <p data-svelte-h="svelte-14koi2j">Άρχισες να οργανώνεσαι,</p> <br> <p data-svelte-h="svelte-1wkhu1x">πρώτα σε τηλεγραφόξυλα,</p> <br> <p data-svelte-h="svelte-e2nwsq">ύστερα σε σμήνη.</p> <br> <p data-svelte-h="svelte-1liwx4x">Την έβλεπες να περνά,</p> <br> <p data-svelte-h="svelte-ee4snv">πότε μόνη με μια τσάντα στον ώμο,</p> <br> <p data-svelte-h="svelte-873ge9">πότε με παρέες των τριών σε καφέ της Ρωμαϊκής,</p> <br> <p data-svelte-h="svelte-zbdebd">πότε σε θάλασσες των χιλίων στην Εγνατία.</p> <br> <p data-svelte-h="svelte-15ixj81">Στο χε πει ο Ντόμπλο ένα βράδυ</p> <br> <p data-svelte-h="svelte-1liuym9">&quot;Αυτή η γυναίκα&quot; λέει</p> <p data-svelte-h="svelte-1uq9rzm">&quot;είναι σαν τις κυβερνήσεις.</p> <p data-svelte-h="svelte-30pqr4">Είτε δε θα σου δώσει ποτέ την προσοχή που χρειάζεσαι</p> <p data-svelte-h="svelte-1qw85fs">είτε θα την ρίξεις ολοκληρωτικά&quot;</p> <br> <p data-svelte-h="svelte-jxle6k">Ως τώρα πάντως, ποτέ δεν την προλάβαινες.</p> <p data-svelte-h="svelte-1mq6pug">Άντε κάτι ψίχουλα που είχε ρίξει αδέξια ενώ έτρωγε το πρωινό της.</p> <br> <p data-svelte-h="svelte-1o2c0vu">Βαρέθηκες τα ψίχουλα και τα αποφάγια από τα συσίτια.</p> <br> <p data-svelte-h="svelte-g1dotl">Με το πιο John Wick/Top Gun αεροπλανικό πέταγμα που έχεις επιχειρήσει ποτέ να
  κάνεις, βρίσκεσαι από το πάτωμα στον αέρα, στο παγκάκι, στον αέρα και στο
  πάτωμα ξανά.</p> <p data-svelte-h="svelte-1vth0l4">Αυτή τη φορά με ένα λαχταριστό Μπέγκελ, με σολωμό και αβοκάντο, κλεμμένο από
  την άνθρωπο της ζωής σου.</p> <br> <p data-svelte-h="svelte-a6slmp">PROPOSE
  <br></p> <p data-svelte-h="svelte-8xgit1">&quot;Στον Άγριο προσφέρονται δύο εναλλακτικές, μια ζωή ασθενής, σε μια
  αλλοπρόσαλλη Ουτοπία ή μια ζωή του πρωτόγονου, σε κάποιο χωριό Ινδιάνων, μια
  ζωή πολύ περισσότερο φυσική σε κομμάτια της αλλά και πολύ επώδυνη σε άλλα.&quot;</p> <p data-svelte-h="svelte-1c75bpg">Την είχες ακούσει να διαβάζει στην κοπέλα της, μια ηλιόλουστη μέρα στις
  Ομπρέλες</p> <br> <p data-svelte-h="svelte-jhzlcb">Στους Άγριους σαν κι εμάς Στρατιώτη μου, δε δόθηκε ποτέ η επιλογή για τους δύο
  αυτούς κόσμους</p> <p data-svelte-h="svelte-r03pcl">Γεννηθήκαμε και στους δύο ταυτόχρονα.</p> <br> <p data-svelte-h="svelte-cc4r0c">Τη μια, τρέμοντας τους ανθρώπους, μη μας πατήσουν, διώξουν βρίσουν</p> <p data-svelte-h="svelte-1tcuhxj">Την άλλη μαλώνοντας αναμεταξύ μας, για φαΐ, νερό, θέση για κουτσούλημα</p> <p data-svelte-h="svelte-o105ij">Μεταξύ της &quot;εξευγενισμένης&quot; Ουτοπίας της Θεσσαλονίκης και του χωριού των
  απόκληρων Αγρίων μας.</p> <br> <p data-svelte-h="svelte-1mwagbb">Και να που τσιμπολογάτε λαίμαργα όλα μαζί ένα μπάγκελ με σολωμό και αβοκάντο</p> <p class="rotate-90 translate-y-20 translate-x-20 text-[10px] w-10" data-svelte-h="svelte-1mcc9h">Και να που περνάνε, το ένα πίσω από το άλλο, κουτσουλημένα, ένα φίατ πάντα,
  μία πόρσε καγιέν, μια χαγιαμπούζα του 80 και ένα βόλβο ντόμπλο.</p> <br> <p data-svelte-h="svelte-15h9khx">Σε μια παρέα περιστεριών, θα χουν λόγο να σε φωνάζουν Κοκκινολαίμη.</p> <br> <div class="h-[1000px] bg-[#ff2814] fullPage text-[7vw]" data-svelte-h="svelte-oiegcj"><p>Κόκκινο Λαίμη</p></div> <div data-svelte-h="svelte-tup2y8"><img${add_attribute("src", Unnamed, 0)} alt="Story cover"> <h1>Η κοιλάδα του αλλόκοτου: Ωχ! Το περιστέρι και η μάνα του βάτραχου</h1></div> <br> <p style="text-indent: 50px;" class="myIndent" data-svelte-h="svelte-1thrunk">Νιώθω το πετσί μου να τεντώνει κυριολεκτικά. Το γνωστό μπλε καλώδιο για άλλη
  μια φορά δεν έχει συνδεθεί σωστά, σαν να έχει χωθεί μισό στην θύρα του
  εγκεφάλου μου με αποτέλεσμα να αισθάνομαι το γνωστό μούδιασμα ξανά. Ο
  χειρότερος μου φίλος είναι το βατραχάκι. Μπορεί να νομίζεις ότι δεν το ξέρεις
  προσωπικά αλλά μην ξεγελιέσαι από την αμφίεση του. ΕΓΩ το μετέτρεψα σε
  βατραχάκι. Για σένα μπορεί να έχει μεταμφιεστεί σε διάβολο της Τασμανίας ή σε
  περιστέρι ακόμη και σε πετούνια. Δεν με πολυνοιάζει και βασικά κιόλας. Το
  πρόβλημα δεν είναι το ΤΙ μορφή παίρνει. Το πρόβλημα είναι το ίδιο το
  μαλακισμένο. Έρχεται κάθε τρεις και λίγο, τρυπώνει στις σκουληκότρυπες του
  μυαλού και κάνει του κεφαλιού του. No pun intended. Ανέκαθεν, το φανταζόμουν
  ως ένα μικροσκοπικό, κατάμαυρο, καθηλωτικά γλιτσερό βατραχάκι με δέρμα τόσο
  καλογυαλισμένο που αν άπλωνες το δάχτυλο σου να το αγγίξεις, θα ένιωθες πως θα
  σε ρουφήξει σαν μια μικροσκοπική, τόση δα, μαύρη τρύπα. Θα έλεγε κανείς ότι
  είναι χαριτωμένα τρομακτικό αλλά εγώ θα αντι-έλεγα ότι είναι ΤΡΟΜΑΚΤΙΚΑ
  χαριτωμένο. Τόσο χαριτωμένο, που ξέρεις βαθιά μέσα σου ότι κάτι δεν πάει καλά.
  Σαν να κρύβει κάτι μυστικό ή κάποια σούπερ σατανική υπερδύναμη και πως με την
  πρώτη ευκαιρία δεν θα διστάσει να εκτοξεύσει χαριτωμένο βατραχίσιο οξύ από
  τους πόρους του δέρματος του και θα σου λιώσει τα σωθικά. Και λέω σωθικά πολύ
  στοχευμένα. Γιατί αυτό είναι το σπίτι του. Εκεί μένει. Και περιμένει.
  Τριγυρνάει σαν μαλακισμένο που είναι και αρπάζει ό,τι πληροφορία του δώσεις
  και την μετατρέπει σε υγρό τσιμέντο. Και μετά περιμένει κι άλλο. Και μετά λίγο
  ακόμα. Κι όταν έρθει η κατάλληλη στιγμή…ΜΠΟΥΜ! Σου τσιμεντώνει την σάρκα, και
  το δέρμα σου τεντώνει σαν λάτεξ.</p> <p style="text-indent: 50px;" class="myIndent" data-svelte-h="svelte-1wq0q25">Οφείλω να παραδεχτώ πως με την εντατική ενασχόληση με την θεματική αυτού του
  περιοδικού, θέλοντας και μη έκανα την εξής σκέψη: Τι και αν το μαλακισμένο δεν
  είχε την μορφή βατράχου και ενός περιστεριού; Και η αλήθεια είναι πως δεν
  δυσκολεύτηκα να το φανταστώ. Αντιθέτως όλα έβγαλαν απόλυτο νόημα και θα
  εξηγηθώ. Αρχικά, θα ήθελα να τονίσω πως στα δικά μου σωθικά κατοικεί το
  βατραχάκι και αυτό είναι χίλια τα εκατό σίγουρο. Αλλά από ‘κει και πέρα,
  μπαίνοντας για πρώτη φορά σε αυτόν τον σκανδαλιάρικο πειρασμό, άρχισα να
  προσπαθώ να αποδομήσω τα χαρακτηριστικά των δύο μορφών και έπειτα να βάλω σε
  λέξεις αυτές τις λεπτομέρειες που ενώνουν τα δύο μαλακισμένα. Συνηδειτοποίησα
  λοιπόν, πως νιώθω άβολα όταν τα περιστέρια με κοιτούν στα μάτια. Μετά
  προσπάθησα να θυμηθώ αν ποτέ με έχει κοιτάξει περιστέρι στα μάτια. Και τότε
  μου ήρθε. Τότε ήταν το σημείο καμπής στον χωροχρόνο που θα έκοβε την ζωή μου
  σε δύο βασικές χρονικές ενότητες: Πριν και μετά. Το νούμερο ένα χαρακτηρικό
  που πρέπει να έχει ένα πλάσμα για να κερδίσει επάξια την θέση του στην λίστα
  που έχω κάνει με τις εναλλακτικές μορφές που μπορεί να πάρει το βατράχι μου,
  είναι το βλέμμα. Το νεκρό βλέμμα ενός ζωντανού οργανισμού που σφύζει από
  θανατερή σπιρτάδα. Δεν σε αφήνει ποτέ να βαριέσαι αλλά ταυτόχρονα σε κάνει να
  εύχεσαι να πεθάνεις από βαρεμάρα. Εμφανίζεται μπροστά σου σε ανυποψίαστες
  στιγμές και αυτοφωτίζεται σαν μαγικό λυχνάρι και εσύ σαν ανόητο τρέχεις κατά
  πάνω του να το αρπάξεις. Να δεις τι έχει να σου πει. Και τότε ξαφνικά, τα
  βλέμματα σας συναντιούνται και η αυτόφωτη αύρα του αρχίζει να απλώνει στην
  ατμόσφαιρα και ο χρόνος σταματά. Ο πραγματικός χρόνος εννοώ. Ο δικός σου
  χρόνος τρέχει σε fast forward και εσύ εκλιπαρείς να ηρεμήσουν λίγο τα αίματα.
  Θέλεις να πάρεις τα μάτια σου από τα δικά του μάτια αλλά μάταια (no pun
  intended). Έχεις παγιδευτεί στις δυο αυτές μικροσκοπικές μαύρες τρύπες και
  αφήνεσαι στον ερχομό του χάους. Αναρωτιέσαι αν αυτό θα είναι το τέλος σου, αν
  η μαύρη βροχή που πέφτει θα ξεπλύνει την ποιητική αδεία της παραφροσύνης σου
  και θα σε απελευθερώσει. ΑΛΛΑ ΠΟΥ; ΠΗΓΕΣ ΚΑΙ ΚΑΡΦΩΘΗΚΕΣ ΠΑΝΩ ΣΤΟ ΜΑΛΑΚΙΣΜΕΝΟ.
  Αλλά να σου πω και κάτι; Τι να έκανες; Να το αγνοούσες;</p> <p style="text-indent: 50px;" class="myIndent" data-svelte-h="svelte-14o1d2i">Πιστεύω πως αυτό θα έκανε τα πράγματα χειρότερα. Για παράδειγμα, μια φορά είχα
  δει ένα όνειρο στο οποίο έγινα φίλη με μια μικρή νυχτεριδούλα η οποία
  προσκολλήθηκε στον δείκτη μου σαν δαχτυλίδι. Κάθε φορά που την στεναχωρούσα με
  την αδιαφορία μου, αυτή μεγάλωνε σε μέγεθος. Κάποια στιγμή, τόσο πολύ την
  στεναχώρησα που μεγάλωνε και μεγάλωνε και γιγαντιωνόταν μέχρι που εμπλέχθηκε
  στην φάση ο αμερικάνικος στρατός, μια τιάρα με διαμάντια και η ελληνική
  εκκλησία (μεγάλη ιστορία). Στο τέλος, για να μην τα πολυλογώ, έγινε τόσο
  τεράστια που ξεπέρασε το μέγεθος της γης και του σύμπαντος και όλων των άλλων
  συμπάντων και μας κατάπιε σαν την χάρυβδη. Και τι κατάλαβα; Τίποτα απολύτως.
  Για αυτό να μην αδιαφορείς, γιατί θα πεθάνουμε όλοι και όλες και όλα και τα
  πάντα.</p> <p style="text-indent: 50px;" class="myIndent" data-svelte-h="svelte-64a4z">Πίσω στο κατοικίδιο μου τώρα. Το βατραχάκι - περιστέρι που λες είναι μια
  εσωτερική εξωτερίκευση του πανικού που έχει βαλθεί να με ξεκάνει. Έχει βρει
  όλα τα κουμπιά μου και παίζει με αυτά λες και είναι η πρώτη του μέρα στο
  νηπιαγωγείο. «Καλά, μάνα δεν έχει; Πατέρα;». Σε ακούω να λες και σε ευχαριστώ
  πολύ για την πάσα. Εδώ ακριβώς αρχίζει πραγματικά να στραβώνει το παιχνίδι.
  Εδώ είναι το σημείο που θα επέλεγα να κάνω mic drop. ΕΔΩ είναι το σημείο που
  ξεχειλίζει το ποτήρι κάθε φορά που προσπαθώ να το γεμίσω προσεκτικά. Η
  απάντηση στο ερώτημα σου είναι ναι. Έχει και μάνα και πατέρα και κολλητή και
  ερωμένη και παππού και γιαγιά και θεία και σπίτι. Έχει και αμάξι και παιδί και
  ένα πιάτο ζεστό φαΐ κάθε μίζερη μέρα της ζωής του. Και πολλές φορές μάλιστα
  έχει και ένα ποτήρι χλιαρό γάλα για τις κρύες νύχτες. Καλά εεε; Και όταν είμαι
  στα καλύτερα μου, φροντίζω να του αφήνω και ένα μπολ με κρύες φράουλες
  πασπαλισμένες με καστανή ζάχαρη για τις ανοιξιάτικες λιγούρες. Και μετά ξανά
  από την αρχή. Σας φαύλος κύκλος. Σαν την μέρα της μαρμότας. Εμφανίζεται
  μπροστά μου αυτό το τρισχαριτωμένο έκτρωμα και εντελώς ενστικτωδώς ξεφωνίζω με
  μια θλιβερή χιουμοριστική διάθεση: «Ωχ! Το περιστέρι και η μάνα του βάτραχου».
  No pun intended.</p> <div class="h-[1000px] bg-[#769e65] fullPage text-[40vw]" data-svelte-h="svelte-15ldfzr"><p class="leading-none font-serif">Ά</p></div> <img${add_attribute("src", c1, 0)} alt="Comic page one" class="h-full m-auto"> <img${add_attribute("src", c2, 0)} alt="Comic page two" class="h-full m-auto">`;
});
const Two = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-1p9y8np">Δεύτερο τεύχος</h1>`;
});
const css = {
  code: ":root{background-color:var(--bg)}body{margin:0}#source.svelte-19yvpg4{position:absolute;top:-30000px}#render.svelte-19yvpg4{position:absolute;top:-30000px}.root_container.svelte-19yvpg4{display:flex;height:100dvh;width:100%;position:relative;overflow-x:hidden;text-align:justify;line-height:1.5}",
  map: '{"version":3,"file":"+page@.svelte","sources":["+page@.svelte"],"sourcesContent":["<script lang=\\"ts\\">import IssueaNav from \\"$lib/IssueaNav.svelte\\";\\nimport Settings from \\"$lib/Settings.svelte\\";\\nimport VerticalRule from \\"$lib/VerticalRule.svelte\\";\\nimport { onDestroy, onMount } from \\"svelte\\";\\nimport { getChunks } from \\"$lib/pages\\";\\nimport MobileZineNav from \\"$lib/MobileZineNav.svelte\\";\\nimport MobileTop from \\"$lib/MobileTop.svelte\\";\\nimport { readerSettings } from \\"$lib/stores\\";\\nimport First from \\"$lib/zines/One.svelte\\";\\nimport Second from \\"$lib/zines/Two.svelte\\";\\nexport let data;\\n$:\\n  settings = $readerSettings;\\nlet mounted = false;\\nconst unsubscribe = readerSettings.subscribe((value) => {\\n  settings = settings;\\n  if (mounted)\\n    getChunks(value.fontFamily, value.fontSize, value.letterSpacing);\\n});\\nlet showSettings = false;\\n$:\\n  innerWidth = 0;\\nlet index = 0;\\nlet root;\\n$:\\n  navINdex = 0;\\n$:\\n  if (innerWidth > 900) {\\n    navINdex = index * 2;\\n  } else {\\n    navINdex = index;\\n  }\\nlet chunks;\\n$:\\n  chunks = [];\\n$:\\n  length = chunks.length;\\nlet root_container;\\n$:\\n  if (mounted) {\\n    index;\\n    chunks;\\n    root_container.innerHTML = \\"\\";\\n    for (let chunk of getVisibleChunks()) {\\n      if (chunk != null)\\n        root_container?.appendChild(chunk);\\n    }\\n  }\\nfunction toggleSettings() {\\n  showSettings = !showSettings;\\n}\\nfunction next() {\\n  if (index < length) {\\n    index++;\\n  }\\n}\\nfunction previous() {\\n  if (index > 0) {\\n    index--;\\n  }\\n}\\nfunction getVisibleChunks() {\\n  let visible = [];\\n  if (window.innerWidth > 900) {\\n    visible.push(chunks[index * 2]);\\n    if (chunks[index * 2 + 1] != null) {\\n      visible.push(chunks[index * 2 + 1]);\\n    }\\n  } else {\\n    visible.push(chunks[index]);\\n  }\\n  return visible;\\n}\\nonMount(() => {\\n  mounted = true;\\n  root_container = document.getElementById(\\"root_container\\");\\n  const resizeObserver = new ResizeObserver(() => {\\n    getChunks(\\n      settings.fontFamily,\\n      settings.fontSize,\\n      settings.letterSpacing\\n    ).then((value) => chunks = value);\\n  });\\n  resizeObserver.observe(root);\\n  return () => resizeObserver.unobserve(root);\\n});\\nonDestroy(unsubscribe);\\n<\/script>\\n\\n<svelte:window bind:innerWidth />\\n\\n<svelte:head>\\n  <title>To Bitoni | {data.slug}</title>\\n  <link rel=\\"stylesheet\\" href=\\"https://fonts.googleapis.com/css?family=Inter\\" />\\n  <link\\n    rel=\\"stylesheet\\"\\n    href=\\"https://fonts.googleapis.com/css?family=Fira Code\\"\\n  />\\n  <link\\n    rel=\\"stylesheet\\"\\n    href=\\"https://fonts.googleapis.com/css?family=Literata\\"\\n  />\\n</svelte:head>\\n\\n<main>\\n  {#if showSettings}\\n    <Settings {toggleSettings} {innerWidth} />\\n  {/if}\\n  {#if innerWidth > 900}\\n    <IssueaNav\\n      title={data.slug}\\n      {toggleSettings}\\n      {next}\\n      {previous}\\n      index={navINdex}\\n      bind:length\\n    />\\n    <VerticalRule full={true} />\\n  {:else}\\n    <MobileTop\\n      toggleMenu={toggleSettings}\\n      title=\\"{data.slug} | {index}\\"\\n      button=\\"Settings\\"\\n    />\\n    <MobileZineNav {index} {next} {previous} {length} />\\n  {/if}\\n\\n  <div bind:this={root} id=\\"source\\">\\n    {#if data.slug == \\"One\\"}\\n      <First />\\n    {:else if data.slug == \\"Two\\"}\\n      <Second />\\n    {/if}\\n  </div>\\n  <div id=\\"render\\"></div>\\n  <div class=\\"root_container\\" id=\\"root_container\\"></div>\\n</main>\\n\\n<style>\\n  :root {\\n    background-color: var(--bg);\\n  }\\n  :global(body) {\\n    margin: 0;\\n  }\\n  #source {\\n    position: absolute;\\n    top: -30000px;\\n  }\\n  #render {\\n    position: absolute;\\n    top: -30000px;\\n  }\\n  .root_container {\\n    display: flex;\\n    height: 100dvh;\\n    width: 100%;\\n    position: relative;\\n    overflow-x: hidden;\\n    text-align: justify;\\n    line-height: 1.5;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA2IE,KAAM,CACJ,gBAAgB,CAAE,IAAI,IAAI,CAC5B,CACQ,IAAM,CACZ,MAAM,CAAE,CACV,CACA,sBAAQ,CACN,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,QACP,CACA,sBAAQ,CACN,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,QACP,CACA,8BAAgB,CACd,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,OAAO,CACnB,WAAW,CAAE,GACf"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerWidth;
  let navINdex;
  let length;
  let $$unsubscribe_readerSettings;
  $$unsubscribe_readerSettings = subscribe(readerSettings, (value) => value);
  let { data } = $$props;
  const unsubscribe = readerSettings.subscribe((value) => {
  });
  let showSettings = false;
  let index = 0;
  let root;
  let chunks;
  function toggleSettings() {
    showSettings = !showSettings;
  }
  function next2() {
    if (index < length) {
      index++;
    }
  }
  function previous() {
    if (index > 0) {
      index--;
    }
  }
  onDestroy(unsubscribe);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    innerWidth = 0;
    navINdex = 0;
    {
      if (innerWidth > 900) {
        navINdex = index * 2;
      } else {
        navINdex = index;
      }
    }
    chunks = [];
    length = chunks.length;
    $$rendered = ` ${$$result.head += `<!-- HEAD_svelte-s063pq_START -->${$$result.title = `<title>To Bitoni | ${escape(data.slug)}</title>`, ""}<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira Code"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Literata"><!-- HEAD_svelte-s063pq_END -->`, ""} <main>${showSettings ? `${validate_component(Settings, "Settings").$$render($$result, { toggleSettings, innerWidth }, {}, {})}` : ``} ${innerWidth > 900 ? `${validate_component(IssueaNav, "IssueaNav").$$render(
      $$result,
      {
        title: data.slug,
        toggleSettings,
        next: next2,
        previous,
        index: navINdex,
        length
      },
      {
        length: ($$value) => {
          length = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(VerticalRule, "VerticalRule").$$render($$result, { full: true }, {}, {})}` : `${validate_component(MobileTop, "MobileTop").$$render(
      $$result,
      {
        toggleMenu: toggleSettings,
        title: data.slug + " | " + index,
        button: "Settings"
      },
      {},
      {}
    )} ${validate_component(MobileZineNav, "MobileZineNav").$$render($$result, { index, next: next2, previous, length }, {}, {})}`} <div id="source" class="svelte-19yvpg4"${add_attribute("this", root, 0)}>${data.slug == "One" ? `${validate_component(One, "First").$$render($$result, {}, {}, {})}` : `${data.slug == "Two" ? `${validate_component(Two, "Second").$$render($$result, {}, {}, {})}` : ``}`}</div> <div id="render" class="svelte-19yvpg4"></div> <div class="root_container svelte-19yvpg4" id="root_container"></div> </main>`;
  } while (!$$settled);
  $$unsubscribe_readerSettings();
  return $$rendered;
});
export {
  Page as default
};
