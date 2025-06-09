// hooks/useAutoScroll.js
import { useRef, useEffect } from "react";

export function useAutoScroll(dependencies = []) {
    const bottomRef = useRef(null);

    // scrollIntoView()是一個滾動到指定元素的方法
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return bottomRef;
}