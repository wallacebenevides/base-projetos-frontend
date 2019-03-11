export const partialize = (fn, ...args) =>
    fn.bind(null, ...args);

export const curry = (fn, arity = fn.length, nextCurried) =>
        (nextCurried = prevArgs =>
            nextArg => {
                var args = [...prevArgs, nextArg];

                if (args.length >= arity) {
                    return fn(...args);
                }
                else {
                    return nextCurried(args);
                }
            }
        )([]);

export const when = (predicate, fn) =>
        (...args) =>
            predicate(...args) ? fn(...args) : undefined;

export const compose = (...fns) => value =>
    fns.reduceRight((previousValue, fn) =>
        fn(previousValue), value);

export const pipe = (...fns) => value =>
    fns.reduce((previousValue, fn) =>
        fn(previousValue), value);

export const takeUntil = (times, fn) =>
    () => times-- > 0 && fn();

export const debounceTime = (milliseconds, fn) => {
    let timer = 0;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, milliseconds);
    }
}

/**
 * Converte um objeto para o formato query string para ser enviado nas requisições
 * @param {*} obj
 */
export const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
